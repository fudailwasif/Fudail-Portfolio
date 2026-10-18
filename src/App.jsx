import { useCallback, useEffect, useRef, useState } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Philosophy from './components/Philosophy';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScroll from './hooks/useScroll';
import usePageMotion from './hooks/usePageMotion';
import { ScrollTrigger, hasLimitedResources } from './lib/motion';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

export default function App() {
  const root = useRef(null);
  const { navigate, pause, resume } = useScroll();
  const [introComplete, setIntroComplete] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches || hasLimitedResources()
  );
  const completeIntro = useCallback(() => setIntroComplete(true), []);
  usePageMotion(root, introComplete);

  useEffect(() => {
    if (!introComplete) return;
    const frame = requestAnimationFrame(() => {
      if (window.location.hash) navigate(window.location.hash, { history: false, immediate: true });
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(frame);
  }, [introComplete, navigate]);

  return <div ref={root}>
    {!introComplete && <Preloader pause={pause} resume={resume} onComplete={completeIntro} />}
    <CustomCursor ready={introComplete} />
    <div inert={!introComplete}>
      <a className="skip-link" href="#main">Skip to content</a>
      <NavBar navigate={navigate} pause={pause} resume={resume} />
      <main id="main" tabIndex={-1}><Hero /><Projects /><About /><Skills /><Philosophy /><Contact /></main>
      <Footer />
    </div>
  </div>;
}
