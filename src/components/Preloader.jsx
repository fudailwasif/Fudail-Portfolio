import { useCallback, useLayoutEffect, useRef } from 'react';

export default function Preloader({ pause, resume, onComplete }) {
  const overlay = useRef(null);
  const completed = useRef(false);
  const finish = useCallback(() => {
    if (completed.current) return;
    completed.current = true;
    resume();
    onComplete();
  }, [resume, onComplete]);

  useLayoutEffect(() => {
    pause();
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () => { if (motionPreference.matches) finish(); };
    motionPreference.addEventListener('change', reduce);
    if (motionPreference.matches) finish();
    const watchdog = window.setTimeout(finish, 3200);
    return () => {
      clearTimeout(watchdog);
      motionPreference.removeEventListener('change', reduce);
      resume();
    };
  }, [finish, pause, resume]);

  const animation = event => {
    if (event.target !== overlay.current || event.animationName !== 'intro-overlay') return;
    finish();
  };

  return <div ref={overlay} className="preloader" onAnimationEnd={animation}>
    <span className="sr-only" role="status">Loading portfolio</span>
    <div className="preloader-title" aria-hidden="true">
      <div className="preloader-mask"><span className="preloader-wordmark">F/W.</span></div>
      <p className="preloader-caption"><span>Fudail Wasif</span>{' '}<span>— Frontend Developer</span></p>
    </div>
    <div className="preloader-progress" aria-hidden="true"><span /></div>
  </div>;
}
