'use client';

import { useEffect, useSyncExternalStore } from 'react';

const subscribe = (callback: () => void) => {
    window.addEventListener('portfolio-motion', callback);
    return () => window.removeEventListener('portfolio-motion', callback);
};

const getSnapshot = () => document.documentElement.dataset.motion === 'reduced';
const getServerSnapshot = () => false;

export function MotionToggle() {
    const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        const documentMotion = document.documentElement.dataset.motion;
        if (documentMotion) return;

        let saved = false;
        try {
            saved = localStorage.getItem('portfolio-motion') === 'reduced';
        } catch { /* Storage can be unavailable in private browsing. */ }

        const value = saved || matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.documentElement.dataset.motion = value ? 'reduced' : 'full';
        window.dispatchEvent(new Event('portfolio-motion'));
    }, []);

    const toggle = () => {
        const value = !reduced;
        document.documentElement.dataset.motion = value ? 'reduced' : 'full';
        try {
            localStorage.setItem('portfolio-motion', value ? 'reduced' : 'full');
        } catch { /* The current page still respects the selected mode. */ }
        window.dispatchEvent(new Event('portfolio-motion'));
    };

    return <button className="motion-toggle" aria-pressed={reduced} onClick={toggle}>
        {reduced ? 'Reduced motion on' : 'Reduce motion'}
    </button>;
}
