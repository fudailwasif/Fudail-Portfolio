import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { profile, expertise } from './src/data/profile.js';
import { projectsData } from './src/data/projects.js';

const site = 'https://fudail-portfolio-mauve.vercel.app/';
const personId = `${site}#person`;
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

function staticFallback() {
  const projects = projectsData.map(project => `<article id="${escapeHtml(project.id)}">
    <p class="static-meta">${escapeHtml(project.number)} — 03 · ${escapeHtml(project.category)}</p>
    <h3><a href="${escapeHtml(project.live)}">${escapeHtml(project.title)}${project.subtitle ? ` — ${escapeHtml(project.subtitle)}` : ''}</a></h3>
    <img src="/projects/${escapeHtml(project.image.path)}-960.webp" width="${project.image.width}" height="${project.image.height}" alt="${escapeHtml(project.image.alt)}" loading="lazy">
    <p>${escapeHtml(project.description)}</p><p><strong>Engineering focus:</strong> ${escapeHtml(project.engineering)}</p>
    <p>${escapeHtml(project.details)}</p><p><strong>Technologies and focus:</strong> ${project.tags.map(escapeHtml).join(' · ')}</p>
    <p><a href="${escapeHtml(project.live)}">${escapeHtml(project.liveLabel)} — ${escapeHtml(project.title)}</a>${project.source ? ` · <a href="${escapeHtml(project.source)}">Source code — ${escapeHtml(project.title)}</a>` : ''}</p>
  </article>`).join('');
  const skills = expertise.map(group => `<li><strong>${escapeHtml(group.title)}:</strong> ${group.skills.map(escapeHtml).join(', ')}</li>`).join('');
  return `<div id="seo-fallback">
    <header id="top"><a href="#top">Fudail Wasif</a><nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#skills">Expertise</a><a href="#contact">Contact</a></nav></header>
    <main><section class="static-intro" aria-labelledby="static-title"><p>Frontend / React Developer · Karachi, Pakistan</p><h1 id="static-title">Fudail Wasif builds interfaces.</h1><p>${escapeHtml(profile.introduction)}</p><a href="#work">View selected work</a></section>
    <section id="work" aria-labelledby="static-work"><h2 id="static-work">Selected work</h2>${projects}</section>
    <section id="about" aria-labelledby="static-about"><h2 id="static-about">About Fudail Wasif</h2>${profile.about.map(text => `<p>${escapeHtml(text)}</p>`).join('')}</section>
    <section id="skills" aria-labelledby="static-skills"><h2 id="static-skills">Frontend expertise</h2><ul>${skills}</ul></section>
    <section id="contact" aria-labelledby="static-contact"><h2 id="static-contact">Contact</h2><p><a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a></p>${profile.socials.map(link => `<p><a href="${escapeHtml(link.url)}">${escapeHtml(link.label)} — Fudail Wasif</a></p>`).join('')}</section></main>
    <footer>© 2026 Fudail Wasif</footer>
  </div>`;
}

function structuredData() {
  const graph = [
    { '@type': 'Person', '@id': personId, name: profile.name, jobTitle: 'Frontend / React Developer', url: site, homeLocation: { '@type': 'Place', name: profile.location }, sameAs: profile.socials.map(link => link.url), knowsAbout: ['React', 'JavaScript', 'Responsive web design', 'REST API integration'] },
    { '@type': 'WebSite', '@id': `${site}#website`, name: 'Fudail Wasif — Frontend & React Developer', url: site, description: 'Portfolio of frontend and React projects by Fudail Wasif, based in Karachi, Pakistan.', inLanguage: 'en', author: { '@id': personId } },
    ...projectsData.map(project => ({
      '@type': project.id === 'gitscout' ? 'SoftwareApplication' : 'CreativeWork',
      '@id': `${site}#${project.id}`,
      name: project.subtitle ? `${project.title} — ${project.subtitle}` : project.title,
      description: `${project.description} ${project.engineering}`,
      url: project.live,
      image: `${site}projects/${project.image.path}-1440.webp`,
      creator: { '@id': personId },
      ...(project.id === 'gitscout' ? { codeRepository: project.source } : {}),
      ...(project.id === 'gitscout' ? { operatingSystem: 'Web browser', programmingLanguage: 'JavaScript' } : {}),
    })),
  ];
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
}

function crawlableHtml() {
  return {
    name: 'crawlable-portfolio-html',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace('<!-- structured-data -->', structuredData())
          .replace('<div id="root"></div>', `<div id="root">${staticFallback()}</div>`);
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [crawlableHtml(), tailwindcss(), react()],
});
