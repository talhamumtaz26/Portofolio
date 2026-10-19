import { motion } from 'framer-motion';
import { ArrowUpRight, Braces, Film, Globe2, Search, Smartphone } from 'lucide-react';
import type { Project } from '@/data/projects';

const brandTagIcons: Record<string, string> = {
    WordPress: '/logos/wordpress.svg',
    WooCommerce: '/logos/woocommerce.svg',
    Elementor: '/logos/elementor.svg',
    'Astra Pro': '/logos/astra.svg',
    React: '/logos/react.svg',
    'React Native': '/logos/react.svg',
    TypeScript: '/logos/typescript.svg',
};

function TechnologyIcon({ name }: { name: string }) {
    const brandIcon = brandTagIcons[name];
    if (brandIcon) return <img className="technology-tag-icon" src={brandIcon} alt="" aria-hidden="true" width={14} height={14} loading="lazy" decoding="async" />;

    const Icon = name === 'SEO' ? Search
        : name === 'APIs' ? Globe2
            : name === 'Capacitor' || name === 'Mobile Development' ? Smartphone
                : name === 'TMDb API' ? Film
                    : Braces;
    return <Icon className="technology-tag-icon" size={14} strokeWidth={1.8} aria-hidden="true" />;
}

export function TechnologyChip({ name, animate = false, index = 0 }: { name: string; animate?: boolean; index?: number }) {
    return <motion.span className="technology-chip" initial={animate ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: animate ? 0.12 + index * 0.055 : 0 }}>
        <TechnologyIcon name={name} />{name}
    </motion.span>;
}

export function ProjectButtons({ project, onSelect, includeExplore = true, includeGithub = true, modalStyle = false, onPrefetch, className }: { project: Project; onSelect: (project: Project) => void; includeExplore?: boolean; includeGithub?: boolean; modalStyle?: boolean; onPrefetch?: () => void; className?: string }) {
    return <div className={`showcase-buttons${className ? ` ${className}` : ''}`}>
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">{modalStyle ? <ArrowUpRight size={16} aria-hidden="true" /> : <Globe2 size={16} aria-hidden="true" />}Live Website</a>}
        {includeGithub && project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"><span className="showcase-github-icon" aria-hidden="true" />GitHub</a>}
        {includeExplore && <button type="button" onMouseEnter={onPrefetch} onFocus={onPrefetch} onClick={() => onSelect(project)}><ArrowUpRight size={16} aria-hidden="true" />Explore project</button>}
    </div>;
}
