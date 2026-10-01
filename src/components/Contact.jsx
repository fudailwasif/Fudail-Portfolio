import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Contact = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.from('.contact-heading', {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }).from(
          '.contact-link',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.6',
        );
      },
      container,
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={container}
      id="contact"
      className="w-full bg-[#0A0A0A] text-white px-10 md:px-20 py-32 md:py-48 font-sans border-t border-neutral-900 flex flex-col justify-center items-center text-center">
      <div className="w-full max-w-5xl flex flex-col items-center">
        <span className="contact-heading text-[10px] sm:text-xs font-poppins tracking-[0.2em] text-gray-500 uppercase mb-8 block">
          04 / Get in touch
        </span>

        <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-bold leading-[0.85] tracking-tighter mb-16">
          <div className="overflow-hidden">
            <span className="contact-heading block">Have a website</span>
          </div>
          <div className="overflow-hidden">
            <span className="contact-heading block">worth building?</span>
          </div>
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center mt-8">
          <a
            href="fudailwasif.dev@gmail.com"
            className="contact-link group relative text-xl md:text-3xl font-medium tracking-tight">
            fudailwasif.dev@gmail.com
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </a>

          <div className="flex gap-8">
            <a
              href="https://github.com/fvyalwayshigh-sys"
              target="_blank"
              rel="noreferrer"
              className="contact-link text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300">
              GitHub
            </a>
            <a
              href="www.linkedin.com/in/fudailwasif"
              target="_blank"
              rel="noreferrer"
              className="contact-link text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            {/* <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="contact-link text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-300">
              Twitter
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
