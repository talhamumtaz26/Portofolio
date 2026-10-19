export type Project = {
    slug: string;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    image: string | null;
    gallery: {
        src: string;
        alt: string;
    }[];
    liveUrl: string | null;
    live?: string | null;
    githubUrl: string | null;
    featured: boolean;
    year: string | null;
    caseStudy: {
        overview: string;
        goal: string;
        technologies: readonly [string, string, string, string];
        built: string[];
        implementation: string | null;
        challenges: string | null;
        results: string | null;
    };
    accent: string;
    video?: string | null;
    showcaseScreenshot?: string | null;
    showcaseDimensions?: { width: number; height: number };
    videoDuration?: number;
    mobileScreenshot?: string | null;
    mobileVideo?: string | null;
};
export const projects: Project[] = [{ slug: 'la-casa-de-fashion', title: 'La Casa De Fashion', category: 'E-COMMERCE / WORDPRESS', description: 'A customized apparel store built around clothing that feels like you.', technologies: ['WordPress', 'WooCommerce', 'Elementor', 'Astra Pro'], image: null, showcaseScreenshot: '/projects/la-casa-de-fashion-fullpage.webp', showcaseDimensions: { width: 1024, height: 5539 }, gallery: [], liveUrl: null, githubUrl: null, featured: true, year: null, accent: '#9085df', caseStudy: { overview: 'A customized apparel e-commerce website focused on selling personalized and custom-designed clothing.', goal: 'An online storefront for personalized clothing and custom designs.', technologies: ['WordPress', 'WooCommerce', 'Elementor', 'Astra Pro'], built: ['WordPress and WooCommerce storefront', 'Elementor and Astra Pro customization', 'Product management and e-commerce implementation', 'Responsive design, SEO and performance optimization'], implementation: null, challenges: null, results: null } }, { slug: 'weatherwizard', title: 'WeatherWizard', category: 'FULL-STACK / WEB APPLICATION', description: 'A full-stack weather application connecting a React interface with Express and weather APIs.', technologies: ['React', 'Express', 'TypeScript', 'APIs', 'Capacitor'], image: null, showcaseScreenshot: '/projects/weatherwizard-fullpage.webp', showcaseDimensions: { width: 1024, height: 1868 }, gallery: [], liveUrl: 'https://weatherwizard-lyart.vercel.app/', githubUrl: 'https://github.com/talhamumtaz26/Weatherwizard', featured: false, year: null, accent: '#88b9d3', caseStudy: { overview: 'A full-stack weather application built with React, Express and TypeScript.', goal: 'Make weather information accessible through a connected web application.', technologies: ['React', 'Express', 'TypeScript', 'APIs'], built: ['Directed the build with AI development tools using React, Express, and TypeScript.', 'Managed the project from concept through deployment on Vercel.', 'Integrated weather APIs for live data.'], implementation: null, challenges: null, results: null } }, { slug: 'watchly', title: 'Watchly', category: 'MOBILE / API INTEGRATION', description: 'Discover your next watch. A movie and TV discovery and tracking application powered by TMDb.', technologies: ['React', 'TMDb API', 'Firebase', 'Capacitor', 'Mobile Development'], image: null, showcaseScreenshot: '/projects/watchly-fullpage.webp', showcaseDimensions: { width: 1024, height: 3443 }, gallery: [], liveUrl: 'https://watchly-1a156.web.app/', githubUrl: 'https://github.com/talhamumtaz26/Watchly', featured: false, year: null, accent: '#bcade0', caseStudy: { overview: 'A movie and TV discovery and tracking application built around the TMDb API.', goal: 'Bring movie discovery and watch tracking together in a mobile experience.', technologies: ['React', 'TMDb API', 'Firebase', 'Capacitor'], built: ['Directed the build with AI development tools using React, Capacitor, and Firebase.', 'Defined the product scope around discovery, tracking, and watchlist features.', 'Integrated the TMDb API for movie and TV data.'], implementation: null, challenges: null, results: null } }];
