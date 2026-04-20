import HeroSection from '../src/components/HeroSection';
import ProjectsSection from '../src/components/ProjectsSection';
import AboutSection from '../src/components/AboutSection';
import ContactSection from '../src/components/ContactSection';
import MusicToggle from '../src/components/MusicToggle';

export default function HomePage() {
  return (
    <main className="site-shell">
      <MusicToggle />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
