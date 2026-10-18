import { profile } from '../data/profile';
import Arrow from './Arrow';
import MagneticLink from './MagneticLink';

export default function Contact() {
  return <section id="contact" tabIndex={-1} className="contact-section section-shell" aria-labelledby="contact-title"><div className="contact-top"><p className="eyebrow mono">05 / Let’s talk</p><span className="availability mono"><span className="status-dot" />{profile.availability}</span></div><h2 id="contact-title" data-split>Have something<br />worth building?</h2><div className="contact-bottom"><MagneticLink className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow /></MagneticLink><div className="social-links">{profile.socials.map(link => <a className="text-link" key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}<Arrow /><span className="sr-only"> (opens in a new tab)</span></a>)}</div></div></section>;
}
