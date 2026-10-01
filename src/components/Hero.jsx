import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.hero-heading-line', {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          rotation: 2,
        })
          .from(
            '.hero-meta',
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.6',
          )
          .from(
            '.hero-sub',
            {
              y: 20,
              opacity: 0,
              duration: 0.8,
            },
            '-=0.6',
          )
          .from(
            '.hero-tag',
            {
              y: 10,
              opacity: 0,
              duration: 0.6,
              stagger: 0.05,
            },
            '-=0.6',
          )
          .from(
            '.hero-scroll',
            {
              opacity: 0,
              duration: 0.8,
            },
            '-=0.4',
          );
      },
      container,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative min-h-screen w-full bg-[#0A0A0A] text-white flex flex-col justify-center overflow-hidden font-sans pt-24">
      <div className="w-full px-10 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-4 items-end">
        {/* Left Column - Large Typography */}
        <div className="md:col-span-7 flex flex-col">
          <h3 className="hero-meta text-[10px] sm:text-xs font-poppins tracking-[0.2em] text-[#BCBCBC] uppercase mb-8">
            Based in Karachi, Pakistan
          </h3>
          <div className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-sans font-bold leading-[0.85] tracking-tighter">
            <div className="overflow-hidden">
              <h1 className="hero-heading-line block">Fudail</h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-heading-line block">builds</h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-heading-line block">interfaces.</h1>
            </div>
          </div>
        </div>

        {/* Right Column - Subtitle & Tech Stack Pills */}
        <div className="md:col-span-5 flex flex-col md:pb-6">
          <h2 className="hero-sub text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-md font-light">
            I build modern, responsive, and interaction-focused web interfaces using the latest technologies.
          </h2>
          <div className="flex flex-wrap gap-3">
            {['React', 'JavaScript', 'Tailwind CSS', 'GSAP'].map(skill => (
              <span
                key={skill}
                className="hero-tag px-4 py-2 text-[#BCBCBC] rounded-full border border-neutral-700 text-[10px] sm:text-xs font-medium uppercase tracking-widest bg-[#111111]">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hero-scroll absolute bottom-10 left-10 md:left-20">
        <h3 className="text-[10px] sm:text-xs font-poppins tracking-[0.2em] text-[#BCBCBC] uppercase">
          Scroll to explore ↓
        </h3>
      </div>
    </section>
  );
};

export default Hero;
