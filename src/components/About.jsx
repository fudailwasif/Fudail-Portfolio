import { profile } from '../data/profile';

export default function About() {
  return <section id="about" tabIndex={-1} className="about-section light-section section-shell" aria-labelledby="about-title">
    <div className="section-heading"><p className="eyebrow mono">02 / A little about me</p><h2 id="about-title" data-split>Curiosity first.<br />Code follows.</h2></div>
    <div className="about-body"><div className="about-aside" data-reveal><span className="about-mark" aria-hidden="true">f/w.</span><p className="mono">Learning by building.<br />Building with purpose.</p></div><div className="about-copy" data-reveal>{profile.about.map(text => <p key={text}>{text}</p>)}<div className="education"><span className="mono">Education</span><p>{profile.education}</p></div></div></div>
  </section>;
}
