'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import type { Project } from '@/data/projects';
import { ProjectButtons, TechnologyChip } from './ProjectParts';

const pad = (value: number) => String(value).padStart(2, '0');

function ProjectGallery({ project }: { project: Project }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const hasImages = project.gallery.length > 0;
    const image = hasImages ? project.gallery[activeIndex] : null;
    const counter = hasImages ? `${pad(activeIndex + 1)} / ${pad(project.gallery.length)}` : '01 / 04';
    const changeImage = (direction: -1 | 1) => {
        if (!hasImages) return;
        setActiveIndex(current => (current + direction + project.gallery.length) % project.gallery.length);
    };

    return <div className="case-section case-section--gallery">
        <div className="case-gallery-header">
            <p className="case-eyebrow">Project gallery</p>
            <span className="case-gallery-rule" aria-hidden="true" />
            <span className="case-gallery-counter" aria-live="polite">{counter}</span>
            <button type="button" className="case-gallery-arrow" aria-label="Previous project screenshot" aria-disabled={!hasImages} disabled={!hasImages} onClick={() => changeImage(-1)}><ChevronLeft size={16} aria-hidden="true" /></button>
            <button type="button" className="case-gallery-arrow" aria-label="Next project screenshot" aria-disabled={!hasImages} disabled={!hasImages} onClick={() => changeImage(1)}><ChevronRight size={16} aria-hidden="true" /></button>
        </div>
        <div className="case-gallery-stage">
            <span className="case-gallery-hairline" aria-hidden="true" />
            <span className="case-gallery-plus case-gallery-plus--left" aria-hidden="true">+</span>
            <span className="case-gallery-plus case-gallery-plus--corner" aria-hidden="true">+</span>
            {image ? <img className="case-gallery-image" src={image.src} alt={image.alt} loading="lazy" decoding="async" /> : <div className="case-gallery-empty">
                <span className="case-gallery-image-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><rect x="3.5" y="3.5" width="25" height="25" rx="5" /><circle cx="21.5" cy="11" r="2.5" /><path d="m6.5 23 7-7 4.5 4 3-2.5 5.5 5.5" /></svg></span>
                <span>Project screenshots will be added here.</span>
            </div>}
        </div>
    </div>;
}

export default function ProjectNotesModal({ project, onClose, opener }: { project: Project; onClose: () => void; opener: HTMLElement | null }) {
    const dialogRef = useRef<HTMLDivElement>(null);
    return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
        <DialogContent ref={dialogRef} className="project-dialog" tabIndex={-1} onOpenAutoFocus={event => { event.preventDefault(); dialogRef.current?.focus({ preventScroll: true }); }} onCloseAutoFocus={event => { event.preventDefault(); opener?.focus({ preventScroll: true }); }}>
            <div className="case-scroll">
                <div className="case-grid">
                    <div className="case-column case-column--main">
        <div className="case-notes-header"><p className="case-eyebrow">PROJECT NOTES</p></div>
                        <DialogTitle className="case-title" data-long={project.title.length > 14 || project.slug === 'weatherwizard'}>{project.title}</DialogTitle>
                        <DialogDescription>{project.caseStudy.overview}</DialogDescription>
                        <div className="case-section case-section--goal"><p className="case-eyebrow">The goal</p><h3>{project.caseStudy.goal}</h3></div>
                        <div className="case-section case-section--built"><p className="case-eyebrow">{project.slug === 'la-casa-de-fashion' ? 'What I built' : 'How I directed the build'}</p><ul>{project.caseStudy.built.map(item => <li key={item}>{item}</li>)}</ul></div>
                        {project.caseStudy.implementation && <div className="case-section case-section--optional"><p className="case-eyebrow">Implementation</p><p>{project.caseStudy.implementation}</p></div>}
                        {project.caseStudy.challenges && <div className="case-section case-section--optional"><p className="case-eyebrow">Challenges</p><p>{project.caseStudy.challenges}</p></div>}
                        {project.caseStudy.results && <div className="case-section case-section--optional"><p className="case-eyebrow">Results</p><p>{project.caseStudy.results}</p></div>}
                        <div className="showcase-tags case-tech-chips" role="group" aria-label="Technologies">{project.caseStudy.technologies.map((technology, index) => <TechnologyChip key={technology} name={technology} index={index} />)}</div>
                    </div>
                    <div className="case-column case-column--details">
                        <ProjectGallery key={project.slug} project={project} />
                        <div className="case-actions">
                            <ProjectButtons project={project} onSelect={() => {}} includeExplore={false} modalStyle />
                            {!project.liveUrl && !project.githubUrl && <p className="case-links-unavailable">Live demo and source link are not available yet.</p>}
                            <span className="case-action-mark" aria-hidden="true"><i /></span>
                        </div>
                    </div>
                    <span className="case-divider" aria-hidden="true" />
                </div>
            </div>
        </DialogContent>
    </Dialog>;
}
