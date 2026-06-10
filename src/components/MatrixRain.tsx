import React, { useEffect, useRef } from 'react';

const MatrixRain: React.FC = React.memo(function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let isActive = true;

    const latinAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const symbols = '{ } [ ] < > / \\ | = + - * & ^ % $ # @ ! ~';
    const katakana = '\u30A1\u30A2\u30A3\u30A4\u30A5\u30A8\u30A9\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3';
    const chars = latinAlpha + symbols + katakana;

    let columns = 0;
    let drops: number[] = [];
    let speeds: number[] = [];
    const cellWidth = 14;
    const cellHeight = 20;
    const trailLength = 15;

    const init = () => {
      const isMobile = window.innerWidth < 768;
      const fontSize = isMobile ? 12 : 16;
      const cw = isMobile ? 10 : cellWidth;

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.font = `${fontSize}px VT323, monospace`;
      ctx.textAlign = 'center';

      columns = Math.floor(canvas.width / cw);
      if (isMobile && columns > 80) columns = 80;

      drops = [];
      speeds = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -canvas.height;
        speeds[i] = 0.5 + Math.random() * 2;
      }
    };

    const draw = () => {
      if (!isActive) return;

      // Fade trail
      ctx.fillStyle = 'rgba(10, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const isMobile = window.innerWidth < 768;
      const cw = isMobile ? 10 : cellWidth;

      for (let i = 0; i < columns; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * cw + cw / 2;
        const y = drops[i];

        // Draw leading character (brightest)
        if (y > 0 && y < canvas.height + cellHeight) {
          ctx.fillStyle = '#ff073a';
          ctx.fillText(char, x, y);
        }

        // Draw trailing characters (dimmer)
        for (let t = 1; t <= trailLength; t++) {
          const trailY = y - t * cellHeight;
          if (trailY < 0) break;

          const opacity = Math.max(0, 0.4 - (t * 0.025));
          if (opacity <= 0) break;

          const trailChar = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(204, 0, 0, ${opacity})`;
          ctx.fillText(trailChar, x, trailY);
        }

        // Update column position
        drops[i] += speeds[i];

        // Reset column if off screen
        if (drops[i] > canvas.height + cellHeight * trailLength) {
          drops[i] = Math.random() * -100;
          speeds[i] = 0.5 + Math.random() * 2;
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    // Wait for fonts to be ready before initializing
    document.fonts.ready.then(() => {
      init();
      draw();
    });

    const onResize = () => {
      init();
    };

    window.addEventListener('resize', onResize);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
});

export default MatrixRain;
