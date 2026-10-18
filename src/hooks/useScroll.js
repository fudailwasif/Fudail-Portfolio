import { useCallback, useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap, ScrollTrigger, desktopMotion, hasLimitedResources } from '../lib/motion';

export default function useScroll() {
  const engine = useRef(null);
  const locked = useRef(null);
  const navigate = useCallback((hash, { history = true, immediate = false } = {}) => {
    const target = document.getElementById(hash.replace(/^#/, ''));
    if (!target) return;
    if (history && window.location.hash !== hash) window.history.pushState(null, '', hash);
    if (locked.current) return;
    const offset = hash === '#top' ? 0 : -(document.querySelector('header')?.offsetHeight || 80) - 20;
    // Focus without moving the viewport, then let the single scroll owner position it.
    target.focus({ preventScroll: true });
    const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY + offset);
    if (immediate) {
      window.scrollTo({ top: y, behavior: 'instant' });
      // A fixed-body lock can leave Lenis with an outdated scroll limit.
      engine.current?.lenisInstance?.resize();
      engine.current?.scrollTo(y, { immediate: true, force: true });
    } else if (engine.current) engine.current.scrollTo(y, { duration: 0.9 });
    else window.scrollTo({ top: y, behavior: 'instant' });
  }, []);

  const pause = useCallback(() => {
    if (locked.current) return;
    engine.current?.stop();
    const { style } = document.body;
    locked.current = { y: window.scrollY, position: style.position, top: style.top, width: style.width, overflow: style.overflow };
    style.position = 'fixed'; style.top = `-${locked.current.y}px`; style.width = '100%'; style.overflow = 'hidden';
  }, []);

  const resume = useCallback(() => {
    const previous = locked.current;
    if (!previous) return;
    const { y, ...styles } = previous;
    Object.assign(document.body.style, styles);
    locked.current = null;
    window.scrollTo({ top: y, behavior: 'instant' });
    engine.current?.start();
    // Sync the smooth-scroll position before the next anchor animation.
    engine.current?.lenisInstance?.resize();
    engine.current?.scrollTo(y, { immediate: true, force: true });
  }, []);

  useEffect(() => {
    let disposed = false;
    let frame;
    let createFrame;
    let startFrame;
    const media = window.matchMedia(desktopMotion);
    const retire = () => {
      cancelAnimationFrame(createFrame);
      cancelAnimationFrame(startFrame);
      const instance = engine.current;
      engine.current = null;
      if (!instance) return;
      instance.stop();
      // 5.0.1 initializes its observers on the next frame. Destroy after that
      // frame so a quick unmount/media change cannot leave late listeners behind.
      requestAnimationFrame(() => {
        instance.destroy();
        if (!engine.current) document.documentElement.removeAttribute('data-scroll-orientation');
      });
    };
    const setup = () => {
      retire();
      if (media.matches && !hasLimitedResources()) {
        // Defer construction so React StrictMode's probe mount is cancellable.
        createFrame = requestAnimationFrame(() => {
          engine.current = new LocomotiveScroll({
            autoStart: false,
            lenisOptions: { smoothWheel: true, syncTouch: false, lerp: 0.1 },
            scrollCallback: () => ScrollTrigger.update(),
            initCustomTicker: render => gsap.ticker.add(render),
            destroyCustomTicker: render => gsap.ticker.remove(render),
          });
          startFrame = requestAnimationFrame(() => {
            if (!locked.current) engine.current?.start();
          });
        });
      }
    };
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { engine.current?.resize(); ScrollTrigger.refresh(); });
    };
    const click = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!document.getElementById(hash.slice(1))) return;
      event.preventDefault(); navigate(hash);
    };
    const restore = () => navigate(window.location.hash || '#top', { history: false, immediate: true });
    const restoreHashOnLoad = () => { if (window.location.hash) restore(); };
    setup();
    media.addEventListener('change', setup);
    navigator.connection?.addEventListener('change', setup);
    document.addEventListener('click', click);
    window.addEventListener('popstate', restore);
    window.addEventListener('hashchange', restore);
    window.addEventListener('load', restoreHashOnLoad, { once: true });
    document.addEventListener('load', refresh, true);
    document.addEventListener('toggle', refresh, true);
    document.fonts.ready.then(() => {
      if (disposed) return;
      refresh();
      if (window.location.hash) restore();
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      media.removeEventListener('change', setup);
      navigator.connection?.removeEventListener('change', setup);
      document.removeEventListener('click', click);
      window.removeEventListener('popstate', restore);
      window.removeEventListener('hashchange', restore);
      window.removeEventListener('load', restoreHashOnLoad);
      document.removeEventListener('load', refresh, true);
      document.removeEventListener('toggle', refresh, true);
      resume(); retire();
    };
  }, [navigate, resume]);
  return { navigate, pause, resume };
}
