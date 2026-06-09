import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bullets = [
  {
    prefix: 'Transparency in Research',
    text: 'We release modular, transparent software nodes to strengthen global defense infrastructure.',
  },
  {
    prefix: 'Adaptive Methodology',
    text: 'Rigid checklists fail against real adversaries. We design tactics that adapt dynamically mid-engagement.',
  },
  {
    prefix: 'Continuous Prototyping',
    text: 'The barrier between a signature block and a zero-day is continuous, relentless iteration.',
  },
];

const TerminalManifesto: React.FC = React.memo(function TerminalManifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);
  const [headerText, setHeaderText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          // Type out header
          const fullText = '> cat manifesto.txt';
          let idx = 0;
          typingRef.current = true;

          const typeInterval = setInterval(() => {
            if (idx <= fullText.length) {
              setHeaderText(fullText.slice(0, idx));
              idx++;
            } else {
              clearInterval(typeInterval);
              typingRef.current = false;

              // Fade in bullets
              const bulletEls = bulletsRef.current?.querySelectorAll('.manifesto-bullet');
              if (bulletEls) {
                gsap.fromTo(
                  bulletEls,
                  { opacity: 0, x: -20 },
                  { opacity: 1, x: 0, duration: 0.5, stagger: 0.4, ease: 'power3.out' }
                );
              }
            }
          }, 50);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-10 p-6 rounded"
      style={{
        background: 'rgba(26, 5, 5, 0.8)',
        border: '1px solid rgba(255, 7, 58, 0.2)',
      }}
    >
      <div ref={headerRef} className="font-display text-sm text-scarlet mb-4">
        {headerText}
        <span style={{ opacity: showCursor && typingRef.current !== false ? 1 : 0 }}>_</span>
      </div>
      <div ref={bulletsRef} className="flex flex-col gap-4">
        {bullets.map((bullet, i) => (
          <div key={i} className="manifesto-bullet opacity-0">
            <span className="font-display text-sm text-scarlet mr-2">{'>>'}</span>
            <span className="font-body text-[15px] text-silver">
              <strong className="text-crimson">{bullet.prefix}</strong> — {bullet.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TerminalManifesto;
