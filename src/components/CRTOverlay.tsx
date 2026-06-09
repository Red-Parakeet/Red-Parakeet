import React from 'react';

const CRTOverlay: React.FC = React.memo(function CRTOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08) 1px, transparent 1px, transparent 2px)',
        }}
      />
      {/* Vignette + flicker */}
      <div
        className="absolute inset-0 flicker-crt"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(10, 0, 0, 0.4) 100%)',
        }}
      />
    </div>
  );
});

export default CRTOverlay;
