import React, { useEffect, useState } from 'react';
import ParticleNetwork from '@/components/ParticleNetwork';
import Parakeet3D from '@/components/Parakeet3D';
import TypingAnimation from '@/components/TypingAnimation';

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = React.memo(function HeroSection({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-end overflow-hidden"
      style={{ paddingBottom: '10vh' }}
    >
      {/* Particle network background */}
      <ParticleNetwork />

      {/* 3D Parakeet Logo */}
      <Parakeet3D />

      {/* Hero content */}
      <div className="relative z-10 text-center px-4">
        <h1
          className="font-display uppercase text-[clamp(3rem,8vw,6rem)] text-crimson tracking-[0.15em] text-glow-red"
        >
          RED PARAKEET
        </h1>
        <p className="font-body text-base text-silver tracking-[2px] uppercase mt-2">
          Adversarial Simulation & Open-Source Toolsmithing
        </p>
        <div className="mt-4 flex justify-center">
          <TypingAnimation />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => onNavigate('mission')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 bg-transparent border-none opacity-0 transition-opacity duration-500"
        style={{ opacity: scrolled ? 0 : 0.7 }}
        data-cursor-hover
      >
        <span className="font-body text-[10px] tracking-[2px] text-dim uppercase">
          SCROLL TO INITIALIZE
        </span>
        <svg
          className="bounce-indicator"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path d="M1 1L6 6L11 1" stroke="#6b6b6b" strokeWidth="1.5" />
        </svg>
      </button>
    </section>
  );
});

export default HeroSection;
