export type AboutStat = { value: string; label: string };
export const aboutStats: AboutStat[] = [
    { value: '2+', label: 'Years in WordPress' },
    { value: '13+', label: 'Storefronts managed' },
    { value: '5+', label: 'Years in customer service' },
];
export type AboutNowItem = { label: string; value: string };
export const aboutNowItems: AboutNowItem[] = [
    { label: 'BUILDING', value: 'Watchly, weather app' },
    { label: 'LEARNING', value: 'Python, TypeScript' },
    { label: 'OPEN TO', value: 'freelance projects' },
];
export const skills = [
    { name: 'Web & frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive Web Design'] },
    { name: 'WordPress & commerce', items: ['WordPress', 'WooCommerce', 'Shopify', 'Elementor', 'Astra', 'PHP', 'Theme customization', 'Plugin configuration', 'SEO implementation'] },
    { name: 'Programming', items: ['Python', 'C++', 'TypeScript'] },
    { name: 'Mobile & backend', items: ['React Native', 'Capacitor', 'Firebase', 'Node.js'] },
    { name: 'AI & integrations', items: ['AI integrations', 'REST APIs', 'AI-assisted development'] },
    { name: 'Design', items: ['Figma'] },
    { name: 'Tools & workflow', items: ['Git', 'GitHub', 'Linux', 'VS Code'] },
    { name: 'How I build', items: ['Project Development', 'Web performance', 'E-commerce systems', 'Problem Solving'] },
];
export type ExperienceItem = {
    label: 'FREELANCE' | 'WORK' | 'TEACHING' | 'EDUCATION';
    title: string;
    meta: string;
    description: string;
};

export const experienceItems: ExperienceItem[] = [
    {
        label: 'FREELANCE', title: 'WordPress Developer', meta: 'Self-employed · Jan 2024 – Present',
        description: 'Deliver WordPress and WooCommerce fixes, optimizations, and troubleshooting for independent clients, covering site performance, product pages, checkout flow, and SEO. Built a custom apparel store for La Casa De Fashion.',
    },
    {
        label: 'WORK', title: 'E-Commerce Specialist', meta: 'Ecombie · Nov 2025 – Jul 2026',
        description: 'Managed daily operations across 13+ online storefront accounts, covering pricing, listings, and fulfillment. Built SKU-level discount and profitability simulators in Google Sheets to track deal timing and catch margin errors before they hit revenue.',
    },
    {
        label: 'WORK', title: 'Administrator', meta: 'The Educators · Oct 2023 – Mar 2025',
        description: "Owned fee records and financial documentation for the school's account system over 18 months. Coordinated staff scheduling and documentation, and acted as the main contact between parents, teachers, and management.",
    },
    {
        label: 'TEACHING', title: 'Computer Teacher', meta: 'Adamjee Model School · Jan 2023 – Oct 2023',
        description: "Planned and delivered computer science lessons over a 10-month term. Set up and maintained the school's computer lab, keeping it documented for consistent class use.",
    },
    {
        label: 'WORK', title: 'Sales Assistant', meta: 'Sep 2018 – Sep 2023',
        description: 'Ran daily billing, cash handling, and sales transactions, and kept displays and inventory stocked across 5 years of direct customer work. Advised customers on product selection.',
    },
    {
        label: 'EDUCATION', title: 'BS Computer Science', meta: 'Virtual University of Pakistan · In progress',
        description: 'Coursework in C, C#, operating systems, and object-oriented programming.',
    },
];
export type ServiceItem = {
    title: string;
    description: string;
    icon: 'code' | 'bag' | 'bolt' | 'ai' | 'nodes' | 'support';
};
export const serviceItems: ServiceItem[] = [
    { title: 'WordPress development', description: 'Custom WordPress sites, themes, and plugins that are easy to manage.', icon: 'code' },
    { title: 'E-commerce development', description: 'WooCommerce and Shopify stores with clear product pages and a smooth checkout.', icon: 'bag' },
    { title: 'Speed & SEO optimization', description: 'Faster load times, responsive fixes, and technical SEO cleanup.', icon: 'bolt' },
    { title: 'AI-assisted app development', description: 'Web and mobile apps built quickly with AI tools, React, TypeScript, and Firebase.', icon: 'ai' },
    { title: 'AI & API integration', description: 'Connect your site or app to APIs and AI tools to automate useful tasks.', icon: 'nodes' },
    { title: 'Website maintenance & support', description: 'Bug fixes, updates, backups, and fast troubleshooting so your site stays running.', icon: 'support' },
];
export type Testimonial = {
    person: string;
    role: string;
    company: string;
    quote: string;
    avatar: string | null;
};
export const testimonials: Testimonial[] = [];

