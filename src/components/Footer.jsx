import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0A0A0A] text-gray-500 px-10 md:px-20 py-8 font-poppins text-[10px] sm:text-xs tracking-widest uppercase flex flex-col md:flex-row justify-between items-center border-t border-neutral-900">
      <div>
        &copy; {new Date().getFullYear()} Fudail
      </div>
      <div className="mt-4 md:mt-0">
        Designed & Developed with React + GSAP
      </div>
    </footer>
  );
};

export default Footer;
