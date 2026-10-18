import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { hasLimitedResources } from '../lib/motion';

const cursorMedia = '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const sizes = { default: 24, text: 58, link: 68, image: 86, email: 76 };
const nativeText = 'input, textarea, select, [contenteditable], [data-native-cursor]';

function getMode(target) {
  if (target.closest('a[href^="mailto:"]')) return 'email';
  if (target.closest('.case-inline-image')) return 'image';
  if (target.closest('a, button, summary, [role="button"], [data-custom-cursor]')) return 'link';
  if (target.closest('p, h1, h2, h3, h4, h5, h6, li, span, blockquote')) return 'text';
  return 'default';
}

export default function CustomCursor({ ready }) {
  const [eligible, setEligible] = useState(() => window.matchMedia(cursorMedia).matches && !hasLimitedResources());
  const [mode, setMode] = useState('default');
  const [theme, setTheme] = useState('dark');
  const modeRef = useRef('default');
  const themeRef = useRef('dark');
  const visibleRef = useRef(false);
  const pointer = useRef({ x: 0, y: 0, present: false, selecting: false });
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const opacity = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 520, damping: 38, mass: 0.55 });
  const y = useSpring(targetY, { stiffness: 520, damping: 38, mass: 0.55 });
  const diameter = useSpring(sizes.default, { stiffness: 400, damping: 32, mass: 0.7 });

  useEffect(() => {
    const media = window.matchMedia(cursorMedia);
    const update = () => setEligible(media.matches && !hasLimitedResources());
    media.addEventListener('change', update);
    navigator.connection?.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      navigator.connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!eligible || !ready) return;
    const root = document.documentElement;
    const pointerState = pointer.current;
    const setShown = next => {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      opacity.set(next ? 1 : 0);
      root.classList.toggle('has-custom-cursor', next);
    };
    const inspect = target => {
      const selection = window.getSelection();
      const selected = Boolean(selection && !selection.isCollapsed && selection.toString());
      const native = pointer.current.selecting || selected || !target || Boolean(target.closest(nativeText));
      if (native) {
        setShown(false);
        return;
      }
      const nextMode = getMode(target);
      if (modeRef.current !== nextMode) {
        modeRef.current = nextMode;
        diameter.set(sizes[nextMode]);
        setMode(nextMode);
      }
      const nextTheme = target.closest('.light-section, .mobile-menu') ? 'light' : 'dark';
      if (themeRef.current !== nextTheme) {
        themeRef.current = nextTheme;
        setTheme(nextTheme);
      }
      setShown(pointer.current.present);
    };
    const inspectAtPointer = () => {
      if (!pointer.current.present) return;
      inspect(document.elementFromPoint(pointer.current.x, pointer.current.y));
    };
    const move = event => {
      if (event.pointerType !== 'mouse') return;
      const first = !pointer.current.present;
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;
      pointer.current.present = true;
      if (first) {
        x.jump(event.clientX);
        y.jump(event.clientY);
      }
      targetX.set(event.clientX);
      targetY.set(event.clientY);
      inspect(event.target instanceof Element ? event.target : document.elementFromPoint(event.clientX, event.clientY));
    };
    const hide = () => {
      pointerState.present = false;
      setShown(false);
    };
    const selectStart = () => {
      pointer.current.selecting = true;
      setShown(false);
    };
    const selectEnd = () => {
      pointer.current.selecting = false;
      inspectAtPointer();
    };
    const selectionChange = () => {
      if (!pointer.current.selecting) inspectAtPointer();
    };
    const keyDown = event => { if (event.key === 'Tab') hide(); };
    const visibilityChange = () => { if (document.hidden) hide(); };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    window.addEventListener('scroll', inspectAtPointer, { passive: true });
    document.addEventListener('selectstart', selectStart);
    window.addEventListener('pointerup', selectEnd);
    document.addEventListener('selectionchange', selectionChange);
    window.addEventListener('keydown', keyDown);
    document.addEventListener('visibilitychange', visibilityChange);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      window.removeEventListener('scroll', inspectAtPointer);
      document.removeEventListener('selectstart', selectStart);
      window.removeEventListener('pointerup', selectEnd);
      document.removeEventListener('selectionchange', selectionChange);
      window.removeEventListener('keydown', keyDown);
      document.removeEventListener('visibilitychange', visibilityChange);
      root.classList.remove('has-custom-cursor');
      pointerState.present = false;
      visibleRef.current = false;
      opacity.set(0);
    };
  }, [eligible, ready, targetX, targetY, x, y, diameter, opacity]);

  if (!eligible || !ready) return null;
  return <motion.div
    className="custom-cursor"
    data-mode={mode}
    data-theme={theme}
    aria-hidden="true"
    style={{ x, y, width: diameter, height: diameter, opacity, translateX: '-50%', translateY: '-50%' }}>
    <span className="custom-cursor-label">{mode === 'image' ? 'VIEW' : mode === 'email' ? '↗' : ''}</span>
  </motion.div>;
}
