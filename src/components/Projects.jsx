import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data/projects';

const ArrowUpRight = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="square"
    strokeLinejoin="miter">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const ProjectCard = ({ data }) => {
  const cardRef = useRef(null);
  const arrowRef = useRef(null);
  const innerRef = useRef(null);

  const handleMouseEnter = () => {
    let mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(cardRef.current, {
        backgroundColor: '#ffffff',
        color: '#0A0A0A',
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(arrowRef.current, { x: 5, y: -5, duration: 0.35, ease: 'power2.out' });
      gsap.to(innerRef.current, { y: -6, duration: 0.4, ease: 'power2.out' });
    });
  };

  const handleMouseLeave = () => {
    let mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(cardRef.current, {
        backgroundColor: '#0A0A0A',
        color: '#ffffff',
        duration: 0.45,
        ease: 'power2.out',
      });
      gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.35, ease: 'power2.out' });
      gsap.to(innerRef.current, { y: 0, duration: 0.4, ease: 'power2.out' });
    });
  };

  return (
    <a
      href={data.link}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`project-card ${data.colSpanClass} block w-full border border-neutral-800 bg-[#0A0A0A] text-white cursor-pointer outline-none`}
      style={{ textDecoration: 'none' }}
    >
      <div ref={innerRef} className="flex flex-col justify-between h-full p-8 md:p-12 min-h-[420px] md:min-h-[500px]">

        {/* Top — Metadata */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] font-poppins tracking-[0.2em] uppercase opacity-50">
            {data.id} / {data.category}
          </span>
          <span className="text-[10px] font-poppins tracking-[0.2em] uppercase opacity-50">
            {data.year}
          </span>
        </div>

        {/* Middle — Title + Description */}
        <div className="mt-auto pt-16">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.85] mb-8">
            <span className="block">{data.title[0]}</span>
            <span className="block opacity-40">{data.title[1]}</span>
          </h3>

          <p className="text-sm md:text-base font-light leading-relaxed opacity-50 max-w-sm mb-10">
            {data.description}
          </p>

          {/* Bottom — Tags + Arrow */}
          <div className="flex justify-between items-end">
            <div className="flex flex-wrap gap-2">
              {data.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-[9px] font-poppins uppercase tracking-widest border border-current opacity-40 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div ref={arrowRef} className="flex-shrink-0 ml-4">
              <ArrowUpRight />
            </div>
          </div>
        </div>

      </div>
    </a>
  );
};

const Projects = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.from('.projects-label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      .from('.projects-heading', {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.4')
      .from('.project-card', {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.5');
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="work" ref={container} className="w-full bg-[#0A0A0A] text-white px-10 md:px-20 py-32 font-sans border-t border-neutral-900">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 md:mb-28 gap-8">
        <span className="projects-label text-[10px] sm:text-xs font-poppins tracking-[0.2em] text-gray-500 uppercase mt-1">
          01 / Selected work
        </span>
        <h2 className="projects-heading text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.85] tracking-tighter md:text-right">
          <span className="block">Built, not</span>
          <span className="block text-gray-400">just studied.</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} data={project} />
        ))}
      </div>

    </section>
  );
};

export default Projects;
