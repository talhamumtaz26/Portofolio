import { Hero } from '@/components/portfolio/Hero';
import { Navbar } from '@/components/portfolio/Navbar';
import { Projects } from '@/components/portfolio/Projects';
import { About, Skills, Experience, Services, Testimonials, Contact, Footer } from '@/components/portfolio/Sections';
import { MotionSystem } from '@/components/portfolio/MotionSystem';
import { BackToTop } from '@/components/portfolio/BackToTop';
export default function Home() { return <><MotionSystem /><Navbar /><main id="main"><Hero /><About /><Skills /><Experience /><Projects /><Services /><Testimonials /><Contact /></main><Footer /><BackToTop /></>; }
