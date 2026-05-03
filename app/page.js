import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="site-shell">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
