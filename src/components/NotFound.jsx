import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Arrow from './Arrow';
import CustomCursor from './CustomCursor';

export default function NotFound() {
  useEffect(() => {
    const title = document.title;
    const robots = document.querySelector('meta[name="robots"]');
    const previousRobots = robots?.content;
    const canonical = document.querySelector('link[rel="canonical"]');
    document.title = '404 — Page Not Found | Fudail Wasif';
    if (robots) robots.content = 'noindex, follow';
    canonical?.remove();

    return () => {
      document.title = title;
      if (robots) robots.content = previousRobots;
      if (canonical) document.head.append(canonical);
    };
  }, []);

  return <div className="not-found">
    <CustomCursor ready />
    <a className="skip-link" href="#not-found-main">Skip to content</a>
    <header className="not-found-header section-shell">
      <Link to="/" className="wordmark" aria-label="Fudail Wasif, home">F/W.</Link>
      <span className="mono not-found-header-label">Portfolio / Error page</span>
    </header>

    <main id="not-found-main" className="not-found-main section-shell" tabIndex={-1}>
      <div className="not-found-top mono"><span>Lost in the details</span><span>01 / 01</span></div>
      <div className="not-found-center">
        <h1 className="not-found-number"><span aria-hidden="true">4<span className="not-found-zero">0</span>4</span><span className="sr-only">404 — Page not found</span></h1>
        <div className="not-found-message">
          <div><span className="not-found-asterisk" aria-hidden="true">✳</span><h2>This page wandered off.</h2></div>
          <p>The page you’re looking for isn’t here. Let’s get you back on track.</p>
        </div>
      </div>
      <nav className="not-found-actions" aria-label="Continue browsing">
        <Link to="/" className="not-found-primary">Back to home <Arrow /></Link>
        <Link to="/#work" className="text-link not-found-secondary">Explore my work <Arrow /></Link>
      </nav>
    </main>

    <footer className="not-found-footer section-shell mono"><span>Error / 404</span><span>Fudail Wasif © 2026</span></footer>
  </div>;
}
