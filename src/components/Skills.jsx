import { expertise } from '../data/profile';

export default function Skills() {
  return <section id="skills" tabIndex={-1} className="skills-section light-section section-shell" aria-labelledby="skills-title"><div className="section-heading"><p className="eyebrow mono">03 / Expertise</p><h2 id="skills-title" data-split>The tools.<br />The thinking.</h2></div><div className="skill-list">{expertise.map(group => <div className="skill-row" key={group.number} data-reveal><span className="mono skill-number">{group.number}</span><div><h3>{group.title}</h3><p>{group.description}</p></div><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>)}</div></section>;
}
