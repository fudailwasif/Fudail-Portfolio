import { useLayoutEffect } from 'react';
import { gsap, SplitText, hasLimitedResources } from '../lib/motion';

export default function usePageMotion(scope, ready) {
  useLayoutEffect(() => {
    if (!ready) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (hasLimitedResources()) return;
      gsap.utils.toArray('[data-reveal]').forEach(element => {
        const siblings = [...element.parentElement.querySelectorAll(':scope > [data-reveal]')];
        const stagger = Math.min(siblings.indexOf(element), 3) * 0.07;
        gsap.from(element, { y: 24, opacity: 0, duration: 0.6, delay: stagger, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
      });
      gsap.utils.toArray('[data-split]').forEach(element => {
        SplitText.create(element, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit: split => gsap.from(split.lines, { yPercent: 105, duration: 0.65, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 95%', once: true } }),
        });
      });
      gsap.utils.toArray('.case-row').forEach(row => {
        const timeline = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
        timeline.from(row.querySelector('.case-divider'), { scaleX: 0, duration: 0.75, ease: 'power2.out' })
          .from(row.querySelector('.case-title-line'), { yPercent: 105, duration: 0.75, ease: 'power3.out' }, 0.08)
          .from(row.querySelectorAll('.case-meta'), { y: 14, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.25);
      });
    }, scope);
    media.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      if (hasLimitedResources()) return;
      const image = scope.current?.querySelector('.case-row:first-child .case-inline-image img');
      if (!image) return;
      gsap.fromTo(image, { scale: 1.015 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: image, start: 'top 95%', end: 'top 45%', scrub: true },
      });
    }, scope);
    return () => media.revert();
  }, [scope, ready]);
}
