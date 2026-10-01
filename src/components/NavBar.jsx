import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    // Cleanup on unmount
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    gsap.set(mobileMenuRef.current, { yPercent: -100 });

    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.nav-brand', {
        y: -20,
        opacity: 0,
        duration: 0.8
      })
      .from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      }, '-=0.6');
    }, navRef);

    return () => mm.revert();
  }, []);

  useEffect(() => {
    let mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: 'power3.inOut'
        });
        gsap.fromTo('.mobile-nav-item', 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          yPercent: -100,
          duration: 0.5,
          ease: 'power3.inOut'
        });
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (isMobileMenuOpen) {
        gsap.set(mobileMenuRef.current, { yPercent: 0 });
        gsap.set('.mobile-nav-item', { y: 0, opacity: 1 });
      } else {
        gsap.set(mobileMenuRef.current, { yPercent: -100 });
      }
    });

    return () => mm.revert();
  }, [isMobileMenuOpen]);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Slight delay to allow mobile menu to close before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, isMobileMenuOpen ? 500 : 0);
  };

  const navLinks = [
    { name: 'Work', href: 'work' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Contact', href: 'contact' }
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out px-10 md:px-20 flex justify-between items-center ${
          isScrolled ? 'bg-[#0A0A0A] border-b border-neutral-900 py-6' : 'bg-transparent border-b border-transparent py-10'
        }`}
      >
        <div className="nav-brand font-sans font-bold text-lg md:text-xl tracking-tighter text-white z-[60]">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); setIsMobileMenuOpen(false); }}>
            F/
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="nav-item text-[10px] uppercase tracking-[0.2em] font-poppins text-gray-400 hover:text-white transition-colors duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden nav-brand z-[60] text-[10px] uppercase tracking-[0.2em] font-poppins text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-center items-center px-10 invisible"
        style={{ visibility: 'visible' /* Prevent flicker before GSAP sets it */ }}
      >
        <nav className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.href}`}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="mobile-nav-item text-4xl font-sans font-bold tracking-tighter text-white hover:text-gray-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
