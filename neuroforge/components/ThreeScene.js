import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene({ config }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050816');

    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const point = new THREE.PointLight(0x06b6d4, 1.3);
    point.position.set(5, 5, 5);
    scene.add(point);

    const objects = [];
    const objectDefs = config?.objects || [];

    objectDefs.forEach((objDef) => {
      let geometry;
      if (objDef.type === 'sphere') {
        geometry = new THREE.SphereGeometry(objDef.radius || 0.8, 32, 32);
      } else {
        const size = objDef.size || [1, 1, 1];
        geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
      }

      const material = new THREE.MeshStandardMaterial({
        color: objDef.color || '#6d28d9',
        metalness: 0.5,
        roughness: 0.2
      });

      const mesh = new THREE.Mesh(geometry, material);
      const pos = objDef.position || [0, 0, 0];
      mesh.position.set(pos[0], pos[1], pos[2]);
      scene.add(mesh);
      objects.push(mesh);
    });

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);

      const animDefs = config?.animations || [];
      animDefs.forEach((animDef) => {
        const target = objects[animDef.target];
        if (!target) return;
        const speed = animDef.speed || 0.01;
        if (animDef.type === 'rotateY') target.rotation.y += speed;
        if (animDef.type === 'rotateX') target.rotation.x += speed;
        if (animDef.type === 'floatY') target.position.y = Math.sin(Date.now() * speed) * 0.6;
      });

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      while (mount.firstChild) {
        mount.removeChild(mount.firstChild);
      }
      renderer.dispose();
    };
  }, [config]);

  return <div ref={mountRef} className="h-[380px] w-full overflow-hidden rounded-2xl border border-white/10" />;
}
