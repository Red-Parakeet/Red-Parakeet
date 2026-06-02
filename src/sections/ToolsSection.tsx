import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

interface ToolCardProps {
  icon: string;
  name: string;
  status: string;
  statusType: 'active' | 'oss';
  description: string;
  linkText: string;
  linkHref: string;
}

const ToolCard: React.FC<ToolCardProps> = React.memo(function ToolCard({
  icon,
  name,
  status,
  statusType,
  description,
  linkText,
  linkHref,
}) {
  return (
    <div
      className="tool-card p-7 rounded border transition-all duration-300 hover:-translate-y-1 opacity-0"
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
      <div className="font-display text-2xl text-scarlet mb-3">{icon}</div>
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <h3 className="font-display text-xl text-crimson uppercase">{name}</h3>
        <span
          className="font-body text-[10px] uppercase tracking-[1px] px-2 py-0.5 rounded-sm"
          style={
            statusType === 'active'
              ? {
                  background: 'rgba(46, 160, 67, 0.1)',
                  color: '#3fb950',
                  border: '1px solid rgba(46, 160, 67, 0.2)',
                }
              : {
                  background: 'rgba(255, 7, 58, 0.1)',
                  color: '#ff073a',
                  border: '1px solid rgba(255, 7, 58, 0.2)',
                }
          }
        >
          {status}
        </span>
      </div>
      <p className="font-body text-[15px] text-silver leading-[1.6] mb-5">{description}</p>
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block font-body text-xs uppercase tracking-[1px] text-scarlet px-4 py-2 rounded border transition-all duration-200 hover:bg-scarlet hover:text-void"
        style={{ borderColor: '#ff073a' }}
        data-cursor-hover
      >
        {linkText}
      </a>
    </div>
  );
});

const ToolsSection: React.FC = React.memo(function ToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.tool-card');
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
            trigger: section.querySelector('.tools-grid'),
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const tools: ToolCardProps[] = [
    {
      icon: '[+]',
      name: 'NMAP HELIOS',
      status: 'ACTIVE DEPLOYMENT',
      statusType: 'active',
      description:
        'An advanced engineering project built around the Nmap-Helios core. Tailored for scalable XML visualization, visual attack mapping, and critical risk telemetry aggregation. Deploy, scan, visualize — all from a unified tactical interface.',
      linkText: 'LAUNCH INSTANCE',
      linkHref: 'https://nmaphelios.redparakeet.org',
    },
    {
      icon: '(oo)',
      name: 'PHANTOM SHELL',
      status: 'OSS / CORE',
      statusType: 'oss',
      description:
        'A lightweight, stealthy tactical command and control (C2) agent framework engineered specifically to evaluate internal detection baselines and bypass legacy defenses. Open-source and community-driven.',
      linkText: 'VIEW REPOSITORY',
      linkHref: 'https://github.com/Red-Parakeet/PhantomShell',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="tools"
      className="py-[120px] px-6 md:px-8"
      style={{
        background: '#0a0000',
        borderTop: '1px solid rgba(255, 7, 58, 0.08)',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <SectionHeader label="[0x02]" title="ACTIVE DEPLOYMENTS" />

        <div className="tools-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default ToolsSection;
