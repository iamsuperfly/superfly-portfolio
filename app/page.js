import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import MusicToggle from '@/components/MusicToggle';

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
