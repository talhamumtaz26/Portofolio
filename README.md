# Talha Mumtaz — Developer Portfolio

A complete React + TypeScript portfolio with server-rendered static HTML, Tailwind CSS, accessible Radix dialogs and a small, dynamically loaded native WebGL sculpture. No AI-generated project screenshots, fabricated testimonials, dates, employers or results are included.

## Run locally

Requires Node.js 22.13 or newer and npm.

1. Run npm ci.
2. Run npm run dev.
3. Open http://127.0.0.1:5187.

The preview serves a production-style static build. After editing, run npm run build and refresh the browser. npm start serves an existing build. npm run typecheck verifies TypeScript. No environment variables or API keys are required. Contact links open the visitor's email application; no email is sent by this site.

## Edit content

- data/profile.ts: identity, headline, copy, real contact/social links, deployment origin and all SEO metadata.
- data/projects.ts: the three project records and expandable case study content. Each supports title, category, description, technologies, image, gallery, liveUrl, githubUrl, featured, year, caseStudy, accent and optional video. Keep unknown values null. Missing links are displayed as unavailable, never as fake buttons.
- data/content.ts: skill groups, experience entries, services and optional real testimonials. Testimonials are hidden while the array is empty.
- components/portfolio: reusable navigation, hero, project presentation, sections and motion components.
- app/globals.css: shared colors, typography, layouts and breakpoints.
- app/static-entry.tsx: static HTML and Person structured data.
- scripts/build-static.mjs: React prerendering, split client bundles, compiled CSS and public assets.
- scripts/serve-static.mjs: local static server on port 5187.

## Replace project media

Put optimized WebP/AVIF images in public/projects. Set a project's image to /projects/your-image.webp. Add gallery entries such as { src: '/projects/detail.webp', alt: 'A descriptive caption' }. Set video to a local MP4/WebM URL to render an accessible controlled video using image as its poster. GIF files also work through image. The typography covers are explicitly labeled concepts, not screenshots; they disappear when real media is configured.

## Add a project

Duplicate a record in data/projects.ts, give it a unique slug, and fill only verified facts. Set featured: true for a full-width lead treatment. Keep image, dates, links and undocumented implementation/challenges/results null until available. Add supplied screenshots to gallery. Titles wrap to accommodate long names. Project detail dialogs are keyboard accessible and restore focus when closed.

## Motion and accessibility

Native scrolling, skip link, visible focus states, semantic headings and focus-trapped dialogs. Mobile navigation locks background scrolling and moves focus to the chosen section. The WebGL module is deferred, capped at 1.5 device pixel ratio, paused offscreen/in hidden tabs, and not loaded below 761px. A static orbital fallback stays visible if WebGL fails. The desktop cursor is decorative and never replaces the operating-system pointer. Both OS reduced-motion preference and the footer control suppress movement. The local preference uses browser storage only.

## Build and deploy

npm run build creates dist with prerendered HTML, optimized split JavaScript, CSS, favicon, robots and sitemap. Upload dist to a static web host. Sites configuration is in .openai/hosting.json. The starter's optional Next/Vinext configuration and UI catalog are retained for future expansion; production scripts use the static React pipeline to avoid Windows subprocess incompatibilities encountered with the initial development server.

Update profile.siteUrl before using another domain. Rebuild after content edits. The build generates canonical/Open Graph/X metadata and Person schema. No social preview image was invented. Real media can be added later. A private Sites deployment is owner-only until its sharing is changed through Sites.

## Content still to supply

Actual project screenshots/video; detailed implementation and challenge notes; verified results (if any); project dates; Watchly repository/demo and WeatherWizard live-demo URLs; employment dates or employers; real testimonials. All have editable fields or arrays. No fabricated data fills these gaps.

## Reference direction

The brief's supplied references informed the requested hierarchy, restraint and interaction goals. No reference code, copy, branding or layouts were copied. Some reference pages were unavailable to the web reader. This design is original.

## Color themes
Use Light mode / Dark mode in the desktop navigation or mobile menu. The choice is stored locally and applied before the page paints on reload. Switching crossfades the page colors over 600ms and respects both OS and site reduced-motion preferences. ThemeToggle.tsx contains the control; paired colors and transition rules are in app/globals.css.


## Skills badges
Edit the displayed badge rows in components/portfolio/Skills.tsx. Responsive light/dark styling is in app/globals.css. Brand SVG assets are stored locally in public/logos, sourced from Devicon v2.17.0 (https://github.com/devicons/devicon) and Simple Icons (https://simpleicons.org). AI basics uses a neutral CPU icon because it is a concept rather than a brand.



## Typography
Locally hosted Anton supplies the condensed display type; DM Sans supplies the regular navigation type. Both are distributed under the SIL Open Font License, with license files in public/fonts. Display headings use centered numbers above uppercase section names.


The large hero name uses locally hosted Barlow Condensed ExtraBold (800), with its SIL license in public/fonts. The DM Sans desktop menu is 15px; the logo reads Talha.


## Contact form
ContactForm.tsx validates name, email and message and opens a prefilled mailto draft. It does not send messages itself or store submissions; visitors send from their email application. No delivery backend is configured.


Direct-delivery preparation: set contactFormEndpoint in data/contact.ts to a verified Formspree endpoint. The form then posts asynchronously, shows sending/error/success states, and resets only on success. This is unconfigured and delivery has not been tested. With an empty endpoint it remains Create email draft. Formspree docs: https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/


Formspree is now configured with the user-provided endpoint in data/contact.ts. The active form submits directly and displays Send message. Local mocked success/error tests passed; live inbox delivery has not been tested.


## Resume download
Place your real PDF at public/resume.pdf (inside outputs), then run npm run build. Desktop and mobile Resume links download it as Talha-Mumtaz-Resume.pdf. No placeholder PDF is included; the download becomes available after you add the file and rebuild.

