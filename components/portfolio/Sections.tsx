import { ContactEmail } from './ContactEmail';
import { ContactForm } from './ContactForm';
import { scrollToSection } from '@/lib/scroll-to-section';
import { profile, navigation } from '@/data/profile';
import { aboutNowItems, aboutStats, testimonials } from '@/data/content';
import { ArrowUp, Download, Mail } from 'lucide-react';
export function About() {
    return <section id="about" className="section about-section">
        <style>{`
            #about.about-section { padding-block: 50px 90px; }
            #about .section-heading { margin-bottom: 60px; }
            #about .about-grid { position: relative; isolation: isolate; display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, .95fr) minmax(0, 1.25fr); gap: 48px; align-items: center; }
            #about .about-grid::before { display: none; }
            #about .about-mark { position: relative; min-width: 0; min-height: 0; align-self: stretch; margin-top: 0; justify-content: flex-start; border-left: 0; padding: 0; }
            #about .about-mark::before { content: ""; position: absolute; top: 0; bottom: 0; left: -30px; width: 1px; background: var(--foreground); opacity: .35; pointer-events: none; }
            #about .about-person-label { margin: 0 0 24px; color: var(--muted); font: 400 12px/1.4 monospace; letter-spacing: .14em; text-transform: uppercase; }
            #about .about-mark strong { display: block; margin-top: 14px; font-size: clamp(48px, 5.3vw, 78px); line-height: .98; letter-spacing: -.045em; overflow-wrap: anywhere; }
            #about .about-now-wrap { align-self: flex-start; width: 240px; margin-top: 32px; color: var(--muted); }
            #about .about-now { display: grid; gap: 5px; margin: 0; padding: 0; list-style: none; font: 500 12px/1.7 monospace; letter-spacing: .2px; }
            #about .about-now li span { color: var(--foreground); }
            #about .about-availability { display: inline-flex; align-items: center; gap: 8px; margin-top: 14px; padding: 7px 10px; border: 1px solid color-mix(in srgb, var(--line) 75%, transparent); border-radius: 999px; color: var(--foreground); font: 500 12px/1.3 monospace; }
            #about .about-availability-below-card { position: absolute; z-index: 3; top: calc(100% + 24px); left: calc(-100% + 11px); margin-top: 0; }
            #about .about-availability i { width: 7px; height: 7px; flex: 0 0 auto; border-radius: 50%; background: var(--blue); }
            #about .about-mark i { color: var(--blue); }
            #about .about-portrait-composition { position: relative; isolation: isolate; width: 100%; max-width: 420px; aspect-ratio: 4 / 5; margin-inline: auto; transform: translateX(-40px); }
            #about .about-portrait-stage { position: absolute; inset: 0; }
            #about .about-grid-lines { position: absolute; inset: 0; z-index: -1; background-image: linear-gradient(to right, color-mix(in srgb, var(--line) 55%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--line) 55%, transparent) 1px, transparent 1px); background-size: 32px 32px; mask-image: radial-gradient(ellipse at center, var(--foreground) 30%, transparent 78%); }
            #about .about-portrait-circle { position: absolute; inset: 8%; border: 1px solid color-mix(in srgb, var(--accent-decor) 35%, transparent); border-radius: 50%; }
            #about .about-portrait-tab { position: absolute; z-index: 0; left: 31%; top: 0; width: 34%; height: 43%; border-radius: 24px 24px 0 0; background: color-mix(in srgb, var(--accent-decor) 16%, var(--surface)); }
            #about .about-portrait-shape { position: absolute; z-index: 0; left: 10%; top: 8%; width: 80%; aspect-ratio: 1; height: auto; border-radius: 50%; background: radial-gradient(circle, color-mix(in srgb, var(--accent-decor) 28%, transparent) 0%, color-mix(in srgb, var(--accent-decor) 10%, transparent) 74%, transparent 100%); }
            #about .about-portrait-dot { position: absolute; z-index: 2; left: 8%; top: 39%; width: 32px; height: 32px; border-radius: 50%; background: var(--blue); }
            #about .about-signature-arc { position: absolute; z-index: 0; left: -8%; top: 49%; width: 51%; aspect-ratio: 1; border: 1px solid color-mix(in srgb, var(--blue) 50%, transparent); border-radius: 50%; pointer-events: none; }
            #about .about-portrait-image { position: absolute; inset: 0; z-index: 1; width: 100%; height: 100%; object-fit: contain; object-position: center bottom; transform: translateY(-48px); -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,.92) 78%, rgba(0,0,0,.62) 90%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%); -webkit-mask-composite: source-in; mask-image: linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,.92) 78%, rgba(0,0,0,.62) 90%, transparent 100%), linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%); mask-composite: intersect; }
            #about .about-signature { position: absolute; z-index: 2; left: -25%; top: 42%; width: 110px; height: auto; transform: rotate(-15deg); }
            #about .about-ideas { position: absolute; z-index: 2; top: 15%; left: -8%; display: grid; gap: 5px; color: color-mix(in srgb, var(--muted) 78%, var(--foreground)); font: 600 10px/1.4 monospace; letter-spacing: 1.6px; }
            #about .about-ideas::before { content: ""; position: absolute; top: -8px; bottom: -8px; left: -12px; width: 1px; background: color-mix(in srgb, var(--line) 40%, transparent); }
            #about .about-right-hairline { position: absolute; z-index: 0; top: 24%; right: 3%; bottom: 15%; width: 1px; background: color-mix(in srgb, var(--line) 35%, transparent); }
            #about .about-bottom-ring { position: absolute; z-index: 2; right: 5%; bottom: 5%; width: 24px; height: 24px; border: 1px solid color-mix(in srgb, var(--line) 55%, transparent); border-radius: 50%; }
            #about .about-arc-sparkle { position: absolute; z-index: 2; left: 2%; bottom: 21%; color: var(--blue); font: 12px/1 monospace; }
            #about .about-arc-dot { position: absolute; z-index: 2; left: 4%; bottom: 17%; width: 4px; height: 4px; border-radius: 50%; background: var(--blue); }
            #about .about-mark-plus { position: absolute; z-index: 2; color: var(--blue); font: 16px/1 monospace; }
            #about .about-mark-plus-one { top: 8%; left: 8%; right: auto; }
            #about .about-mark-plus-one::after { content: ""; position: absolute; left: 100%; top: 50%; width: 20px; margin-left: 7px; border-top: 1px solid var(--line); }
            #about .about-mark-plus-two { top: calc(48% - 70px); right: 2%; }
            #about .about-mark-plus-three { top: calc(62% - 70px); right: 2%; }
            #about .about-mark-plus-four { top: calc(76% - 70px); right: 2%; }
            #about .about-code-icon { position: absolute; z-index: 2; top: calc(35% - 70px); right: 0; color: var(--foreground); font: 16px/1 monospace; }
            #about .about-copy { position: relative; }
            #about .about-copy::before { content: ""; position: absolute; top: 0; bottom: 0; left: -24px; width: 1px; background: var(--foreground); opacity: .35; }
            #about .about-code-card { position: absolute; z-index: 3; left: -2%; bottom: -12px; transform: translateX(-50%); width: min(76%, 340px); padding: 12px 14px 13px; border: 1px solid rgba(255,255,255,.3); border-radius: 16px; background: rgba(255,255,255,.33); -webkit-backdrop-filter: blur(22px) saturate(1.2); backdrop-filter: blur(22px) saturate(1.2); box-shadow: 0 8px 32px rgba(0,0,0,.1), inset 0 1px rgba(255,255,255,.25); color: var(--foreground); }
            #about .about-code-card::after { content: ""; position: absolute; right: 9%; bottom: 14%; width: 28%; border-bottom: 1px solid color-mix(in srgb, var(--line) 55%, transparent); }
            #about .about-code-controls { display: flex; gap: 6px; margin-bottom: 8px; }
            #about .about-code-controls span { width: 10px; height: 10px; border-radius: 50%; }
            #about .about-code-controls span:nth-child(1) { background: var(--muted-soft); }
            #about .about-code-controls span:nth-child(2) { background: var(--line); }
            #about .about-code-controls span:nth-child(3) { background: var(--accent-bright); }
            #about .about-code { margin: 0; color: color-mix(in srgb, var(--foreground) 82%, var(--muted)); font: clamp(12px, .9vw, 13px)/1.6 monospace; white-space: pre; }
            #about .about-code-string { color: var(--blue); }
            #about .about-copy { min-width: 0; max-width: 66ch; }
            #about .about-lead { margin: 18px 0 22px; color: var(--foreground); font-family: Georgia, serif; font-size: 24px; font-style: italic; line-height: 1.4; font-weight: 400; }
            #about .about-copy .about-paragraph { margin: 0 0 16px; color: color-mix(in srgb, var(--muted) 82%, var(--foreground)); font-size: 17px; line-height: 1.8; }
            #about .about-lead + .about-paragraph { font-family: "DM Sans", Arial, sans-serif; }
            #about .about-highlight { color: var(--blue); font-weight: inherit; }
            #about .about-copy .about-closing { margin: 22px 0 0; font-style: italic; text-wrap: balance; }
            #about .about-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 34px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
            #about .about-stat { padding: 18px 14px; text-align: center; }
            #about .about-stat + .about-stat { border-left: 1px solid var(--line); }
            #about .about-stat-value { display: block; font-family: Portfolio Display, Arial, sans-serif; font-size: clamp(27px, 3vw, 38px); line-height: 1.1; color: var(--foreground); }
            #about .about-stat-label { display: block; margin-top: 7px; color: var(--muted); font-size: clamp(9px, .76vw, 12px); line-height: 1.45; white-space: nowrap; }
            #about .about-links { display: flex; width: 100%; flex-wrap: nowrap; justify-content: flex-start; gap: 8px; margin-top: 22px; }
            #about .about-link { display: inline-flex; flex: 1 1 0; min-width: 0; min-height: 48px; align-items: center; justify-content: center; gap: 7px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 6px; color: var(--foreground); font-size: 12px; font-weight: 600; line-height: 1.4; white-space: nowrap; transition: border-color .2s, color .2s, background-color .2s; }
            #about .about-link svg { width: 16px; height: 16px; flex: 0 0 auto; }
            #about .about-link-primary { flex: 0 0 auto; }
            #about .about-link:hover { border-color: var(--blue); color: var(--blue); }
            #about .about-link-primary { padding-inline: 16px; border-color: var(--blue); background: var(--blue); color: var(--background); }
            #about .about-link-primary:hover { background: transparent; color: var(--blue); }
            @media (max-width: 1099px) {
                #about .about-grid { display: flex; flex-direction: column; gap: 42px; align-items: stretch; }
                #about .about-links { flex-wrap: wrap; }
                #about .about-portrait-composition { transform: none; }
                #about .about-grid::before, #about .about-mark::before, #about .about-copy::before { display: none; }
                #about .about-mark { position: static; align-self: stretch; margin-top: 0; }
                #about .about-mark { width: 100%; text-align: center; }
                #about .about-now-wrap { align-self: center; width: min(100%, 440px); }
                #about .about-mark strong { font-size: clamp(64px, 10vw, 90px); }
                #about .about-portrait-composition { flex: 0 0 auto; width: min(100%, 420px); }
                #about .about-copy { width: 100%; max-width: 66ch; margin-inline: auto; }
            }
            @media (max-width: 699px) {
                #about .about-grid-lines, #about .about-mark-plus, #about .about-ideas, #about .about-code-icon, #about .about-grid::before, #about .about-mark::before, #about .about-right-hairline, #about .about-copy::before { display: none; }
                #about .about-grid { gap: 34px; }
                #about .about-mark strong { font-size: clamp(58px, 13vw, 78px); }
                #about .about-now-wrap { display: none; }
                #about .about-portrait-composition { display: flex; flex-direction: column; width: min(100%, 360px); aspect-ratio: auto; }
                #about .about-portrait-stage { position: relative; inset: auto; flex: 0 0 auto; width: 100%; aspect-ratio: 4 / 5; }
                #about .about-signature { left: -4%; top: 42%; font-size: clamp(64px, 17vw, 72px); }
                #about .about-portrait-image { transform: translateY(-30px); }
                #about .about-code-card { position: relative; left: auto; bottom: auto; transform: none; width: 100%; margin-top: 12px; font-size: 12px; }
                #about .about-availability-below-card { position: static; align-self: flex-start; margin-top: 12px; }
                #about .about-code { font-size: 12px; white-space: pre; }
                #about .about-portrait-image { -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,.9) 82%, rgba(0,0,0,.58) 92%, transparent 100%), linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%); mask-image: linear-gradient(to bottom, #000 0%, #000 72%, rgba(0,0,0,.9) 82%, rgba(0,0,0,.58) 92%, transparent 100%), linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%); }
            }
            @media (max-width: 760px) {
                #about.about-section { padding-block: 50px; }
                #about .section-heading { margin-bottom: 42px; }
            }
            @media (max-width: 479px) {
                #about .about-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                #about .about-stat:nth-child(3) { grid-column: auto; border-top: 0; border-left: 1px solid var(--line); }
                #about .about-stat-label { font-size: 12px; white-space: normal; }
                #about .about-links { gap: 9px; }
                #about .about-links { justify-content: flex-start; flex-wrap: wrap; }
            }
            @media (max-width: 699px) {
                #about .about-links { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
                #about .about-link { width: 100%; min-width: 0; gap: 4px; padding-inline: 3px; font-size: 10px; }
                #about .about-link-primary { grid-column: 1 / -1; justify-self: stretch; }
                #about .about-link:not(.about-link-primary) { white-space: nowrap; }
            }
            @media (max-width: 899px) {
                #about.about-section { padding-block: 50px; }
                #about .section-heading { margin-bottom: 24px; }
                #about .about-grid { display: flex; flex-direction: column; align-items: stretch; gap: 0; }
                #about .about-mark { display: none; animation: none; }
                #about .about-portrait-composition { display: block; position: relative; width: min(70vw, 300px); max-width: 300px; aspect-ratio: 4 / 5; margin: 0 auto 24px; transform: none; }
                #about .about-portrait-stage { position: absolute; inset: 0; width: 100%; aspect-ratio: auto; }
                #about .about-portrait-circle, #about .about-portrait-shape, #about .about-portrait-tab { display: block; }
                #about .about-signature { left: 4%; top: calc(42% - 24px); width: 30%; height: auto; transform: rotate(-15deg); }
                #about .about-grid-lines, #about .about-signature-arc, #about .about-portrait-dot, #about .about-right-hairline, #about .about-bottom-ring, #about .about-arc-sparkle, #about .about-arc-dot, #about .about-ideas, #about .about-mark-plus, #about .about-code-icon, #about .about-mark::before, #about .about-copy::before { display: none; animation: none; }
                #about .about-code-card, #about .about-availability, #about .about-now-wrap { display: none; animation: none; }
                #about .about-copy { width: 100%; max-width: 66ch; margin: 0 auto; }
                #about .about-lead { margin: 0 0 22px; }
                #about .about-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                #about .about-stat { min-width: 0; padding: 14px 6px; }

                #about .about-stat-value { font-size: 28px; }
                #about .about-stat-label { max-width: 100%; margin: 7px auto 0; font-size: 12px; line-height: 1.35; text-align: center; text-wrap: balance; white-space: normal; }
            }
            @media (max-width: 899px) {
                #about .about-mark { display: contents; animation: none; opacity: 1; transform: none; }
                #about .about-mark strong, #about .about-now-wrap { display: none; animation: none; }
                #about .about-person-label { display: block; order: -1; align-self: stretch; margin: 0 0 24px; color: var(--muted); font: 400 11px/1.4 monospace; letter-spacing: .14em; text-align: center; text-transform: uppercase; }
                #about .about-portrait-composition { order: 0; width: min(92vw, 360px); max-width: 360px; margin: 0 auto 28px; }
                #about .about-portrait-image { transform: translate(-6px, -3.1%); -webkit-mask-image: linear-gradient(to bottom, var(--foreground) 0%, var(--foreground) 68%, color-mix(in srgb, var(--foreground) 88%, transparent) 80%, color-mix(in srgb, var(--foreground) 58%, transparent) 91%, transparent 100%); mask-image: linear-gradient(to bottom, var(--foreground) 0%, var(--foreground) 68%, color-mix(in srgb, var(--foreground) 88%, transparent) 80%, color-mix(in srgb, var(--foreground) 58%, transparent) 91%, transparent 100%); }
                #about .about-signature { left: -10%; top: 48%; width: 28%; height: auto; transform: rotate(-15deg); }
                #about .about-copy { order: 2; }
                #about .about-lead { margin: 0 0 22px; }
                #about .about-stat { padding-inline: 4px; }
                #about .about-stat:nth-child(3) { grid-column: auto; border-top: 0; border-left: 1px solid var(--line); }
                #about .about-stat-value { font-size: 28px; }
                #about .about-stat-label { font-size: 12px; }
                #about .about-stat:first-child .about-stat-label { max-width: 9ch; }
                #about .about-link { min-height: 48px; height: 48px; font-size: 14px; font-weight: 600; }
                #about .about-link-primary { font-size: 15px; }
                #about .about-link svg { width: 16px; height: 16px; }
                #about .about-link:not(.about-link-primary) { gap: 4px; padding-inline: 4px; }
                #about .about-portrait-stage::before, #about .about-portrait-stage::after, #about .about-portrait-composition::before, #about .about-portrait-composition::after { display: none; }
            }
            @media (max-width: 320px) and (max-width: 899px) {
                #about .about-stat-label { font-size: 11px; }
            }
            @media (prefers-reduced-motion: reduce) { #about .about-link { transition: none; } }
        `}</style>
        <div className="wrap">
            <div className="section-heading reveal"><div><p className="eyebrow">/01</p><h2>About Me</h2></div></div>
        </div>
        <div className="wrap about-grid">
            <div className="about-mark reveal"><p className="about-person-label">The person behind the code</p><strong>Curiosity.<br />Code.<br /><i>Craft.</i></strong><div className="about-now-wrap"><ul className="about-now">{aboutNowItems.map(item => <li key={item.label}>{item.label}: <span>{item.value}</span></li>)}</ul></div></div>
            <figure className="about-portrait-composition reveal">
                <div className="about-portrait-stage">
                <span className="about-grid-lines" aria-hidden="true" />
                <span className="about-portrait-circle" aria-hidden="true" />
                <span className="about-portrait-tab" aria-hidden="true" />
                <span className="about-portrait-shape" aria-hidden="true" />
                <span className="about-signature-arc" aria-hidden="true" />
                <span className="about-portrait-dot" aria-hidden="true" />
                <span className="about-right-hairline" aria-hidden="true" />
                <span className="about-bottom-ring" aria-hidden="true" />
                <span className="about-arc-sparkle" aria-hidden="true">✧</span>
                <span className="about-arc-dot" aria-hidden="true" />
                <span className="about-ideas" aria-hidden="true"><span>IDEAS</span><span>DEVELOP</span><span>LEARN</span><span>REPEAT</span></span>
                <img className="about-signature" src="/images/signature.webp" alt="" aria-hidden="true" width={260} height={157} loading="lazy" decoding="async" />
                <span className="about-mark-plus about-mark-plus-one" aria-hidden="true">+</span>
                <span className="about-mark-plus about-mark-plus-two" aria-hidden="true">+</span>
                <span className="about-mark-plus about-mark-plus-three" aria-hidden="true">+</span>
                <span className="about-mark-plus about-mark-plus-four" aria-hidden="true">+</span>
                <span className="about-code-icon" aria-hidden="true">&lt;/&gt;</span>
                <picture className="about-portrait-picture"><source srcSet="/images/about-portrait.webp" type="image/webp" /><img className="about-portrait-image" src="/images/about-portrait.webp" alt="Illustrated portrait of Talha Mumtaz" width={900} height={1125} loading="lazy" decoding="async" /></picture>
                </div>
                <div className="about-code-card" aria-hidden="true">
                    <span className="about-code-controls"><span /><span /><span /></span>
                    <pre className="about-code"><code><span>const developer = {'{'}</span>{'\n'}  passion: <span className="about-code-string">&quot;Building&quot;</span>,{'\n'}  focus: <span className="about-code-string">&quot;Useful Products&quot;</span>,{'\n'}  learning: <span className="about-code-string">&quot;Always&quot;</span>,{'\n'}{'};'}</code></pre>
                </div>
                <div className="about-availability about-availability-below-card"><i aria-hidden="true" />Available for freelance work</div>
            </figure>
            <div className="about-copy reveal">
                <p className="about-lead">I build websites and apps that people actually enjoy using.</p>
                <p className="about-paragraph">I&apos;m Talha, a computer science student and web developer from Pakistan. Since 2024 I&apos;ve been building and fixing <span className="about-highlight">WordPress</span> and WooCommerce sites for clients, and I&apos;m growing into <span className="about-highlight">React</span>, TypeScript, and mobile apps, using AI tools to build faster.</p>
                <p className="about-paragraph">Before development, I worked as a computer teacher, a school administrator, a sales assistant, and an e-commerce specialist. Those jobs taught me to think about the <span className="about-highlight">person</span> on the other side of the screen, not just the code.</p>
                <div className="about-stats" aria-label="Experience at a glance">{aboutStats.map(stat => <div className="about-stat" key={stat.label}><span className="about-stat-value">{stat.value}</span><span className="about-stat-label">{stat.label}</span></div>)}</div>
                <div className="about-links">
                    <a className="about-link about-link-primary" href="/Talha-Mumtaz-Resume.pdf" download="Talha-Mumtaz-Resume.pdf"><Download aria-hidden="true" />Download resume</a>
                    <a className="about-link" href={profile.github} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.93.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>GitHub ↗</a>
                    <a className="about-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 2.99 0 3.57 1.97 3.57 4.53v5.24Z" /></svg>LinkedIn ↗</a>
                    <a className="about-link" href={'mailto:' + profile.email}><Mail aria-hidden="true" />Email ↗</a>
                </div>
            </div>
        </div>
    </section>;
}
export { Skills } from './Skills';
export { Experience } from './Experience';
export { Services } from './Services';
export function Testimonials() { if (!testimonials.length)
    return null; return <section className="section wrap"><p className="eyebrow">KIND WORDS</p>{testimonials.map(t => <figure key={t.person}><blockquote>{t.quote}</blockquote><figcaption>{t.avatar && <img src={t.avatar} alt="" width="48" height="48" loading="lazy" decoding="async"/>}{t.person} / {t.role}, {t.company}</figcaption></figure>)}</section>; }
