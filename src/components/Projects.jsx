import { useCallback, useEffect, useRef, useState } from 'react';
import { projectsData } from '../data/projects';
import { hasLimitedResources } from '../lib/motion';
import ProjectItem from './ProjectItem';

const previewMedia = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const hasConstrainedConnection = () => {
  const connection = navigator.connection;
  return Boolean(connection?.saveData || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType) || (connection?.downlink && connection.downlink < 2));
};

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const playingVideo = useRef(null);
  const [previewEnabled, setPreviewEnabled] = useState(() =>
    window.matchMedia(previewMedia).matches && !hasLimitedResources() && !hasConstrainedConnection()
  );

  const changePreview = useCallback((id, active) => {
    setActiveProjectId(current => active ? id : current === id ? null : current);
  }, []);

  const startVideo = useCallback(video => {
    if (playingVideo.current && playingVideo.current !== video) playingVideo.current.pause();
    playingVideo.current = video;
  }, []);

  const stopVideo = useCallback(video => {
    video.pause();
    if (playingVideo.current === video) playingVideo.current = null;
  }, []);

  useEffect(() => {
    const media = window.matchMedia(previewMedia);
    const update = () => {
      setPreviewEnabled(media.matches && !hasLimitedResources() && !hasConstrainedConnection());
      setActiveProjectId(null);
      setHoveredIndex(null);
    };
    media.addEventListener('change', update);
    navigator.connection?.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      navigator.connection?.removeEventListener('change', update);
    };
  }, []);

  return <section id="work" tabIndex={-1} className="work-section section-shell light-section" aria-labelledby="work-title">
    <div className="section-heading"><p className="eyebrow mono">01 / Selected work</p><div><h2 id="work-title" data-split>A few things<br />I’ve put into the world.</h2><p className="section-intro">Three projects. Different problems. The same attention to detail.</p></div></div>
    <div className="projects-list">
      {projectsData.map((project, index) => <ProjectItem
        key={project.id}
        project={project}
        previewEnabled={previewEnabled}
        isActive={activeProjectId === project.id}
        isDimmed={hoveredIndex !== null && hoveredIndex !== index}
        onHoverChange={active => setHoveredIndex(active ? index : null)}
        onPreviewChange={changePreview}
        onPreviewStart={startVideo}
        onPreviewStop={stopVideo}
      />)}
    </div>
  </section>;
}
