import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const skillsList = [
  { num: '01', title: 'HTML / CSS' },
  { num: '02', title: 'JavaScript' },
  { num: '03', title: 'React' },
  { num: '04', title: 'Tailwind CSS' },
  { num: '05', title: 'GSAP' },
  { num: '06', title: 'Git / Vercel' },
];

const Skills = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from('.skill-row', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        y: 40,
        x: -10,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, container);

    return () => mm.revert();
  }, []);

  return (
    <section id="skills" ref={container} className="w-full bg-[#0A0A0A] text-white px-10 md:px-20 py-24 font-sans border-t border-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column - Label */}
        <div className="md:col-span-4">
          <span className="text-[10px] sm:text-xs font-poppins tracking-[0.2em] text-gray-500 uppercase mb-8 block">
            03 / Expertise
          </span>
        </div>

        {/* Right Column - Skills List */}
        <div className="md:col-span-8">
          <div className="flex flex-col w-full border-t border-neutral-800">
            {skillsList.map((skill, index) => (
              <div 
                key={index} 
                className="skill-row group flex items-center justify-between py-8 border-b border-neutral-800 hover:border-white transition-colors duration-500 cursor-default"
              >
                <div className="flex items-baseline gap-6 md:gap-12">
                  <span className="text-xs md:text-sm font-poppins tracking-widest text-gray-500 group-hover:text-white transition-colors duration-500">
                    {skill.num}
                  </span>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-300 group-hover:text-white transition-colors duration-500 group-hover:translate-x-4 transform ease-out">
                    {skill.title}
                  </h3>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-4 group-hover:translate-x-0 transform ease-out">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
