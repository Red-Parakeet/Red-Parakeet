import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionHeaderProps {
  label: string;
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = React.memo(function SectionHeader({ label, title }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const labelEl = labelRef.current;
    const titleEl = titleRef.current;
    const dividerEl = dividerRef.current;
    if (!container || !labelEl || !titleEl || !dividerEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });

      // Label glow in
      tl.fromTo(
        labelEl,
        { opacity: 0, textShadow: '0 0 0px rgba(255, 7, 58, 0)' },
        { opacity: 1, textShadow: '0 0 15px rgba(255, 7, 58, 0.6)', duration: 0.8, ease: 'power3.out' }
      );

      // Title character reveal
      const chars = titleEl.querySelectorAll('.char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.03, ease: 'power3.out' },
        '-=0.4'
      );

      // Divider grow
      tl.fromTo(
        dividerEl,
        { width: '0%' },
        { width: '100%', duration: 0.8, ease: 'power2.inOut' },
        '-=0.3'
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Split title into characters
  const titleChars = title.split('').map((char, i) => (
    <span key={i} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div ref={containerRef}>
      <h2 className="font-display text-[clamp(1.5rem,4vw,2.5rem)] uppercase text-crimson tracking-[0.1em]">
        <span ref={labelRef} className="text-scarlet mr-3" style={{ fontSize: '0.5em', verticalAlign: 'middle' }}>
          {label}
        </span>
        <span ref={titleRef} className="inline-block">
          {titleChars}
        </span>
      </h2>
      <div
        ref={dividerRef}
        className="h-[1px] mt-6 mb-6"
        style={{ background: 'rgba(255, 7, 58, 0.15)', width: '0%' }}
      />
    </div>
  );
});

export default SectionHeader;
