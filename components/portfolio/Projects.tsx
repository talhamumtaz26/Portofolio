'use client';

import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ProjectButtons, TechnologyChip } from './ProjectParts';

let projectNotesImport: Promise<typeof import('./ProjectNotesModal')> | undefined;
const loadProjectNotes = () => projectNotesImport ??= import('./ProjectNotesModal');
const ProjectNotesModal = lazy(loadProjectNotes);
import { ProjectShowcase } from '@/components/portfolio/ProjectShowcase';
import { projects, type Project } from '@/data/projects';

const pad = (value: number) => String(value).padStart(2, '0');
const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };
function ProjectMedia({ project }: { project: Project }) {
    if (project.live) return <iframe className="project-live-frame" src={project.live} title={`${project.title} live preview`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />;
    if (project.video) return <video className="project-image" controls preload="metadata" poster={project.image || undefined}><source src={project.video} />Your browser does not support video.</video>;
    if (project.image) return <img className="project-image" src={project.image} alt={`${project.title} project screenshot`} loading="lazy" decoding="async" width="1200" height="800" />;

    return <div className={`project-cover ${project.slug}`}>
        <div className="cover-top"><span>{project.featured ? 'FEATURED PROJECT' : 'SELECTED PROJECT'}</span><span>{pad(projects.indexOf(project) + 1)}</span></div>
        {project.featured ? <div className="fashion-type"><span>LA CASA</span><i>de fashion.</i><small>PERSONAL STYLE. MADE PERSONAL.</small></div> : project.slug === 'weatherwizard' ? <div className="weather-type"><span className="weather-symbol">◌</span><strong>Weather<br /><i>Wizard.</i></strong><small>THE WORLD, THROUGH WEATHER.</small></div> : <div className="watchly-type"><span>WATCH</span><span className="watch-outline">NEXT.</span><small>DISCOVER. SAVE. WATCH.</small></div>}
        <span className="media-disclosure">Concept cover · screenshots to be added</span>
    </div>;
}

function ProjectNumber({ index, animate = true }: { index: number; animate?: boolean }) {
    const previousIndex = useRef(index);
    const countValue = useMotionValue(index + 1);
    const countSpring = useSpring(countValue, { duration: 0.36, bounce: 0 });
    const displayedNumber = useTransform(countSpring, value => pad(Math.round(value)));

    useEffect(() => {
        const fromIndex = previousIndex.current;
        if (!animate) {
            countValue.set(index + 1);
            countSpring.set(index + 1);
            previousIndex.current = index;
            return;
        }

        countValue.set(fromIndex + 1);
        countSpring.set(fromIndex + 1);
        const frame = requestAnimationFrame(() => countValue.set(index + 1));
        previousIndex.current = index;
        return () => cancelAnimationFrame(frame);
    }, [animate, countSpring, countValue, index]);

    return <div className="showcase-number">
        <span className="sr-only">Project {index + 1} of {projects.length}</span><span className="showcase-number-window" aria-hidden="true"><AnimatePresence initial={false} mode="popLayout">
            <motion.span key={index} initial={animate ? { y: '70%', opacity: 0 } : false} animate={{ y: 0, opacity: 1 }} exit={animate ? { y: '-70%', opacity: 0 } : undefined} transition={transition}>{displayedNumber}</motion.span>
        </AnimatePresence></span><span aria-hidden="true">/ {pad(projects.length)}</span>
    </div>;
}

function ProjectInfo({ project, animate }: { project: Project; animate: boolean }) {
    return <motion.div className="showcase-copy" initial={animate ? { opacity: 0, y: 20 } : false} animate={{ opacity: 1, y: 0 }} exit={animate ? { opacity: 0, y: -14 } : undefined} transition={transition}>
        <p className="showcase-category">{project.category}</p>
        <h3 id={`project-title-${project.slug}`}>{project.title}</h3>
        <p className="showcase-description">{project.description}</p>
        <div className="showcase-tags" aria-label="Technologies used">
            {project.technologies.map((technology, index) => <TechnologyChip key={`${project.slug}-${technology}`} name={technology} animate={animate} index={index} />)}
        </div>
    </motion.div>;
}

function ProjectPreview({ project, animate }: { project: Project; animate: boolean }) {
    const screenshot = project.showcaseScreenshot || project.image;
    const hasScrollMedia = Boolean(screenshot || project.video);
    return <motion.div className="showcase-preview" data-media-kind={project.live || project.video ? 'live' : screenshot ? 'image' : 'placeholder'}>
        <div className="showcase-browser-bar" aria-hidden="true"><span className="showcase-window-dots"><i /><i /><i /></span><span>{project.title}</span><ArrowUpRight size={15} /></div>
        <div className="showcase-image-stage">
            <AnimatePresence initial={false} mode="sync">
                <motion.div className="showcase-image-layer" key={project.slug} initial={animate ? { opacity: 0, scale: 0.97, y: 14 } : false} animate={{ opacity: 1, scale: 1, y: 0 }} exit={animate ? { opacity: 0, scale: 0.98, y: -10 } : undefined} transition={{ ...transition, duration: 0.6 }}>
                    {hasScrollMedia && !project.live ? <ProjectShowcase
                        title={project.title}
                        projectUrl={project.liveUrl}
                        screenshot={screenshot}
                        screenshotDimensions={project.showcaseDimensions ?? undefined}
                        video={project.video}
                        videoDuration={project.videoDuration}
                        mobileScreenshot={project.mobileScreenshot}
                        mobileVideo={project.mobileVideo}
                        projectIndex={projects.indexOf(project)}
                        fallback={<ProjectMedia project={project} />}
                    /> : <ProjectMedia project={project} />}
                </motion.div>
            </AnimatePresence>
        </div>
    </motion.div>;
}

function StickyShowcase({ onSelect, onPrefetch }: { onSelect: (project: Project) => void; onPrefetch: () => void }) {
    const track = useRef<HTMLDivElement>(null);
    const geometry = useRef({ trackStart: 0, projectTop: 0, projectStep: 540 });
    const [active, setActive] = useState(0);
    const [desktop, setDesktop] = useState(false);
    useEffect(() => {
        const query = window.matchMedia('(min-width: 900px)');
        const update = () => setDesktop(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);
    useEffect(() => {
        const element = track.current;
        if (!element) return;

        let measurementFrame = 0;
        let scrollFrame = 0;
        let trackVisible = false;
        const cached = geometry.current;
        const updateActive = () => {
            scrollFrame = 0;
            if (!trackVisible) return;
            const elapsed = Math.max(0, window.scrollY - (cached.trackStart - cached.projectTop));
            const next = Math.min(projects.length - 1, Math.floor(elapsed / cached.projectStep));
            setActive(previous => previous === next ? previous : next);
        };
        const scheduleScroll = () => { if (trackVisible && !scrollFrame) scrollFrame = requestAnimationFrame(updateActive); };
        const measure = () => {
            measurementFrame = 0;
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            cached.projectTop = parseFloat(style.getPropertyValue('--project-top')) || 0;
            cached.projectStep = parseFloat(style.getPropertyValue('--project-step')) || 540;
            cached.trackStart = window.scrollY + rect.top;
            scheduleScroll();
        };
        const scheduleMeasure = () => { if (!measurementFrame) measurementFrame = requestAnimationFrame(measure); };
        const observer = new ResizeObserver(scheduleMeasure);
        observer.observe(element);
        const sticky = element.querySelector<HTMLElement>('.showcase-sticky');
        if (sticky) observer.observe(sticky);
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            trackVisible = entry.isIntersecting;
            if (trackVisible) {
                window.addEventListener('scroll', scheduleScroll, { passive: true });
                scheduleScroll();
            } else {
                window.removeEventListener('scroll', scheduleScroll);
                if (scrollFrame) cancelAnimationFrame(scrollFrame);
                scrollFrame = 0;
            }
        }, { rootMargin: '300px 0px', threshold: 0 });
        visibilityObserver.observe(element);
        window.addEventListener('resize', scheduleMeasure, { passive: true });
        measure();
        return () => {
            cancelAnimationFrame(measurementFrame);
            cancelAnimationFrame(scrollFrame);
            observer.disconnect();
            visibilityObserver.disconnect();
            window.removeEventListener('scroll', scheduleScroll);
            window.removeEventListener('resize', scheduleMeasure);
        };
    }, []);

    const project = projects[active];
    return <div ref={track} className="showcase-track" style={{ '--project-count': projects.length } as CSSProperties}>
        <div className="showcase-sticky">
            <div className="showcase-toolbar"><span className="eyebrow">Selected work</span><a href="#services" className="showcase-skip">Continue past projects <ArrowDown size={14} aria-hidden="true" /></a></div>
            <article className="showcase-layout" aria-labelledby={`project-title-${project.slug}`}>
                <div className="showcase-information">
                    <ProjectNumber index={active} />
                    <div className="showcase-copy-stage"><AnimatePresence initial={false} mode={desktop ? 'sync' : 'wait'}><ProjectInfo key={project.slug} project={project} animate /></AnimatePresence></div>
                    <ProjectButtons project={project} onSelect={onSelect} onPrefetch={onPrefetch} includeGithub className="showcase-desktop-actions" />
                </div>
                <div className="showcase-preview-column">
                    <ProjectPreview project={project} animate />
                    <ProjectButtons project={project} onSelect={onSelect} onPrefetch={onPrefetch} includeGithub className="showcase-mobile-actions" />
                </div>
            </article>
            <div className="showcase-bottom">
                <nav className="showcase-progress" aria-label="Choose a project">
                    {projects.map((item, index) => <button key={item.slug} type="button" aria-label={`Show project ${index + 1}: ${item.title}`} aria-current={index === active ? 'step' : undefined} onClick={() => window.scrollTo({ top: geometry.current.trackStart - geometry.current.projectTop + index * geometry.current.projectStep, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced' ? 'instant' : 'smooth' })}>
                        <span className="progress-track"><span className={index <= active ? 'filled' : ''} /></span>
                        <span>{pad(index + 1)}</span>
                    </button>)}
                </nav>
            </div>
        </div>
    </div>;
}

export function Projects() {
    const [selected, setSelected] = useState<Project | null>(null);
    const [openerElement, setOpenerElement] = useState<HTMLElement | null>(null);
    const reducedMotion = useReducedMotion();
    const openProject = (project: Project) => {
        setOpenerElement(document.activeElement as HTMLElement);
        setSelected(project);
    };

    return <section id="work" className="section wrap projects-section" aria-labelledby="projects-heading">
        <div className="section-heading reveal"><div><p className="eyebrow">/04</p><h2 id="projects-heading">Projects</h2></div></div>
        {reducedMotion ? <ol className="showcase-flow" aria-label="Selected projects">{projects.map((project, index) => <li key={project.slug} className="showcase-flow-project" aria-labelledby={`project-title-${project.slug}`}>
            <ProjectNumber index={index} animate={false} />
            <ProjectInfo project={project} animate={false} />
            <ProjectPreview project={project} animate={false} />
            <ProjectButtons project={project} onSelect={openProject} onPrefetch={() => { void loadProjectNotes(); }} includeGithub={false} />
        </li>)}</ol> : <StickyShowcase onSelect={openProject} onPrefetch={() => { void loadProjectNotes(); }} />}
        {selected && <Suspense fallback={null}><ProjectNotesModal project={selected} onClose={() => setSelected(null)} opener={openerElement} /></Suspense>}
    </section>;
}
