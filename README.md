<div align="center">

# Talha Mumtaz

### WordPress · E-commerce · Web Development

An expressive, responsive portfolio built to showcase selected projects, experience, and the work behind them.

[![Live portfolio](https://img.shields.io/badge/Portfolio-Live-3DA46D?style=for-the-badge)](https://talhamumtaz26.github.io/Portofolio/)
[![React](https://img.shields.io/badge/React-19-20232A?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

</div>

---

## The portfolio

This site introduces **Talha Mumtaz**, a computer science student and developer focused on WordPress, e-commerce, and modern web applications. It brings selected work, skills, experience, and contact options together in one place.

The visual direction pairs a bold typographic hero with floating technology tiles, orbital details, and a restrained green accent. Light and dark themes, responsive layouts, and reduced-motion support make the experience adapt to the visitor.

## Featured work

| Project | What it is | Built with |
| --- | --- | --- |
| **La Casa De Fashion** | A customized apparel storefront | WordPress, WooCommerce, Elementor, Astra Pro |
| **WeatherWizard** | A full-stack weather application | React, Express, TypeScript, APIs, Capacitor |
| **Watchly** | Movie and TV discovery and tracking | React, TMDb API, Firebase, Capacitor |

Project details and available demos are shown on the [live portfolio](https://talhamumtaz26.github.io/Portofolio/).

## Built with

- **React 19** and **TypeScript** for the interactive interface
- **Custom static build pipeline** for prerendered HTML and optimized browser bundles
- **Tailwind CSS 4** and locally hosted fonts for the visual system
- **Lucide** icons and locally stored project and technology artwork
- **GitHub Actions and GitHub Pages** for deployment

The production build prerenders the page, creates split JavaScript and minified CSS, and copies static assets into `dist/`.

## Run locally

Requires **Node.js 22.13 or newer** and **npm**.

```bash
npm ci
npm run dev
```

Open **http://127.0.0.1:5187**. The development command builds the site and serves the local static output. After making changes, run `npm run build` and refresh the browser.

```bash
npm run build      # Build the production site into dist/
npm start          # Serve the existing dist/ build locally
npm run typecheck  # Check TypeScript
npm run lint       # Run ESLint
```

## Update the content

| File | Purpose |
| --- | --- |
| `data/profile.ts` | Name, headline, biography, links, and SEO copy |
| `data/projects.ts` | Project descriptions, technologies, links, and case studies |
| `data/content.ts` | Skills, experience, services, and testimonials |
| `data/contact.ts` | Contact form endpoint configuration |
| `components/portfolio/` | Navigation, hero, projects, sections, and interactions |
| `app/globals.css` | Shared design tokens, typography, layout, and theme styling |
| `public/` | Fonts, icons, images, and other static assets |

Add real project media under `public/projects/`, then reference it from the matching project record. Keep project facts, dates, outcomes, and links accurate; leave unknown details unset.

The contact form submits to the configured Formspree endpoint. The site does not maintain its own submission database.

## Accessibility and motion

- Semantic headings, a skip link, and visible keyboard focus states
- Keyboard-accessible navigation and project details
- Responsive mobile navigation and touch-friendly controls
- Reduced-motion support for both the operating-system preference and the site control
- Decorative motion that stays separate from essential content

## Deploy

Push to `main` to trigger the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`. The workflow installs dependencies, runs type checking and linting, builds the static site, prepares the GitHub Pages asset paths, and deploys `dist/`.

The configured Pages address is **https://talhamumtaz26.github.io/Portofolio/**. Update `profile.siteUrl` in `data/profile.ts` if deploying to a different canonical domain.

## Contact

- **Email:** [talhamalik2604@gmail.com](mailto:talhamalik2604@gmail.com)
- **GitHub:** [@talhamumtaz26](https://github.com/talhamumtaz26)
- **LinkedIn:** [Muhammad Talha Mumtaz](https://www.linkedin.com/in/muhammad-talha-mumtaz/)

---

<div align="center">

Designed and built by **Talha Mumtaz** · Karachi, Pakistan

</div>
