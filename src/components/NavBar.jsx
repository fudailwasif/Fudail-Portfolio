import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { navigation, profile } from '../data/profile';
import { hasLimitedResources } from '../lib/motion';
import Arrow from './Arrow';

const panel = {
  hidden: { y: '-100%' },
  visible: { y: 0, transition: { duration: 0.42, ease: [0.65, 0, 0.35, 1], staggerChildren: 0.055, delayChildren: 0.12 } },
  exit: { y: '-100%', transition: { duration: 0.32, ease: [0.65, 0, 0.35, 1] } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.14 } },
};
const links = { hidden: {}, visible: { transition: { staggerChildren: 0.065, delayChildren: 0.13 } } };

export default function NavBar({ navigate, pause, resume }) {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const pendingNavigation = useRef(null);
  const closing = useRef(false);
  const [open, setOpen] = useState(false);
  const [reduce, setReduce] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches || hasLimitedResources());

  const finishClose = useCallback(() => {
    if (!dialog.current?.open) return;
    dialog.current.close();
    closing.current = false;
    resume();
    trigger.current?.focus({ preventScroll: true });
    const hash = pendingNavigation.current;
    pendingNavigation.current = null;
    if (hash) navigate(hash);
  }, [navigate, resume]);

  const close = useCallback(hash => {
    if (!dialog.current?.open || closing.current) return;
    closing.current = true;
    pendingNavigation.current = hash || null;
    setOpen(false);
  }, []);

  const show = () => {
    if (dialog.current?.open) return;
    pause();
    dialog.current.showModal();
    setOpen(true);
  };

  useLayoutEffect(() => {
    if (open) dialog.current?.querySelector('.menu-top button')?.focus();
  }, [open]);

  const containFocus = event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button, a[href]')];
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const element = dialog.current;
    const onDesktop = () => { if (desktop.matches) close(); };
    const onReduced = () => setReduce(reduced.matches || hasLimitedResources());
    desktop.addEventListener('change', onDesktop);
    reduced.addEventListener('change', onReduced);
    navigator.connection?.addEventListener('change', onReduced);
    return () => {
      desktop.removeEventListener('change', onDesktop);
      reduced.removeEventListener('change', onReduced);
      navigator.connection?.removeEventListener('change', onReduced);
      element?.close();
      resume();
    };
  }, [close, resume]);

  return <>
    <header className="site-header">
      <a href="#top" className="wordmark">F/W.<span className="sr-only"> Fudail Wasif, back to top</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(link => <a className="text-link" key={link.id} href={`#${link.id}`}>{link.label}</a>)}
      </nav>
      <span className="header-location mono">Karachi, PK</span>
      <button ref={trigger} className="menu-toggle" aria-haspopup="dialog" aria-expanded={open} aria-controls="mobile-navigation" onClick={show}>Menu <span aria-hidden="true">+</span></button>
    </header>
    <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" aria-labelledby="menu-title" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); close(); }}>
      <AnimatePresence initial={false} onExitComplete={finishClose}>
        {open && <motion.div key="menu-panel" className="mobile-menu-panel" variants={panel} initial={reduce ? false : 'hidden'} animate="visible" exit={reduce ? { opacity: 0, transition: { duration: 0 } } : 'exit'}>
          <div className="menu-top">
            <span id="menu-title" className="wordmark">F/W.</span>
            <button onClick={() => close()} aria-label="Close menu">Close <span aria-hidden="true">×</span></button>
          </div>
          <motion.nav aria-label="Mobile navigation" variants={reduce ? undefined : links} initial={reduce ? false : 'hidden'} animate="visible">
            {navigation.map((link, index) => <motion.a
              variants={reduce ? undefined : item}
              key={link.id}
              href={`#${link.id}`}
              onClick={event => { event.preventDefault(); close(`#${link.id}`); }}>
              <span className="mono">0{index + 1}</span>{link.label}<Arrow />
            </motion.a>)}
          </motion.nav>
          <p className="mono menu-availability">{profile.availability}</p>
        </motion.div>}
      </AnimatePresence>
    </dialog>
  </>;
}
