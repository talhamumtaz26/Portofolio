'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [show, setShow] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [mobileCanShow, setMobileCanShow] = useState(false);
    const [textOverlap, setTextOverlap] = useState(false);

    useEffect(() => {
        const media = matchMedia('(max-width: 899px)');
        const sync = () => setMobile(media.matches);
        sync();
        media.addEventListener('change', sync);
        return () => media.removeEventListener('change', sync);
    }, []);

    useEffect(() => {
        if (!mobile) {
            const hero = document.querySelector('.hero-section');
            if (!hero) return;
            const observer = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0 });
            observer.observe(hero);
            return () => observer.disconnect();
        }

        let previousY = window.scrollY;
        let viewportHeight = window.innerHeight;
        let frame = 0;
        let overlapping = new Set<Element>();
        const updateVisibility = () => {
            frame = 0;
            const scrollY = window.scrollY;
            const pastThreshold = scrollY > viewportHeight * 1.5;
            setMobileCanShow(pastThreshold && scrollY < previousY);
            previousY = scrollY;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(updateVisibility);
        };

        const setupTextOverlapObserver = () => {
            const size = 44;
            const right = 16;
            const bottom = 16;
            const margin = `${-(window.innerHeight - bottom - size)}px ${-right}px ${-bottom}px ${-(window.innerWidth - right - size)}px`;
            const observer = new IntersectionObserver(records => {
                records.forEach(record => {
                    if (record.isIntersecting) overlapping.add(record.target);
                    else overlapping.delete(record.target);
                });
                setTextOverlap(overlapping.size > 0);
            }, { rootMargin: margin, threshold: 0 });
            document.querySelectorAll<HTMLElement>('p,h1,h2,h3,h4,li,a,button,span,label,small,time,strong').forEach(element => {
                if (element.classList.contains('back-to-top-float') || !element.textContent?.trim() || element.closest('[aria-hidden="true"]')) return;
                observer.observe(element);
            });
            return observer;
        };

        let overlapObserver = setupTextOverlapObserver();
        const onResize = () => {
            viewportHeight = window.innerHeight;
            overlapObserver.disconnect();
            overlapping = new Set<Element>();
            overlapObserver = setupTextOverlapObserver();
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (frame) cancelAnimationFrame(frame);
            overlapObserver.disconnect();
        };
    }, [mobile]);

    const hidden = mobile ? !mobileCanShow || textOverlap : !show;
    return <a className="back-to-top-float" href="#" aria-label="Back to top" aria-hidden={hidden} tabIndex={hidden ? -1 : 0}>
        <ArrowUp size={18} strokeWidth={1.8} aria-hidden="true" />
    </a>;
}
