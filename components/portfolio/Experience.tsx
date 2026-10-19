'use client';

import { useEffect, useRef } from 'react';
import { experienceItems } from '@/data/content';

const months: Record<string, string> = { Jan: '01', Mar: '03', Jul: '07', Sep: '09', Oct: '10', Nov: '11' };
function DateLabel({ value }: { value: string }) {
    const [month, year] = value.split(' ');
    if (months[month] && year) return <time dateTime={`${year}-${months[month]}`}>{value}</time>;
    return <span style={value === 'Present' ? { color: 'var(--blue)' } : undefined}>{value}</span>;
}

export function Experience() {
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = timelineRef.current;
        if (!timeline) return;

        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        const entries = Array.from(timeline.querySelectorAll<HTMLElement>('.experience-entry'));
        const lines = Array.from(timeline.querySelectorAll<HTMLElement>('.experience-line'));
        const dots = Array.from(timeline.querySelectorAll<HTMLElement>('.experience-dot'));
        const geometry = {
            trackTop: 8,
            trackHeight: 1,
            dotCenters: [] as number[],
            startScroll: 0,
            endScroll: 1,
        };
        let progressFrame = 0;
        let measureFrame = 0;
        let timers: number[] = [];
        let revealObserver: IntersectionObserver | undefined;
        let timelineObserver: IntersectionObserver | undefined;
        let resizeObserver: ResizeObserver | undefined;
        let timelineVisible = false;

        const setFallbackState = () => {
            timeline.classList.remove('experience-ready');
            timeline.style.setProperty('--experience-progress', '1');
            dots.forEach(dot => {
                dot.classList.add('is-active');
                dot.getAnimations().forEach(animation => animation.cancel());
            });
        };

        const updateProgress = () => {
            progressFrame = 0;
            if (!timelineVisible) return;
            const scrollTop = window.scrollY;
            const progress = Math.max(0, Math.min(1, (scrollTop - geometry.startScroll) / Math.max(1, geometry.endScroll - geometry.startScroll)));
            timeline.style.setProperty('--experience-progress', String(progress));
            const filledTo = geometry.trackTop + geometry.trackHeight * progress;
            dots.forEach((dot, index) => {
                const active = (geometry.dotCenters[index] ?? Infinity) <= filledTo;
                const wasActive = dot.classList.contains('is-active');
                dot.classList.toggle('is-active', active);
                if (active && !wasActive) {
                    dot.animate(
                        [{ transform: 'scale(1)' }, { transform: 'scale(1.25)' }, { transform: 'scale(1)' }],
                        { duration: 300, easing: 'cubic-bezier(.22, 1, .36, 1)' },
                    );
                }
            });
        };
        const scheduleUpdate = () => {
            if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
        };

        const measure = () => {
            measureFrame = 0;
            const scrollTop = window.scrollY;
            const viewportHeight = window.innerHeight;
            const timelineRect = timeline.getBoundingClientRect();
            const lineRects = lines.map(line => line.getBoundingClientRect());
            const dotRects = dots.map(dot => dot.getBoundingClientRect());

            const firstLine = lineRects[0];
            const lastLine = lineRects.at(-1);
            const firstDot = dotRects[0];
            const lastDot = dotRects.at(-1);
            if (firstLine && lastLine && firstDot && lastDot) {
                geometry.trackTop = firstLine.top - timelineRect.top;
                const trackBottom = lastLine.bottom - timelineRect.top;
                geometry.trackHeight = Math.max(1, trackBottom - geometry.trackTop);
                geometry.dotCenters = dotRects.map(rect => rect.top - timelineRect.top + rect.height / 2);
                geometry.startScroll = firstDot.top + scrollTop + firstDot.height / 2 - viewportHeight * 0.7;
                geometry.endScroll = lastDot.top + scrollTop + lastDot.height / 2 - viewportHeight * 0.4;
                timeline.style.setProperty('--experience-track-top', geometry.trackTop + 'px');
                timeline.style.setProperty('--experience-track-height', geometry.trackHeight + 'px');
            }
            updateProgress();
        };
        const scheduleMeasure = () => {
            if (!measureFrame) measureFrame = requestAnimationFrame(measure);
        };
        const revealEntry = (entry: HTMLElement) => {
            if (entry.classList.contains('is-visible')) return;
            entry.style.willChange = 'transform, opacity';
            entry.classList.add('is-visible');
            timers.push(window.setTimeout(() => { entry.style.willChange = ''; }, 320));
        };

        const start = () => {
            revealObserver?.disconnect();
            timelineObserver?.disconnect();
            resizeObserver?.disconnect();
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleMeasure);
            timers.forEach(clearTimeout);
            timers = [];
            if (progressFrame) cancelAnimationFrame(progressFrame);
            if (measureFrame) cancelAnimationFrame(measureFrame);
            progressFrame = measureFrame = 0;

            if (reducedMotion.matches || document.documentElement.dataset.motion === 'reduced') {
                setFallbackState();
                return;
            }

            timeline.classList.add('experience-ready');
            revealObserver = new IntersectionObserver(records => records.forEach(record => {
                if (record.isIntersecting) revealEntry(record.target as HTMLElement);
            }), { rootMargin: '0px 0px -30% 0px', threshold: 0 });
            entries.forEach(entry => revealObserver?.observe(entry));

            timelineObserver = new IntersectionObserver(([record]) => {
                timelineVisible = record.isIntersecting;
                if (timelineVisible) {
                    window.addEventListener('scroll', scheduleUpdate, { passive: true });
                    scheduleUpdate();
                } else {
                    window.removeEventListener('scroll', scheduleUpdate);
                    if (progressFrame) cancelAnimationFrame(progressFrame);
                    progressFrame = 0;
                }
            }, { rootMargin: '200px 0px', threshold: 0 });
            timelineObserver.observe(timeline);

            resizeObserver = new ResizeObserver(scheduleMeasure);
            resizeObserver.observe(timeline);
            entries.forEach(entry => resizeObserver?.observe(entry));
            window.addEventListener('resize', scheduleMeasure, { passive: true });
            measure();
        };

        const syncMotionPreference = () => start();
        reducedMotion.addEventListener('change', syncMotionPreference);
        window.addEventListener('portfolio-motion', syncMotionPreference);
        start();

        return () => {
            revealObserver?.disconnect();
            timelineObserver?.disconnect();
            resizeObserver?.disconnect();
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleMeasure);
            reducedMotion.removeEventListener('change', syncMotionPreference);
            window.removeEventListener('portfolio-motion', syncMotionPreference);
            timers.forEach(clearTimeout);
            if (progressFrame) cancelAnimationFrame(progressFrame);
            if (measureFrame) cancelAnimationFrame(measureFrame);
        };
    }, []);

    return <section id="experience" className="section wrap experience-grid">
        <style>{`
            #experience .experience-timeline { position: relative; max-width: 1000px; margin: 0 auto; padding: 0 24px; text-align: left; }
            #experience .experience-progress-fill { position: absolute; z-index: 1; left: 24px; top: var(--experience-track-top, 8px); right: auto; bottom: 0; width: 1px; height: var(--experience-track-height, auto); background: var(--blue); transform: scaleY(var(--experience-progress, 1)); transform-origin: top; pointer-events: none; }
            #experience .experience-list { list-style: none; margin: 0; padding: 0; }
            #experience .experience-entry { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-areas: "label ." "title title" "company ." "description ."; column-gap: 36px; row-gap: 8px; padding: 0 0 48px 28px; min-width: 0; }
            #experience .experience-ready .experience-entry { opacity: 1; transform: translateY(0); transition: opacity 300ms cubic-bezier(.22, 1, .36, 1), transform 300ms cubic-bezier(.22, 1, .36, 1); }
            #experience .experience-ready .experience-entry:not(.is-visible) { opacity: 0; transform: translateY(20px); }
            #experience .experience-entry + .experience-entry { padding-top: 28px; }
            #experience .experience-entry:last-child { padding-bottom: 0; }
            #experience .experience-entry > * { margin: 0; }
            #experience .experience-label { grid-area: label; font: 12px/1.6 monospace; letter-spacing: 1.8px; text-transform: uppercase; color: var(--blue); }
            #experience .experience-title-row { grid-area: title; display: flex; align-items: center; min-width: 0; }
            #experience .experience-title-row > * { margin: 0; }
            #experience .experience-leader { flex: 1; margin: 0 12px; border-bottom: 1px solid color-mix(in srgb, var(--muted) 25%, var(--line)); }
            #experience .experience-title { font-weight: 500; font-size: clamp(23px, 2.5vw, 27px); line-height: 1.2; color: var(--foreground); overflow-wrap: anywhere; }
            #experience .experience-company { grid-area: company; font-size: 14px; font-weight: 700; line-height: 1.6; color: var(--muted); }
            #experience .experience-description { grid-area: description; max-width: 65ch; font-size: 15px; line-height: 1.8; color: var(--muted); }
            #experience .experience-dates { flex-shrink: 0; text-align: right; font: 13px/1.6 monospace; letter-spacing: 1.8px; color: color-mix(in srgb, var(--muted) 80%, var(--foreground)); white-space: nowrap; }
            #experience .experience-line { position: absolute; left: 0; top: 8px; bottom: -8px; width: 1px; background: var(--line); }
            #experience .experience-entry:last-child .experience-line { bottom: 0; }
            #experience .experience-dot { position: absolute; z-index: 2; left: -4px; top: 6px; width: 9px; height: 9px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 0 6px var(--background); }
            #experience .experience-ready .experience-dot:not(.is-active) { background: color-mix(in srgb, var(--blue) 32%, var(--line)); }
            #experience .experience-entry + .experience-entry .experience-dot { top: 34px; }
            #experience .experience-divider { position: absolute; left: 28px; right: 0; bottom: 0; height: 1px; background: var(--line); opacity: .65; }
            @media (max-width: 699px) {
                #experience .experience-entry { grid-template-columns: minmax(0, 1fr); grid-template-areas: "label" "title" "company" "description"; }
                #experience .experience-title-row { flex-direction: column; align-items: flex-start; gap: 8px; }
                #experience .experience-leader { display: none; }
                #experience .experience-dates { text-align: left; white-space: normal; }
            }
            @media (prefers-reduced-motion: reduce) {
                #experience .experience-ready .experience-entry,
                #experience .experience-ready .experience-entry:not(.is-visible) { opacity: 1; transform: none; transition: none; }
                #experience .experience-ready .experience-dot { background: var(--blue); }
                #experience .experience-ready .experience-progress-fill { transform: scaleY(1); }
            }
            html[data-motion="reduced"] #experience .experience-ready .experience-entry,
            html[data-motion="reduced"] #experience .experience-ready .experience-entry:not(.is-visible) { opacity: 1; transform: none; transition: none; }
            html[data-motion="reduced"] #experience .experience-ready .experience-dot { background: var(--blue); }
            html[data-motion="reduced"] #experience .experience-ready .experience-progress-fill { transform: scaleY(1); }
        `}</style>
        <div className="section-heading reveal"><div><p className="eyebrow">/03</p><h2>Experience</h2></div></div>
        <div className="experience-timeline" ref={timelineRef}>
            <span className="experience-progress-fill" aria-hidden="true" />
            <ol className="experience-list">
                {experienceItems.map((item, index) => {
                    const metaParts = item.meta.split(' · ');
                    const company = metaParts.length > 1 ? metaParts[0] : '';
                    const dates = metaParts[metaParts.length - 1].split(' – ');
                    return <li key={item.title} className="experience-entry">
                        <span className="experience-line" aria-hidden="true" />
                        <span className="experience-dot" aria-hidden="true" />
                        <p className="experience-label">{item.label}</p>
                        <div className="experience-title-row">
                        <h3 className="experience-title">{item.title}</h3>
                        <span className="experience-leader" aria-hidden="true" />
                        <p className="experience-dates"><DateLabel value={dates[0]} />{dates[1] && <> – <DateLabel value={dates[1]} /></>}</p>
                        </div>
                        {company && <p className="experience-company">{company}</p>}
                        <p className="experience-description">{item.description}</p>
                        {index < experienceItems.length - 1 && <span className="experience-divider" aria-hidden="true" />}
                    </li>;
                })}
            </ol>
        </div>
    </section>;
}


