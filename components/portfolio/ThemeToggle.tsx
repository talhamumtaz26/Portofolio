'use client';
import { Moon, Sun } from 'lucide-react';
import type { MouseEvent } from 'react';

export function ThemeToggle({ light, onToggle }: { light: boolean; onToggle: (event: MouseEvent<HTMLButtonElement>) => void }) {
    return <button type="button" className="theme-toggle" onClick={onToggle}
        aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'} aria-pressed={!light} title={light ? 'Switch to dark mode' : 'Switch to light mode'}>
        <span className="theme-icon" aria-hidden="true">{light ? <Moon size={18} /> : <Sun size={18} />}</span>

    </button>;
}