export function Contact() { return <section id="contact" className="section wrap contact"><div className="section-heading reveal"><div><p className="eyebrow">/06</p><h2>Contact</h2></div></div><div className="contact-layout"><div className="contact-intro reveal"><h3>Have a project<br />in <span>mind?</span></h3><p>Tell me what you&apos;re building and let&apos;s make it happen.</p><ContactEmail /><div className="follow-links"><span>Find me on</span><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><img src="/logos/github.svg" alt="" width="22" height="22" loading="lazy" decoding="async" /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 2.99 0 3.57 1.97 3.57 4.53v5.24Z" /></svg></a><a href="https://wa.me/923195951728" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp direct message"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.5 0 .14 5.35.14 11.94c0 2.1.55 4.14 1.6 5.95L0 24l6.26-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.94-5.36 11.94-11.94 0-3.19-1.24-6.19-3.51-8.42ZM12.08 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.52-5.25c0-5.47 4.45-9.92 9.92-9.92a9.84 9.84 0 0 1 7.02 2.91 9.84 9.84 0 0 1 2.9 7.02c0 5.47-4.45 9.92-9.94 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.8-1.49-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.3 1.27.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.12-.27-.2-.57-.35Z" /></svg></a></div></div><ContactForm /></div></section>; }
export function Footer() { return <footer className="portfolio-footer wrap"><div className="footer-top"><nav aria-label="Footer navigation">{navigation.map(name => { const id = name === 'Projects' ? 'work' : name.toLowerCase(); return <a key={name} className={name === 'Contact' ? 'footer-contact-link' : undefined} href={'#' + id} onClick={event => { if (!window.matchMedia('(max-width: 899px)').matches) return; event.preventDefault(); scrollToSection(id); }}>{name}</a>; })}</nav></div><div className="footer-wordmark" aria-hidden="true">TALHA MUMTAZ</div><div className="footer-credits"><span>© {new Date().getFullYear()} Talha Mumtaz. All rights reserved.</span><a href="#"><span>Back to top</span><ArrowUp size={15} strokeWidth={1.8} aria-hidden="true" /></a></div></footer>; }


