import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Arrow from './Arrow';

const spring = { stiffness: 145, damping: 22, mass: 0.7 };

export default function ProjectItem({ project, previewEnabled, isActive, isDimmed, onHoverChange, onPreviewChange, onPreviewStart, onPreviewStop }) {
  const [hovered, setHovered] = useState(false);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);
  const rowRef = useRef(null);
  const pointerInside = useRef(false);
  const focusInside = useRef(false);
  const resetTimer = useRef(null);
  const image = project.image;
  const activeHover = previewEnabled && hovered;
  const activePreview = previewEnabled && isActive && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!activePreview) {
      onPreviewStop(video);
      resetTimer.current = window.setTimeout(() => { video.currentTime = 0; }, 300);
      return () => window.clearTimeout(resetTimer.current);
    }

    window.clearTimeout(resetTimer.current);
    if (!requested) return;

    const play = () => {
      onPreviewStart(video);
      const attempt = video.play();
      attempt?.catch(() => {
        onPreviewStop(video);
        setVideoFailed(true);
        onPreviewChange(project.id, false);
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) play();
    else {
      video.addEventListener('canplay', play, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener('canplay', play);
      onPreviewStop(video);
    };
  }, [activePreview, requested, onPreviewChange, onPreviewStart, onPreviewStop, project.id]);

  useEffect(() => {
    if (!activePreview || !rowRef.current) return;
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) onPreviewChange(project.id, false);
    }, { threshold: 0.1 });
    observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, [activePreview, onPreviewChange, project.id]);

  const activatePreview = () => {
    if (!previewEnabled || videoFailed) return;
    setRequested(true);
    onPreviewChange(project.id, true);
  };

  const pointerEnter = event => {
    if (!previewEnabled || event.pointerType !== 'mouse') return;
    pointerInside.current = true;
    setHovered(true);
    onHoverChange(true);
    activatePreview();
  };
  const pointerLeave = () => {
    pointerInside.current = false;
    setHovered(false);
    onHoverChange(false);
    if (!focusInside.current) onPreviewChange(project.id, false);
  };
  const focus = event => {
    focusInside.current = Boolean(event.target.closest('.case-visual, .case-title a'));
    if (focusInside.current) activatePreview();
    else if (!pointerInside.current) onPreviewChange(project.id, false);
  };
  const blur = event => {
    if (event.currentTarget.contains(event.relatedTarget) && event.relatedTarget.closest('.case-visual, .case-title a')) return;
    focusInside.current = false;
    if (!pointerInside.current) onPreviewChange(project.id, false);
  };

  return <motion.article
    ref={rowRef}
    id={project.id}
    tabIndex={-1}
    className="case-row"
    aria-labelledby={`${project.id}-title`}
    animate={{ opacity: isDimmed ? 0.48 : 1 }}
    transition={{ duration: 0.25 }}
    onPointerEnter={pointerEnter}
    onPointerLeave={pointerLeave}
    onFocusCapture={focus}
    onBlurCapture={blur}
  >
    <span className="case-divider" aria-hidden="true" />
    <div className="case-top case-meta mono">
      <span>{project.number} — 03</span>
      <span>{project.category}</span>
      <span className="case-top-stack">{project.tags.join(' / ')}</span>
    </div>
    <motion.a
      className="case-visual case-inline-image"
      href={project.live}
      target="_blank"
      rel="noreferrer"
      aria-label={`${project.title}: ${project.liveLabel} (opens in a new tab)`}
      animate={{ scale: activeHover ? 1.012 : 1 }}
      transition={spring}
    >
      <span className="case-preview-media">
        <img
        src={`/projects/${image.path}-1440.webp`}
        srcSet={`/projects/${image.path}-640.webp 640w, /projects/${image.path}-960.webp 960w, /projects/${image.path}-1440.webp 1440w`}
        sizes="(min-width: 1024px) 55vw, (min-width: 768px) 65vw, 78vw"
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        />
        {previewEnabled && <motion.video
          ref={videoRef}
          className="case-preview-video"
          src={requested ? project.video : undefined}
          poster={`/projects/${image.path}-960.webp`}
          preload="none"
          muted
          loop
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          animate={{ opacity: playing && activePreview ? 1 : 0 }}
          transition={{ duration: 0.28, ease: 'easeInOut' }}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => { setVideoFailed(true); onPreviewChange(project.id, false); }}
        />}
      </span>
    </motion.a>
    <h3 id={`${project.id}-title`} className="case-title">
      <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title}: ${project.liveLabel} (opens in a new tab)`}><span className="case-title-mask"><motion.span className="case-title-shift" animate={{ x: activeHover ? 8 : 0 }} transition={spring}><span className="case-title-line">{project.title}</span></motion.span></span></a>
      {project.subtitle && <span className="case-subtitle case-meta">{project.subtitle}</span>}
    </h3>
    <div className="case-bottom case-meta">
      <div className="case-summary"><p className="case-description">{project.description}</p><p className="case-focus"><span className="mono">Engineering focus</span>{project.engineering}</p></div>
      <div className="case-side"><ul className="case-tags mono" aria-label="Technologies and focus">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><details><summary>Behind the build <span aria-hidden="true">+</span></summary><p>{project.details}</p></details></div>
      <div className="case-actions"><a className="text-link" href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.liveLabel} — ${project.title} (opens in a new tab)`}>{project.liveLabel}<Arrow /></a>{project.source && <a className="text-link" href={project.source} target="_blank" rel="noreferrer" aria-label={`Source code — ${project.title} (opens in a new tab)`}>Source<Arrow /></a>}</div>
    </div>
  </motion.article>;
}
