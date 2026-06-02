import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface SpecialtyCardProps {
  title: string;
  description: string;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = React.memo(function SpecialtyCard({
  title,
  description,
}) {
  return (
    <div
      className="specialty-card py-4 pl-5 opacity-0 transition-all duration-300"
      style={{
        borderLeft: '3px solid #ff073a',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = '#ff3333';
        e.currentTarget.style.boxShadow = '-3px 0 10px rgba(255, 7, 58, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = '#ff073a';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 className="font-display text-[1.1rem] text-crimson uppercase">{title}</h3>
      <p className="font-body text-sm text-silver leading-[1.6] mt-2">{description}</p>
    </div>
  );
});

const SpecialtiesSection: React.FC = React.memo(function SpecialtiesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.specialty-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('.specialties-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const specialties: SpecialtyCardProps[] = [
    {
      title: 'RED TEAMING',
      description:
        "Simulating persistent, multi-layered cyber-physical assessments mirroring sophisticated active threat groups. We don't just find vulnerabilities — we exploit them.",
    },
    {
      title: 'TOOLSMITHING',
      description:
        'Writing highly evasive payloads, tailor-made execution frameworks, and custom C2 automation nodes. Every tool is built from scratch for maximum effectiveness.',
    },
    {
      title: 'HARDWARE & AI',
      description:
        'Weaponizing custom physical HID payloads alongside architectural evaluation of machine learning targets. Bridging the gap between physical and digital attack surfaces.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="specialties"
      className="py-20 md:py-[120px] px-6 md:px-8"
      style={{
        background: '#0a0000',
        borderTop: '1px solid rgba(255, 7, 58, 0.08)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="[0x04]" title="CORE SPECIALTIES" />

        <div className="specialties-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map((s) => (
            <SpecialtyCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default SpecialtiesSection;
