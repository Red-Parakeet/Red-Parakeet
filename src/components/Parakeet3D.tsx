import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Parakeet3D: React.FC = React.memo(function Parakeet3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const cleanupFns: (() => void)[] = [];
    let rafId = 0;
    let isActive = true;

    const animate = (plane: THREE.Mesh) => {
      if (!isActive) return;
      const time = Date.now() * 0.001;
      plane.rotation.y = Math.sin(time * 0.5) * 0.15;
      plane.position.y = Math.sin(time * 0.5) * 0.3;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(() => animate(plane));
    };

    const setupScene = (tex?: THREE.Texture) => {
      let geometry: THREE.PlaneGeometry;
      let material: THREE.MeshBasicMaterial;

      if (tex) {
        geometry = new THREE.PlaneGeometry(2.2 * 0.85, 2.2);
        material = new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: 0.95,
          side: THREE.DoubleSide,
        });
      } else {
        geometry = new THREE.PlaneGeometry(2, 2.5);
        material = new THREE.MeshBasicMaterial({
          color: 0xff073a,
          transparent: true,
          opacity: 0.5,
        });
      }

      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
      animate(plane);
    };

    // Try loading the texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '/assets/redparakeet.png',
      (texture) => {
        if (isActive) setupScene(texture);
      },
      undefined,
      () => {
        if (isActive) setupScene();
      }
    );

    // Handle resize
    const onResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);
    cleanupFns.push(() => window.removeEventListener('resize', onResize));

    return () => {
      isActive = false;
      cancelAnimationFrame(rafId);
      cleanupFns.forEach((fn) => fn());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -55%)',
        width: '60vw',
        height: '50vh',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
});

export default Parakeet3D;
