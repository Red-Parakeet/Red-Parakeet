import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';
import TerminalManifesto from '@/components/TerminalManifesto';

gsap.registerPlugin(ScrollTrigger);

const MissionSection: React.FC = React.memo(function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      const paragraphs = content.querySelectorAll('.mission-paragraph');
      gsap.fromTo(
        paragraphs,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="py-[120px] px-6 md:px-8"
      style={{ background: '#0a0000' }}
    >
      <div ref={contentRef} className="max-w-[1100px] mx-auto">
        <SectionHeader label="[0x01]" title="MISSION PARAMETERS" />

        <div className="max-w-[700px]">
          <p className="mission-paragraph font-body text-base text-silver leading-[1.7] mb-6 opacity-0">
            Red Parakeet was born from a simple idea: two offensive security enthusiasts sitting
            across a table, fueled by cold coffee and an unshakeable belief that the security
            community deserved better tools. We were tired of proprietary black boxes, closed-source
            solutions, and an industry that gatekept knowledge behind paywalls. So we started building.
          </p>
          <p className="mission-paragraph font-body text-base text-silver leading-[1.7] mb-6 opacity-0">
            What began as late-night coding sessions quickly evolved into something bigger — a
            collective dedicated to creating open-source offensive security tools that serve the
            community. We believe that by sharing our research, our tools, and our methodologies, we
            make the entire digital ecosystem more resilient. Every tool we release is a commitment
            to transparency and a challenge to the status quo.
          </p>
        </div>

        <TerminalManifesto />
      </div>
    </section>
  );
});

export default MissionSection;
