import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface OperatorCardProps {
  name: string;
  handle: string;
  role: string;
  description: string;
  github: string;
  linkedin: string;
}

const OperatorCard: React.FC<OperatorCardProps> = React.memo(function OperatorCard({
  name,
  handle,
  role,
  description,
  github,
  linkedin,
}) {
  return (
    <div
      className="operator-card p-7 rounded border transition-all duration-300 hover:-translate-y-1 opacity-0"
      style={{
        background: '#120202',
        borderColor: 'rgba(255, 7, 58, 0.12)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 7, 58, 0.4)';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 7, 58, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 7, 58, 0.12)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display text-xl text-crimson uppercase">{name}</h3>
          <div className="font-body text-[13px] text-scarlet mt-0.5">@{handle}</div>
        </div>
        <span
          className="font-body text-[10px] uppercase tracking-[1px] px-2 py-0.5 rounded-sm shrink-0"
          style={{
            background: 'rgba(255, 7, 58, 0.1)',
            color: '#ff073a',
            border: '1px solid rgba(255, 7, 58, 0.2)',
          }}
        >
          {role}
        </span>
      </div>
      <p className="font-body text-[15px] text-silver leading-[1.6] mt-4">{description}</p>
      <div
        className="flex gap-4 mt-5 pt-4"
        style={{ borderTop: '1px solid rgba(255, 7, 58, 0.08)' }}
      >
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim hover:text-scarlet transition-colors duration-200"
          aria-label="GitHub"
          data-cursor-hover
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-dim hover:text-scarlet transition-colors duration-200"
          aria-label="LinkedIn"
          data-cursor-hover
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
      </div>
    </div>
  );
});

const OperatorsSection: React.FC = React.memo(function OperatorsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.operator-card');
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
            trigger: section.querySelector('.operators-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const operators: OperatorCardProps[] = [
    {
      name: 'Mel Adrien Lawrence Enzo Dodin',
      handle: 'Kidpentester',
      role: 'CO-FOUNDER',
      description:
        'Focused on the digital and psychological edge of offensive operations. Expert in advanced physical breach tactics, vishing, and high-conversion smishing/phishing campaigns. On the terminal, he engineers the raw software backing the attack—specializing in custom payload development, low-level weaponized tools, and leveraging adversarial AI to break modern defensive configurations.',
      github: 'https://github.com/Arilaw',
      linkedin: 'https://www.linkedin.com/in/dodin-mel-adrien-lawrence-enzo-5568b91b5/',
    },
    {
      name: 'Prajesh Rajcoomar',
      handle: 'The-Psypher',
      role: 'CO-FOUNDER',
      description:
        'Focused on the physical and mechanical execution of close-access operations. Alongside sharp social engineering and physical intrusion skills, he bridges the gap between hardware and software. Prajesh fabricates hyper-stealthy field implants, custom HID devices, and weaponized microcontrollers, using offensive AI to make physical delivery mechanisms completely invisible to defensive sensors.',
      github: 'https://github.com/The-Psypher',
      linkedin: 'https://www.linkedin.com/in/prajesh-rajcoomar-140a693b5/?skipRedirect=true',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="operators"
      className="py-[120px] px-6 md:px-8"
      style={{
        background: '#0a0000',
        borderTop: '1px solid rgba(255, 7, 58, 0.08)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="[0x03]" title="ACTIVE THREAT ACTORS" />

        <div className="operators-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {operators.map((op) => (
            <OperatorCard key={op.name} {...op} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default OperatorsSection;
