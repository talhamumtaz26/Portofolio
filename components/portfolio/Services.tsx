import { Code2, ShoppingBag, Zap, Sparkles, Workflow, Wrench } from 'lucide-react';
import { serviceItems } from '@/data/content';

const serviceIcons = { code: Code2, bag: ShoppingBag, bolt: Zap, ai: Sparkles, nodes: Workflow, support: Wrench };

export function Services() {
    return <section id="services" className="section services-section">
        <style>{`
            #services .service-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; list-style: none; margin: 0; padding: 0; }
            #services .service-card { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; min-width: 0; padding: 32px; text-align: center; border: 1px solid var(--line); border-radius: 16px; background: transparent; color: var(--foreground); transition: border-color 180ms ease, transform 180ms ease; }
            #services .service-card:hover { border-color: var(--blue); transform: translateY(-2px); }
                        #services .service-card-icon { width: 44px; height: 44px; margin: 0; color: var(--blue); stroke-width: 1.5; }
            #services .service-card-title { max-width: 100%; margin: 0; font-size: clamp(19px, 1.8vw, 23px); line-height: 1.3; letter-spacing: -.02em; font-weight: 500; text-wrap: balance; }
            #services .service-card-description { max-width: 42ch; margin: 0; color: var(--muted); font-size: 15px; line-height: 1.75; text-wrap: balance; }
            @media (min-width: 700px) and (max-width: 1023px) {
                #services .service-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
            }
            @media (max-width: 699px) {
                #services .service-cards { grid-template-columns: minmax(0, 1fr); gap: 14px; }
                #services .service-card { padding: 28px 24px; }
            }
            @media (prefers-reduced-motion: reduce) { #services .service-card { transition: none; } #services .service-card:hover { transform: none; } }
            html[data-motion=reduced] #services .service-card { transition: none; }
            html[data-motion=reduced] #services .service-card:hover { transform: none; }
        `}</style>
        <div className="wrap">
            <div className="section-heading reveal"><div><p className="eyebrow">/05</p><h2>Services</h2></div></div>
            <ul className="service-cards reveal">
                {serviceItems.map(item => {
                    const Icon = serviceIcons[item.icon];
                    return <li className="service-card" key={item.title}>
                        <Icon className="service-card-icon" aria-hidden="true" />
                        <h3 className="service-card-title">{item.title}</h3>
                        <p className="service-card-description">{item.description}</p>
                    </li>;
                })}
            </ul>
        </div>
    </section>;
}
