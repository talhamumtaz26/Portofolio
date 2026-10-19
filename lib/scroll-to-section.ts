export function scrollToSection(id: string) {
    const section = document.getElementById(id);
    if (!section) return;

    const header = document.querySelector<HTMLElement>('.header');
    const headerHeight = header?.getBoundingClientRect().height ?? 0;
    const top = Math.max(0, window.scrollY + section.getBoundingClientRect().top - headerHeight - 24);
    const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced'
        ? 'instant'
        : 'smooth';

    if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`);
    window.scrollTo({ top, behavior });
}
