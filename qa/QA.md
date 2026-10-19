# Portfolio verification

Browser tested on 30 September 2026 using the local production-style build.

- Responsive widths: 320, 390, 768, 1024 and 1440 pixels.
- At each breakpoint the document scroll width equals its client width; no horizontal overflow after fixes.
- Desktop and mobile hero, selected work, project details, navigation and contact visually inspected.
- All three project dialogs open with the correct content. Missing destinations are text, not dead links.
- Dialog focus stays inside the dialog; Escape closes it; focus returns to the original project button; background scroll unlocks.
- Mobile menu opens/closes, locks background scrolling and moves focus and scroll to the selected section.
- Footer reduced-motion control disables CSS motion, sets native scrolling to auto and hides the decorative cursor. WebGL obeys the same preference and OS media query.
- Mobile loads the static hero fallback without a WebGL canvas. Desktop renders the deferred WebGL sculpture.
- No broken image elements or missing internal anchor targets detected. Supplied email and LinkedIn URLs verified in the rendered DOM.
- No browser console errors or warnings in the tested session.
- Production static build and TypeScript validation pass.

Fixed during QA: dialog focus return, mobile menu destination focus, 320px hero overflow, narrow project-cover typography, desktop artwork label spacing and tablet WebGL sizing. Stylesheet compilation was restricted to used components.

Limitations: no physical-device testing or numeric Lighthouse score is claimed. External destinations can change independently. Project screenshots, detailed case-study notes and missing demo/source links remain clearly identified placeholders until real material is supplied.

Publishing status: local build verified; hosted publication was blocked when automatic approval review rejected the deployment workflow stdin step because sandbox approval is disabled. No live URL is claimed.

## Light/dark mode — 2 October 2026
Verified desktop (1440px), tablet (768px) and mobile menu (390px): both directions switch correctly, light and dark choices survive reload, project dialogs adapt to light mode, Enter activates the switch, and no horizontal overflow or console errors were detected. The color transition reports 0.6s normally and 0s with reduced motion; icon animation is also suppressed. Build and TypeScript checks pass.


## Skills redesign — 2 October 2026
Verified the rounded badge section in light and dark themes at desktop and mobile widths, including 320px and 390px without horizontal overflow. All 34 badges render, Shopify follows WooCommerce, and Socket Programming is absent. The visible upper heading and decorative intro are omitted while an accessible section heading remains. No console errors; production build and TypeScript checks pass.


## Centered logo revision — 2 October 2026
Restored What I work with heading and intro. Replaced category rows with 23 compact centered badges, including 22 locally stored brand-logo images and a neutral AI basics icon. Verified desktop dark and mobile light layouts, all images load, no horizontal overflow at 390px or 320px, and no browser errors. Build and TypeScript checks pass.


## Tapered rows and header alignment — 2 October 2026
Desktop badge rows descend 8/6/5/4, measured 995/851/581/476px wide at desktop. Mobile badges use equal-width columns. Centered bold navigation and icon-only theme switch beside contact CTA verified. Responsive overflow checks pass at 1440, 768, 390 and 320px; mobile theme switching still works. Build and TypeScript pass.


## Compact mobile badges and centered headings — 2 October 2026
Mobile pills now use natural widths and centered wrapping at a smaller size. Numbered section headings are centered across desktop and mobile; side descriptions and heading-side CTA removed. Navigation uses regular weight. Verified 390px mobile screenshot, 320px overflow check, and 1440px centered headings and About spacing. Build and TypeScript pass.




## Reference typography — 3 October 2026
Added local Anton and DM Sans fonts. Simplified numbered centered headings, restyled hero name, updated menu order and Projects anchor mapping, and made the light-theme moon dark. Verified desktop font rendering and headings, valid menu targets, mobile Projects navigation and dark theme, no horizontal overflow. Production build and TypeScript pass.


## Exact hero font — 3 October 2026
Verified Barlow Condensed hero name, DM Sans menu at 15px, and capital T in header/footer logos. Desktop 1440px and mobile 390px visually checked without overflow. Build and TypeScript pass.


## Hero copy and menu order — 3 October 2026
Updated hero copy, name line-height 0.94, DM Sans menu 18px, downward work arrow, and header Start a project linking to contact. Removed secondary hero link. Reordered and renumbered sections to About, Skills, Experience, Projects, Services, Contact. Added side lines to titles. Desktop1440 and mobile320 visually checked without overflow; build and TypeScript pass.


## Contact and footer redesign — 3 October 2026
Added rounded form with native required/email validation and explicit email-draft handoff, social links, and large footer wordmark. Balanced section spacing, removed Skills heading bottom divider, restored header CTA and 14px menu. Desktop1440 and mobile390/320 inspected without overflow; invalid email and missing message correctly flagged. No actual message sent. Build and TypeScript pass.


## Contact polish — 3 October 2026
Even footer wordmark padding and full-name footer identity; rounded input boxes; updated contact sentence and Find me on label. Verified mailto styling, Copy success status, exact GitHub/LinkedIn aria-labels and new-tab targets. Desktop and 320px overflow checks pass. Build and TypeScript pass.


## Contact simplification — 3 October 2026
Removed helper lines and footer branding/technology/motion labels, centered footer menu and added back-to-top. Email uses foreground text with an accent underline; Copy icon is 42px like social circles. Darkened light-mode placeholders. Desktop and mobile320 checked. Direct sending prepared but not enabled or tested: requires user Formspree endpoint. Build and TypeScript pass.


## Formspree connection — 3 October 2026
Configured endpoint mbglnrrp. Build/TypeScript pass. Browser verified Send message and required-field validation. Mocked network tests verified POST destination, success confirmation/reset, failure preservation/error and loading reset. No external test message sent; actual inbox delivery is unverified.

