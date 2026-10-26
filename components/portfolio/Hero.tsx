'use client';

import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';

type HeroTileData = { name: string; logo: string; order: number; soft?: boolean };

const leftTiles: HeroTileData[] = [
    { name: 'PHP', logo: 'php', order: 0 },
    { name: 'WordPress', logo: 'wordpress', order: 1 },
    { name: 'TypeScript', logo: 'typescript', order: 2, soft: true },
    { name: 'Shopify', logo: 'shopify', order: 3 },
    { name: 'React', logo: 'react', order: 4 },
    { name: 'JavaScript', logo: 'javascript', order: 5 },
];

const rightTiles: HeroTileData[] = [
    { name: 'Python', logo: 'python', order: 6 },
    { name: 'WooCommerce', logo: 'woocommerce', order: 7 },
    { name: 'Figma', logo: 'figma', order: 8 },
    { name: 'GitHub', logo: 'github', order: 9 },
    { name: 'Firebase', logo: 'firebase', order: 10 },
];

function HeroTileFace({ logo, loading = 'lazy' }: { logo: string; loading?: 'eager' | 'lazy' }) {
    return <span className="hero-tile-face"><img src={`/logos/${logo}.svg`} alt="" width="48" height="48" loading={loading} draggable={false} /></span>;
}
function FloatingTiles({ side, tiles }: { side: 'left' | 'right'; tiles: HeroTileData[] }) {
    return <div className={`hero-tile-zone hero-tile-zone--${side}`}>
        {tiles.map(tile => <div
            className={`hero-tile-position hero-tile--${tile.name.toLowerCase()}${tile.soft ? ' hero-tile-position--soft' : ''}`}
            style={{ '--tile-order': tile.order } as React.CSSProperties}
            key={tile.name}
            aria-hidden="true"
            data-side={side}
            draggable={false}
        >
            <div className="hero-tile-float">
                <div className="hero-tile-load">
                    <span className="hero-tile-side" />
                    <HeroTileFace logo={tile.logo} />
                </div>
            </div>
        </div>)}
    </div>;
}

const mobileTiles: (HeroTileData & { x: number; y: number; size: number; jitter: number })[] = [
    { name: 'WooCommerce', logo: 'woocommerce', order: 0, x: 0.365, y: -0.931, size: 46, jitter: 4 },
    { name: 'Python', logo: 'python', order: 1, x: 0.901, y: -0.434, size: 46, jitter: -3 },
    { name: 'Figma', logo: 'figma', order: 2, x: 0.5, y: 0.866, size: 46, jitter: 2 },
    { name: 'Shopify', logo: 'shopify', order: 3, x: 0.954, y: 0.292, size: 46, jitter: -4 },
    { name: 'GitHub', logo: 'github', order: 4, x: -0.5, y: 0.866, size: 42, jitter: 1 },
    { name: 'React', logo: 'react', order: 5, x: -0.954, y: 0.292, size: 42, jitter: 3 },
    { name: 'JavaScript', logo: 'javascript', order: 6, x: -0.901, y: -0.434, size: 42, jitter: -2 },
    { name: 'WordPress', logo: 'wordpress', order: 7, x: -0.365, y: -0.931, size: 46, jitter: 0 },
];

