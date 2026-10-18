import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { desktopMotion, hasLimitedResources } from '../lib/motion';

export default function MagneticLink({ children, ...props }) {
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 320, damping: 24 });
  const y = useSpring(targetY, { stiffness: 320, damping: 24 });
  const [enabled, setEnabled] = useState(() => window.matchMedia(desktopMotion).matches && !hasLimitedResources());
  useEffect(() => {
    const media = window.matchMedia(desktopMotion);
    const update = () => {
      const active = media.matches && !hasLimitedResources();
      setEnabled(active);
      if (!active) { targetX.set(0); targetY.set(0); }
    };
    media.addEventListener('change', update);
    navigator.connection?.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      navigator.connection?.removeEventListener('change', update);
    };
  }, [targetX, targetY]);
  const move = event => {
    if (!enabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    targetX.set(Math.max(-4, Math.min(4, (event.clientX - rect.left - rect.width / 2) * 0.04)));
    targetY.set(Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * 0.1)));
  };
  const reset = () => { targetX.set(0); targetY.set(0); };
  return <motion.a
    {...props}
    style={{ x, y }}
    onPointerMove={move}
    onPointerLeave={reset}
    onBlur={reset}
    whileHover={enabled ? { scale: 1.015 } : undefined}
    whileTap={enabled ? { scale: 0.985 } : undefined}
    transition={{ type: 'spring', stiffness: 360, damping: 26 }}>
    {children}
  </motion.a>;
}
