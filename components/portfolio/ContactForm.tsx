'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { profile } from '@/data/profile';
import { contactFormEndpoint } from '@/data/contact';
export function ContactForm() {
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const statusRef = useRef<HTMLParagraphElement>(null);

    function setInvalidField(field: HTMLInputElement | HTMLTextAreaElement) {
        const message = field.validity.typeMismatch
            ? 'Enter a valid email address.'
            : field.validity.valueMissing
                ? 'This field is required.'
                : 'Please check this field.';
        setFieldErrors((current) => ({ ...current, [field.name]: message }));
    }

    function clearFieldError(field: HTMLInputElement | HTMLTextAreaElement) {
        if (!field.checkValidity()) return;
        setFieldErrors((current) => {
            if (!(field.name in current)) return current;
            const next = { ...current };
            delete next[field.name];
            return next;
        });
    }

    useEffect(() => {
        if (!status || !matchMedia('(max-width: 899px)').matches) return;
        statusRef.current?.scrollIntoView({
            block: 'nearest',
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
    }, [status]);

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (sending) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const message = String(data.get('message') || '').trim();
        if (!name || !message) {
            const nextErrors: Record<string, string> = {};
            if (!name) nextErrors.name = 'Please enter your name.';
            if (!message) nextErrors.message = 'Please enter your project details.';
            setFieldErrors(nextErrors);
            return;
        }
        setFieldErrors({});
        if (contactFormEndpoint) {
            setSending(true); setStatus('');
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 15000);
            try {
                const response = await fetch(contactFormEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
                if (!response.ok) throw new Error('Submission failed');
                form.reset(); setStatus("Thanks, I'll reply soon.");
            } catch { setStatus('Your message could not be sent. Please try again or use the email link.'); }
            finally { clearTimeout(timeout); setSending(false); }
            return;
        }
        const body = `Hi Talha,\n\n${message}\n\nFrom: ${name}\nReply to: ${email}`;
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry from ' + name)}&body=${encodeURIComponent(body)}`;
        setStatus('');
    }
    return <form className="contact-form" onSubmit={submit} aria-busy={sending}>
        <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" required maxLength={100} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined} onInvalid={(event) => setInvalidField(event.currentTarget)} onChange={(event) => clearFieldError(event.currentTarget)} />
        {fieldErrors.name && <span className="contact-field-error" id="contact-name-error">{fieldErrors.name}</span>}
        <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined} onInvalid={(event) => setInvalidField(event.currentTarget)} onChange={(event) => clearFieldError(event.currentTarget)} />
        {fieldErrors.email && <span className="contact-field-error" id="contact-email-error">{fieldErrors.email}</span>}
        <label htmlFor="contact-message">Your message</label><textarea id="contact-message" name="message" placeholder="Tell me about your project…" required rows={4} maxLength={3000} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined} onInvalid={(event) => setInvalidField(event.currentTarget)} onChange={(event) => clearFieldError(event.currentTarget)} />
        {fieldErrors.message && <span className="contact-field-error" id="contact-message-error">{fieldErrors.message}</span>}
        <button className="button primary" type="submit" disabled={sending}>{sending ? 'Sending…' : contactFormEndpoint ? 'Send message' : 'Create email draft'} <span aria-hidden="true">↗</span></button>
        <p ref={statusRef} className="form-status" role="status">{status}</p>
    </form>;
}
