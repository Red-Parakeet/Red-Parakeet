import React from 'react';

const Footer: React.FC = React.memo(function Footer() {
  return (
    <footer
      className="py-10 px-6 md:px-8"
      style={{
        background: '#0a0000',
        borderTop: '1px solid rgba(255, 7, 58, 0.1)',
      }}
    >
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-body text-xs text-dim uppercase tracking-[1px]">
          &copy; 2026 RED PARAKEET CORE
        </span>
        <span className="font-body text-xs text-scarlet uppercase tracking-[1px] status-pulse">
          SYSTEM STATUS: ONLINE // ENGAGED
        </span>
      </div>
    </footer>
  );
});

export default Footer;
