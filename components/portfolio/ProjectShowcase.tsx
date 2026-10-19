'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type ProjectShowcaseProps = {
    screenshot?: string | null;
    screenshotDimensions?: { width: number; height: number };
    video?: string | null;
    videoDuration?: number;
    title: string;
    projectUrl?: string | null;
    mobileScreenshot?: string | null;
    mobileVideo?: string | null;
    projectIndex: number;
    fallback: ReactNode;
};

/** A locally scrollable full-page project preview inside the fixed browser frame. */
export function ProjectShowcase({
    screenshot,
    screenshotDimensions,
    video,
    title,
    projectUrl,
    mobileScreenshot,
    mobileVideo,
    projectIndex,
    fallback,
}: ProjectShowcaseProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [nearViewport, setNearViewport] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);
    const mobileMedia = isMobile && Boolean(mobileVideo || mobileScreenshot);
    const activeVideo = !videoFailed && (mobileMedia ? mobileVideo || null : video);
    const activeScreenshot = mobileMedia ? mobileScreenshot || screenshot : screenshot;

    useEffect(() => {
        const query = window.matchMedia('(max-width: 767px)');
        const update = () => setIsMobile(query.matches);
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    }, []);

    useEffect(() => {
        const element = viewportRef.current;
        if (!element || !('IntersectionObserver' in window)) {
            setNearViewport(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), { rootMargin: '500px 0px' });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return <div
        ref={viewportRef}
        className="project-showcase-viewport"
        data-project-index={projectIndex}
        role="group"
        aria-label={projectUrl ? `${title} website preview` : `${title} project preview`}
    >
        {activeVideo ? <div className="project-showcase-media project-showcase-media--video">
            <video
                key={activeVideo}
                ref={videoRef}
                className="project-showcase-video"
                muted
                playsInline
                preload={nearViewport ? 'metadata' : 'none'}
                poster={activeScreenshot || undefined}
                onError={() => setVideoFailed(true)}
                aria-label={`${title} website recording`}
            >
                <source src={activeVideo} />
            </video>
        </div> : activeScreenshot ? <div className="project-showcase-media">
            <img src={activeScreenshot} alt={`${title} full-page website preview`} width={screenshotDimensions?.width} height={screenshotDimensions?.height} loading="lazy" decoding="async" />
        </div> : <div className="project-showcase-fallback">{fallback}</div>}
    </div>;
}
