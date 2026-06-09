import React, { useState } from 'react';

interface NavigationProps {
  onNavigate: (id: string) => void;
}

const Navigation: React.FC<NavigationProps> = React.memo(function Navigation({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'MISSION', id: 'mission' },
    { label: 'TOOLS', id: 'tools' },
    { label: 'OPERATORS', id: 'operators' },
  ];

  const handleClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] h-14 flex items-center px-6"
      style={{
        background: 'rgba(10, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 7, 58, 0.1)',
      }}
    >
      <div className="max-w-[1100px] mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/redparakeet.png"
            alt=""
            className="w-5 h-5 object-cover rounded-sm"
            style={{
              filter: 'brightness(0) saturate(100%) invert(19%) sepia(100%) saturate(5000%) hue-rotate(340deg) brightness(1.1)',
            }}
          />
          <span className="font-body text-sm uppercase tracking-[3px] text-scarlet">
            RED PARAKEET
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="font-body text-[13px] uppercase tracking-[2px] text-dim hover:text-scarlet transition-colors duration-300 bg-transparent border-none"
              data-cursor-hover
            >
              {link.label}
            </button>
          ))}
          <span
            className="font-body text-[10px] uppercase tracking-[1px] text-scarlet px-3 py-1 rounded-full status-pulse"
            style={{
              background: 'rgba(255, 7, 58, 0.1)',
              border: '1px solid rgba(255, 7, 58, 0.2)',
            }}
          >
            STATUS: ONLINE
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 bg-transparent border-none p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1px] bg-scarlet transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-5 h-[1px] bg-scarlet transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1px] bg-scarlet transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-14 left-0 right-0 md:hidden py-4 px-6 flex flex-col gap-4"
          style={{
            background: 'rgba(10, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid rgba(255, 7, 58, 0.1)',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className="font-body text-[13px] uppercase tracking-[2px] text-dim hover:text-scarlet transition-colors duration-300 bg-transparent border-none text-left"
            >
              {link.label}
            </button>
          ))}
          <span
            className="font-body text-[10px] uppercase tracking-[1px] text-scarlet px-3 py-1 rounded-full status-pulse self-start"
            style={{
              background: 'rgba(255, 7, 58, 0.1)',
              border: '1px solid rgba(255, 7, 58, 0.2)',
            }}
          >
            STATUS: ONLINE
          </span>
        </div>
      )}
    </nav>
  );
});

export default Navigation;
