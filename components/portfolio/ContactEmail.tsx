'use client';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { profile } from '@/data/profile';
export function ContactEmail() {
    const [status, setStatus] = useState('');
    async function copyEmail() {
        try { await navigator.clipboard.writeText(profile.email); setStatus('Copied!'); }
        catch { setStatus('Copy unavailable. Select the email address to copy it.'); }
    }
    return <div className="contact-email-group"><div className="contact-email-row"><a className="contact-email" href={'mailto:' + profile.email}>{profile.email}</a><button type="button" className="copy-email" onClick={copyEmail} aria-label="Copy email address" title="Copy email address"><Copy size={18} aria-hidden="true" /></button></div><p className="copy-status sr-only" role="status">{status}</p></div>;
}
