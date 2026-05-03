'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Cylinder, Torus } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Drum3D() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Drum Body */}
      <Cylinder args={[1.5, 1.5, 1.2, 32]}>
        <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.5} />
      </Cylinder>
      {/* Top Rim */}
      <Torus args={[1.52, 0.08, 16, 100]} position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
      </Torus>
      {/* Bottom Rim */}
      <Torus args={[1.52, 0.08, 16, 100]} position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
      </Torus>
      {/* Tension Rods */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.55;
        const z = Math.sin(angle) * 1.55;
        return (
          <Cylinder key={i} args={[0.03, 0.03, 1.2, 8]} position={[x, 0, z]}>
            <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.8} />
          </Cylinder>
        );
      })}
      {/* Drumsticks */}
      <Cylinder args={[0.04, 0.04, 2.5, 16]} position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
        <meshStandardMaterial color="#8b6508" roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.04, 0.04, 2.5, 16]} position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
        <meshStandardMaterial color="#8b6508" roughness={0.6} />
      </Cylinder>
    </group>
  );
}

export default function ThreeHero() {
  return (
    <div className="absolute top-0 right-[-5%] w-[60%] h-full z-0 hidden md:block">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#d4af37" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
        <Drum3D />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
