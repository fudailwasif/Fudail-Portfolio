import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const About = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from('.about-label', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      })
      .from('.about-heading', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.about-text', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.6')
      .from('.about-skill', {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out'
      }, '-=0.4');
    }, container);

    return () => mm.revert();
  }, []);

  return (
    <section ref={container} id="about" className="w-full bg-[#0A0A0A] text-white px-10 md:px-20 py-32 font-sans border-t border-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left Column - Label & Intro */}
        <div className="md:col-span-5 flex flex-col">
          <span className="about-label text-[10px] sm:text-xs font-poppins tracking-[0.2em] text-gray-500 uppercase mb-8 md:mb-16 block">
            02 / About
          </span>
          <h2 className="about-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.9] tracking-tighter mb-8 max-w-sm">
            I craft digital experiences with precision.
          </h2>
        </div>

        {/* Right Column - Paragraphs & Skills */}
        <div className="md:col-span-7 flex flex-col justify-end pt-2">
          <div className="max-w-xl">
            <p className="about-text text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-6">
              I am a frontend developer with a strong focus on design, typography, and motion. I believe that the best digital products are built at the intersection of aesthetic intent and robust engineering.
            </p>
            <p className="about-text text-base text-gray-400 font-light leading-relaxed mb-12">
              My approach involves stripping away the unnecessary and focusing on the core message. Through clean code and mindful design, I build interfaces that are not just functional, but memorable.
            </p>
            
            {/* Simple skills list for About section */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'GSAP', 'Git', 'Vercel'].map((skill, i) => (
                <span key={i} className="about-skill text-sm font-poppins text-gray-400 tracking-wider">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
