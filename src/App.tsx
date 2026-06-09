import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/components/Navigation';
import CRTOverlay from '@/components/CRTOverlay';
import CustomCursor from '@/components/CustomCursor';
import HeroSection from '@/sections/HeroSection';
import MissionSection from '@/sections/MissionSection';
import ToolsSection from '@/sections/ToolsSection';
import OperatorsSection from '@/sections/OperatorsSection';
import SpecialtiesSection from '@/sections/SpecialtiesSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';

export default function App() {
  useLenis();

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <CustomCursor />
      <CRTOverlay />
      <Navigation onNavigate={handleNavigate} />

      <main className="relative">
        <HeroSection onNavigate={handleNavigate} />
        <MissionSection />
        <ToolsSection />
        <OperatorsSection />
        <SpecialtiesSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
