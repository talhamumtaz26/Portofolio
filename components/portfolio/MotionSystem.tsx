'use client';

import { useEffect, useRef } from 'react';

export function MotionSystem() {
    const ring = useRef<HTMLDivElement>(null);
    const dot = useRef<HTMLDivElement>(null);
    const progress = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const reduced = matchMedia('(prefers-reduced-motion: reduce)');
        const fine = matchMedia('(pointer:fine) and (min-width:761px)');
        let revealObserver: IntersectionObserver | undefined;
        let sizeObserver: ResizeObserver | undefined;
        let progressFrame = 0;
        let cursorFrame = 0;
        let maxScroll = 0;
        let x = -100;
        let y = -100;
        let targetX = -100;
        let targetY = -100;
        let ringX = -100;
        let ringY = -100;
        let label = '';
        let appliedLabel = '';
        let pointerActive = false;
        let tabVisible = document.visibilityState !== 'hidden';

        const updateProgress = () => {
            progressFrame = 0;
            const value = maxScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / maxScroll)) : 0;
            if (progress.current) progress.current.style.transform = 'scaleX(' + value + ')';
        };
        const scheduleProgress = () => {
            if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
        };
        const measureProgressRange = () => {
            maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            scheduleProgress();
        };

        measureProgressRange();
        window.addEventListener('scroll', scheduleProgress, { passive: true });
        window.addEventListener('resize', measureProgressRange, { passive: true });
        if ('ResizeObserver' in window) {
            sizeObserver = new ResizeObserver(measureProgressRange);
            sizeObserver.observe(document.documentElement);
        }

        if (!reduced.matches && 'IntersectionObserver' in window) {
            revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in-view');
                revealObserver?.unobserve(entry.target);
            }), { threshold: 0.08 });
            document.querySelectorAll('.reveal').forEach(element => revealObserver?.observe(element));
        }

        const drawCursor = () => {
            cursorFrame = 0;
            if (!tabVisible) return;
            ringX += (targetX - ringX) * 0.18;
            ringY += (targetY - ringY) * 0.18;
            if (dot.current) dot.current.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
            if (ring.current) ring.current.style.transform = 'translate3d(' + ringX + 'px,' + ringY + 'px,0)';
            if (ring.current && appliedLabel !== label) {
                appliedLabel = label;
                ring.current.dataset.hover = label ? 'true' : 'false';
                ring.current.textContent = label;
            }
            if (ring.current) ring.current.dataset.active = pointerActive ? 'true' : 'false';
            if (Math.abs(targetX - ringX) > 0.05 || Math.abs(targetY - ringY) > 0.05) {
                ring.current?.classList.add('is-moving');
                dot.current?.classList.add('is-moving');
                cursorFrame = requestAnimationFrame(drawCursor);
            } else {
                ringX = targetX;
                ringY = targetY;
                ring.current?.classList.remove('is-moving');
                dot.current?.classList.remove('is-moving');
            }
        };
        const scheduleCursor = () => {
            if (!cursorFrame && tabVisible && fine.matches && !reduced.matches && document.documentElement.dataset.motion !== 'reduced') {
                cursorFrame = requestAnimationFrame(drawCursor);
            }
        };
        const move = (event: PointerEvent) => {
            x = targetX = event.clientX;
            y = targetY = event.clientY;
            label = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '' : '';
            pointerActive = true;
            scheduleCursor();
        };
        const leave = () => {
            targetX = targetY = -100;
            x = y = -100;
            label = '';
            pointerActive = false;
            scheduleCursor();
        };
        const attachPointer = () => {
            if (fine.matches && !reduced.matches && tabVisible && document.documentElement.dataset.motion !== 'reduced') {
                window.addEventListener('pointermove', move, { passive: true });
                document.addEventListener('pointerleave', leave);
            } else {
                window.removeEventListener('pointermove', move);
                document.removeEventListener('pointerleave', leave);
                pointerActive = false;
            }
        };
        const syncCursor = () => {
            attachPointer();
            cancelAnimationFrame(cursorFrame);
            cursorFrame = 0;
            if (fine.matches && !reduced.matches && document.documentElement.dataset.motion !== 'reduced') scheduleCursor();
            else if (ring.current) ring.current.dataset.active = 'false';
        };
        const onVisibilityChange = () => {
            tabVisible = document.visibilityState !== 'hidden';
            if (tabVisible) delete document.documentElement.dataset.tabHidden;
            else {
                document.documentElement.dataset.tabHidden = 'true';
                cancelAnimationFrame(cursorFrame);
                cursorFrame = 0;
                ring.current?.classList.remove('is-moving');
                dot.current?.classList.remove('is-moving');
            }
            syncCursor();
        };
        attachPointer();
        window.addEventListener('portfolio-motion', syncCursor);
        reduced.addEventListener('change', syncCursor);
        fine.addEventListener('change', syncCursor);
        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.removeEventListener('portfolio-motion', syncCursor);
            reduced.removeEventListener('change', syncCursor);
            fine.removeEventListener('change', syncCursor);
            document.removeEventListener('visibilitychange', onVisibilityChange);
            delete document.documentElement.dataset.tabHidden;
            window.removeEventListener('pointermove', move);
            document.removeEventListener('pointerleave', leave);
            window.removeEventListener('scroll', scheduleProgress);
            window.removeEventListener('resize', measureProgressRange);
            revealObserver?.disconnect();
            sizeObserver?.disconnect();
            cancelAnimationFrame(progressFrame);
            cancelAnimationFrame(cursorFrame);
        };
    }, []);

    return <><div className="scroll-progress" ref={progress} aria-hidden="true" /><div className="cursor-ring" ref={ring} aria-hidden="true" /><div className="cursor-dot" ref={dot} aria-hidden="true" /></>;
}
