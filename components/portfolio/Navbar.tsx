'use client';
import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { ThemeToggle } from './ThemeToggle';
import { Menu, ArrowUpRight } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { navigation } from '@/data/profile';
import { scrollToSection } from '@/lib/scroll-to-section';
export function Navbar() {
    const [light, setLight] = useState(false);
    const themeTransition = useRef(false);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        const frame = window.requestAnimationFrame(() => setLight(document.documentElement.dataset.theme === 'light'));
        return () => {
            window.cancelAnimationFrame(frame);
        };
    }, []);
    useEffect(() => {
        const button = ctaRef.current;
        if (!button || !window.matchMedia('(hover: hover) and (pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let frame = 0;
        let x = 0;
        let y = 0;
        let targetX = 0;
        let targetY = 0;
        let bounds = button.getBoundingClientRect();
        let tracking = false;
        const measure = () => {
            const bounds = button.getBoundingClientRect();
            return bounds;
        };
        const observer = new ResizeObserver(() => { bounds = measure(); });
        observer.observe(button);
        const refreshBounds = () => { bounds = measure(); };
        window.addEventListener('resize', refreshBounds, { passive: true });
        const animate = () => {
            frame = 0;
            x += (targetX - x) * 0.2;
            y += (targetY - y) * 0.2;
            if (Math.abs(targetX - x) < 0.04 && Math.abs(targetY - y) < 0.04) {
                x = targetX;
                y = targetY;
                button.style.translate = x || y ? `${x}px ${y}px` : '';
                return;
            }
            button.style.translate = `${x}px ${y}px`;
            frame = window.requestAnimationFrame(animate);
        };
        const schedule = () => { if (!frame) frame = window.requestAnimationFrame(animate); };
        const onPointerMove = (event: PointerEvent) => {
            const dx = event.clientX - (bounds.left + bounds.width / 2);
            const dy = event.clientY - (bounds.top + bounds.height / 2);
            const distance = Math.hypot(dx, dy);
            const strength = distance < 80 ? Math.min(6, (80 - distance) * 0.075) : 0;
            targetX = distance ? dx / distance * strength : 0;
            targetY = distance ? dy / distance * strength : 0;
            schedule();
        };
        const onPointerEnter = () => {
            bounds = measure();
            if (tracking) return;
            tracking = true;
            button.addEventListener('pointermove', onPointerMove, { passive: true });
        };
        const onPointerLeave = () => {
            tracking = false;
            button.removeEventListener('pointermove', onPointerMove);
            targetX = 0;
            targetY = 0;
            schedule();
        };

        button.addEventListener('pointerenter', onPointerEnter, { passive: true });
        button.addEventListener('pointerleave', onPointerLeave, { passive: true });
        return () => {
            if (frame) window.cancelAnimationFrame(frame);
            button.removeEventListener('pointerenter', onPointerEnter);
            button.removeEventListener('pointerleave', onPointerLeave);
            button.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('resize', refreshBounds);
            observer.disconnect();
            button.style.translate = '';
        };
    }, []);
    const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
        if (themeTransition.current) return;
        const toggleButton = event.currentTarget;
        const next = !light;
        const root = document.documentElement;
        const apply = () => {
            root.dataset.theme = next ? 'light' : 'dark';
            flushSync(() => setLight(next));
            try { localStorage.setItem('portfolio-theme', next ? 'light' : 'dark'); } catch {}
            document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', getComputedStyle(root).getPropertyValue('--background').trim());
        };
        const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches || root.dataset.motion === 'reduced';
        const startTransition = (document as Document & { startViewTransition?: (update: () => void) => { ready: Promise<void>; finished: Promise<void> } }).startViewTransition;
        if (!startTransition || reduceMotion) {
            apply();
            return;
        }

        themeTransition.current = true;
        root.classList.add('theme-switching');
        let transition: ReturnType<NonNullable<typeof startTransition>>;
        try {
            transition = startTransition.call(document, apply);
        } catch {
            root.classList.remove('theme-switching');
            themeTransition.current = false;
            apply();
            return;
        }
        void transition.ready.then(() => {
            const desktop = matchMedia('(pointer: fine) and (min-width: 900px)').matches;
            if (!desktop) return;
            const bounds = toggleButton.getBoundingClientRect();
            const x = bounds.left + bounds.width / 2;
            const y = bounds.top + bounds.height / 2;
            const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
            root.animate(
                [{ clipPath: `circle(0px at ${x}px ${y}px)` }, { clipPath: `circle(${radius}px at ${x}px ${y}px)` }],
                { duration: 520, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)', pseudoElement: '::view-transition-new(root)' } as KeyframeAnimationOptions & { pseudoElement: string },
            );
        }).catch(() => {});
        const finish = () => {
            root.classList.remove('theme-switching');
            themeTransition.current = false;
        };
        void transition.finished.then(finish, finish);
    };
    const [open, setOpen] = useState(false);
    const target = useRef<string | null>(null);
    const navigateTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
        if (!window.matchMedia('(max-width: 899px)').matches) return;
        event.preventDefault();
        scrollToSection(id);
    };

    return <header className="header">
        <div className="nav wrap">
            <a className="brand" href="#" aria-label="Talha Mumtaz home">Talha<span>●</span></a>
            <nav className="desktop-nav" aria-label="Main navigation">
                {navigation.map(x => {
                    const id = x === 'Projects' ? 'work' : x.toLowerCase();
                    return <a key={x} href={'#' + id} onClick={event => navigateTo(event, id)}>{x}</a>;
                })}
            </nav>
            <div className="nav-actions">
                <div className="desktop-theme"><ThemeToggle light={light} onToggle={toggleTheme} /></div>
                <a ref={ctaRef} className="nav-cta resume-download" href="#contact" onClick={event => navigateTo(event, 'contact')}>
                    Let&apos;s work together <ArrowUpRight size={17} aria-hidden="true" />
                </a>
            </div>
            <div className="mobile-nav">
                <div className="mobile-theme"><ThemeToggle light={light} onToggle={toggleTheme} /></div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild><button className="menu-button" aria-label="Open navigation"><Menu /></button></SheetTrigger>
                    <SheetContent
                        className="mobile-sheet"
                        tabIndex={-1}
                        onOpenAutoFocus={event => {
                            event.preventDefault();
                            (event.currentTarget as HTMLElement).focus({ preventScroll: true, focusVisible: false } as FocusOptions & { focusVisible: boolean });
                        }}
                        onCloseAutoFocus={event => {
                            if (!target.current) return;
                            event.preventDefault();
                            const id = target.current;
                            target.current = null;
                            const section = document.getElementById(id);
                            if (section) {
                                section.tabIndex = -1;
                                section.focus({ preventScroll: true, focusVisible: false } as FocusOptions & { focusVisible: boolean });
                                scrollToSection(id);
                            }
                        }}
                    >
                        <SheetTitle>Explore</SheetTitle>
                        <SheetDescription>Talha Mumtaz / Developer</SheetDescription>
                        <nav aria-label="Mobile navigation">
                            {navigation.map((x, i) => {
                                const id = x === 'Projects' ? 'work' : x.toLowerCase();
                                return <a key={x} href={'#' + id} onClick={event => {
                                    event.preventDefault();
                                    target.current = id;
                                    setOpen(false);
                                }}><small>0{i + 1}</small><span>{x}</span></a>;
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>;
}