function MobileShowcase() {
    return <div className="hero-mobile-layout">
        <div className="hero-dark-vignette hero-dark-vignette--mobile" aria-hidden="true" />
        <div className="hero-mobile-stage">
            <div className="hero-mobile-rings" aria-hidden="true">
                <span className="hero-mobile-ring" />
                <span className="hero-mobile-ring hero-mobile-ring--dashed" />
            </div>
            <div className="hero-mobile-tiles" aria-hidden="true">
                {mobileTiles.map(tile => <div
                    className={`hero-mobile-tile hero-tile--${tile.name.toLowerCase()}`}
                    key={tile.name}
                    data-x={tile.x}
                    data-y={tile.y}
                    style={{
                        '--tile-order': tile.order,
                        '--tile-size': `${tile.size}px`,
                        '--tile-jitter': `${tile.jitter}deg`,
                        '--cx': tile.x,
                        '--sy': tile.y,
                    } as React.CSSProperties}
                >
                    <div className="hero-tile-load">
                        <HeroTileFace logo={tile.logo} />
                    </div>
                </div>)}
                <span className="hero-mobile-dot" data-x="0" data-y="-1" />
                <span className="hero-mobile-dot" data-x="0.682" data-y="-0.731" />
                <span className="hero-mobile-dot" data-x="0.998" data-y="-0.075" />
                <span className="hero-mobile-dot" data-x="0" data-y="1" />
                <span className="hero-mobile-dot" data-x="-0.777" data-y="0.629" />
                <span className="hero-mobile-dot" data-x="-0.998" data-y="0.075" />
                <span className="hero-mobile-dot" data-x="-0.682" data-y="-0.731" />
                <span className="hero-mobile-sphere hero-mobile-sphere--right" data-x="0.96" data-y="0.72" />
                <span className="hero-mobile-sphere hero-mobile-sphere--upper-left" data-x="-0.96" data-y="-0.72" />
                <span className="hero-mobile-cube hero-mobile-cube--top" />
                <span className="hero-mobile-cube hero-mobile-cube--top-right" />
                <span className="hero-mobile-cube hero-mobile-cube--bottom" />
                <span className="hero-mobile-cube hero-mobile-cube--bottom-left" />
            </div>
            <div className="hero-mobile-copy">
                <h1 id="hero-name" className="hero-name"><span className="hero-name-first">TALHA</span><span className="hero-name-second">MUMTAZ<span className="hero-name-dot">.</span></span></h1>
                <h2 className="hero-title">{profile.headline}</h2>
                <p className="hero-specialties">{profile.specialties}</p>
            </div>
        </div>
        <div className="hero-mobile-actions">
            <a className="hero-mobile-action hero-mobile-action--primary" href="#work">View my work <span aria-hidden="true">↓</span></a>
            <a className="hero-mobile-action hero-mobile-action--secondary" href="#contact">Let&apos;s work together <span aria-hidden="true">↗</span></a>
        </div>
        <a className="hero-scroll hero-mobile-scroll" href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        <div className="hero-mobile-bottom-decoration" aria-hidden="true">
            <svg viewBox="0 0 600 140" preserveAspectRatio="none" focusable="false">
                <path d="M-20 18 C105 5 160 80 300 40 S485 10 620 56" />
                <path d="M-20 66 C105 108 170 150 315 94 S500 48 620 110" />
            </svg>
        </div>
    </div>;
}
export function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const loadStarted = useRef(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mobileQuery = window.matchMedia('(max-width: 899px)');
        const updateViewport = () => setIsMobile(mobileQuery.matches);
        updateViewport();
        mobileQuery.addEventListener('change', updateViewport);
        return () => {
            mobileQuery.removeEventListener('change', updateViewport);
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(([entry]) => {
            const visible = entry.intersectionRatio >= 0.05;
            section.dataset.offscreen = String(!visible);
            window.dispatchEvent(new CustomEvent('hero-visibility', { detail: visible }));
        }, { threshold: [0, 0.05] });
        observer.observe(section);
        return () => {
            observer.disconnect();
            delete section.dataset.offscreen;
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const stage = section?.querySelector<HTMLElement>('.hero-mobile-stage');
        if (!stage || !isMobile) return;

        const circle = stage.querySelector<HTMLElement>('.hero-mobile-ring');
        const positionedItems = Array.from(stage.querySelectorAll<HTMLElement>('[data-x][data-y]'));
        const syncCirclePositions = () => {
            const { width, height } = stage.getBoundingClientRect();
            const radius = (circle?.getBoundingClientRect().width ?? 0) / 2;
            positionedItems.forEach(item => {
                const x = Number(item.dataset.x) || 0;
                const y = Number(item.dataset.y) || 0;
                item.style.setProperty('--tile-center-x', `${width / 2 + radius * x}px`);
                item.style.setProperty('--tile-center-y', `${height / 2 + radius * y}px`);
            });
        };
        const observer = new ResizeObserver(syncCirclePositions);
        observer.observe(stage);
        if (circle) observer.observe(circle);
        syncCirclePositions();
        return () => observer.disconnect();
    }, [isMobile]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        if (!loadStarted.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            section.classList.add('hero-load-in');
            loadStarted.current = true;
        }
        const timeout = window.setTimeout(() => section.classList.remove('hero-load-in'), 1250);
        return () => window.clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section || window.matchMedia('(max-width: 899px)').matches) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const desktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
        if (!desktopPointer.matches || reducedMotion.matches) return;

        const tiles = Array.from(section.querySelectorAll<HTMLElement>('.hero-tile-position'));
        const name = section.querySelector<HTMLElement>('.hero-name');
        const baseOpacities = new Map(tiles.map(tile => [tile, Number.parseFloat(getComputedStyle(tile).opacity) || 1]));
        let scrollFrame = 0;
        let sectionTop = 0;
        let sectionHeight = 1;
        let active = false;
        const measureSection = () => {
            const bounds = section.getBoundingClientRect();
            sectionTop = bounds.top + window.scrollY;
            sectionHeight = Math.max(1, bounds.height);
            onScroll();
        };
        const updateScroll = () => {
            scrollFrame = 0;
            if (!active || section.dataset.offscreen === 'true' || document.visibilityState === 'hidden') return;
            const progress = Math.min(1, Math.max(0, (window.scrollY - sectionTop) / Math.max(1, sectionHeight * 0.6)));
            if (name) {
                name.style.scale = String(1 - progress * 0.06);
                name.style.opacity = String(1 - progress * 0.6);
            }
            tiles.forEach(tile => {
                const side = tile.dataset.side === 'left' ? -1 : 1;
                tile.style.setProperty('--scroll-x', `${side * 24 * progress}px`);
                tile.style.opacity = String((baseOpacities.get(tile) ?? 1) * (1 - progress * 0.18));
            });
        };
        const onScroll = () => {
            if (!active || section.dataset.offscreen === 'true') return;
            if (scrollFrame) return;
            scrollFrame = window.requestAnimationFrame(updateScroll);
        };
        const onVisibility = (event: Event) => {
            const isVisible = (event as CustomEvent<boolean>).detail;
            if (isVisible === active) return;
            active = isVisible;
            if (active) {
                window.addEventListener('scroll', onScroll, { passive: true });
                measureSection();
            } else {
                window.removeEventListener('scroll', onScroll);
                if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
                scrollFrame = 0;
            }
        };
        window.addEventListener('hero-visibility', onVisibility);
        const observer = new ResizeObserver(measureSection);
        observer.observe(section);
        window.addEventListener('resize', measureSection, { passive: true });
        measureSection();
        return () => {
            if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', measureSection);
            observer.disconnect();
            window.removeEventListener('hero-visibility', onVisibility);
            if (name) {
                name.style.scale = '';
                name.style.opacity = '';
            }
            tiles.forEach(tile => {
                tile.style.removeProperty('--scroll-x');
                tile.style.opacity = '';
            });
        };
    }, [isMobile]);

    return <section ref={sectionRef} className="hero hero-section wrap" aria-label="Talha Mumtaz">
        <div className="hero-decoration" aria-hidden="true">
            <span className="hero-orbit hero-orbit--outer" />
            <span className="hero-orbit hero-orbit--inner" />
        </div>
        <div className="hero-dark-vignette" aria-hidden="true" />
        <div className="hero-desktop-layer" aria-hidden="true">
            <span className="hero-orbit hero-orbit--dashed" />
            <div className="hero-orbit-points">
                <i /><i /><i /><i /><i /><i /><i /><i />
            </div>
            <div className="hero-ghost hero-ghost--one" />
            <div className="hero-ghost hero-ghost--two" />
            <div className="hero-ghost hero-ghost--three" />
            <div className="hero-ghost hero-ghost--four" />
            <div className="hero-ghost hero-ghost--five" />
            <div className="hero-ghost hero-ghost--six" />
            <span className="hero-sphere hero-sphere--one" />
            <span className="hero-sphere hero-sphere--two" />
            <span className="hero-sphere hero-sphere--three" />
            <FloatingTiles side="left" tiles={leftTiles} />
            <FloatingTiles side="right" tiles={rightTiles} />
        </div>
        <div className="hero-center">
            <h1 id="hero-name-desktop" className="hero-name"><span className="hero-name-first">TALHA</span><span className="hero-name-second">MUMTAZ<span className="hero-name-dot">.</span></span></h1>
            <h2 className="hero-title">{profile.headline}</h2>
            <p className="hero-specialties">{profile.specialties}</p>
        </div>
        <div className="hero-bottom">
            <a className="hero-scroll" href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
        <MobileShowcase />
    </section>;
}
