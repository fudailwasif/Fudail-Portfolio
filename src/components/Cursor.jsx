import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check for touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use gsap context for easy cleanup
    let ctx = gsap.context(() => {
      gsap.set(cursor, { xPercent: -50, yPercent: -50 });

      // Handle reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const duration = prefersReducedMotion ? 0 : 0.15;
      const hoverDuration = prefersReducedMotion ? 0 : 0.3;

      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: duration,
          ease: 'power2.out',
        });
      };

      const handleMouseOver = (e) => {
        if (e.target.closest('.project-card') || e.target.closest('a') || e.target.closest('button')) {
          gsap.to(cursor, {
            width: 62,
            height: 62,
            duration: hoverDuration,
            ease: 'power2.out',
          });
        }
      };

      const handleMouseOut = (e) => {
        const related = e.relatedTarget;
        const leavingInteractable = e.target.closest('.project-card') || e.target.closest('a') || e.target.closest('button');
        
        // If we were in an interactable element, and we're not moving to another one inside it
        if (leavingInteractable) {
          const enteringInteractable = related?.closest('.project-card') || related?.closest('a') || related?.closest('button');
          if (!enteringInteractable) {
            gsap.to(cursor, {
              width: 18,
              height: 18,
              duration: hoverDuration,
              ease: 'power2.out',
            });
          }
        }
      };

      window.addEventListener('mousemove', moveCursor);
      document.addEventListener('mouseover', handleMouseOver);
      document.addEventListener('mouseout', handleMouseOut);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mouseout', handleMouseOut);
      };
    });

    return () => ctx.revert();
  }, []);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[18px] h-[18px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
};

export default Cursor;
