import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteOrigin, pageTitle, pageDescription, openGraphImage } from '@/data/site-metadata';

export const metadata: Metadata = {
    metadataBase: new URL(siteOrigin),
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: siteOrigin },
    icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
    openGraph: {
        type: 'website',
        siteName: 'Talha Mumtaz',
        title: pageTitle,
        description: pageDescription,
        url: siteOrigin,
        images: [{ url: openGraphImage, width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: pageDescription,
        images: [openGraphImage],
    },
};

export const viewport: Viewport = { themeColor: '#F6F4EE' };
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>; }

