import { profile } from '../data/profile';
import Arrow from './Arrow';
import MagneticLink from './MagneticLink';

export default function Hero() {
  return <section id="top" tabIndex={-1} className="hero section-shell" aria-labelledby="hero-heading">
    <div className="hero-eyebrow mono"><span>{profile.role}</span><span>Independent mind. Intentional work.</span></div>
    <h1 id="hero-heading" className="hero-heading"><span className="hero-first-line"><span className="hero-clip"><span className="hero-word">Fudail</span></span>{' '}<span className="hero-clip"><span className="hero-word">builds</span></span></span>{' '}<span className="hero-clip"><span className="hero-word hero-outline">interfaces.</span></span></h1>
    <div className="hero-bottom"><div className="hero-intro"><span className="mini-cross" aria-hidden="true">✳</span><p>{profile.introduction}</p></div><MagneticLink href="#work" className="work-cta"><span>View selected work</span><span className="cta-arrow"><Arrow down /></span></MagneticLink></div>
    <div className="hero-foot mono"><span className="availability"><span className="status-dot" />{profile.availability}</span><span className="hero-coordinate">Based in Karachi, Pakistan <span aria-hidden="true">↘</span></span></div>
  </section>;
}
