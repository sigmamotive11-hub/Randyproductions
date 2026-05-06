'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

/* ───────────── COLORS ───────────── */
const DRUM_SHELL = '#C8961E';
const DRUM_SHELL_DARK = '#9A7216';
const CREAM = '#F5E6D3';
const BRASS = '#D4AF37';
const GOLD = '#FFD700';

/* ═══════════════════════════════════════════════
   DRUM SHELL — Lathe geometry barrel shape
   ═══════════════════════════════════════════════ */
function DrumShell() {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segments = 32;
    const height = 1.2;
    const baseRadius = 1.0;
    const bulge = 0.12;

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = t * height - height / 2;
      const bulgeFactor = 1 + bulge * Math.sin(t * Math.PI);
      const r = baseRadius * bulgeFactor;
      pts.push(new THREE.Vector2(r, y));
    }
    return pts;
  }, []);

  return (
    <mesh>
      <latheGeometry args={[points, 64]} />
      <meshStandardMaterial
        color={DRUM_SHELL}
        roughness={0.28}
        metalness={0.65}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   DRUM HEAD — Cream top & bottom
   ═══════════════════════════════════════════════ */
function DrumHead({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]} rotation={y > 0 ? 0 : Math.PI}>
      <circleGeometry args={[1.05, 64]} />
      <meshStandardMaterial
        color={CREAM}
        roughness={0.6}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   DRUM RIM — Gold metallic torus
   ═══════════════════════════════════════════════ */
function DrumRim({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]}>
      <torusGeometry args={[1.08, 0.045, 16, 100]} />
      <meshStandardMaterial color={BRASS} roughness={0.12} metalness={0.95} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   TENSION RODS — 8 gold rods with lug nuts
   ═══════════════════════════════════════════════ */
function TensionRods() {
  return (
    <group>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.14;
        const z = Math.sin(angle) * 1.14;
        return (
          <group key={i} position={[x, 0, z]}>
            <mesh>
              <cylinderGeometry args={[0.018, 0.018, 1.3, 8]} />
              <meshStandardMaterial color={BRASS} roughness={0.12} metalness={0.95} />
            </mesh>
            <mesh position={[0, 0.68, 0]}>
              <boxGeometry args={[0.08, 0.06, 0.08]} />
              <meshStandardMaterial color={BRASS} roughness={0.15} metalness={0.9} />
            </mesh>
            <mesh position={[0, -0.68, 0]}>
              <boxGeometry args={[0.08, 0.06, 0.08]} />
              <meshStandardMaterial color={BRASS} roughness={0.15} metalness={0.9} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   LUGS — 8 mounting brackets
   ═══════════════════════════════════════════════ */
function Lugs() {
  return (
    <group>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.1;
        const z = Math.sin(angle) * 1.1;
        return (
          <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.12, 0.22, 0.06]} />
            <meshStandardMaterial color={BRASS} roughness={0.15} metalness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   DECORATIVE INLAY — 3 gold rings on shell
   ═══════════════════════════════════════════════ */
function DecorativeInlay() {
  return (
    <group>
      {[0.0, 0.15, -0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[1.01 + Math.abs(y) * 0.08, 0.015, 12, 100]} />
          <meshStandardMaterial color={GOLD} roughness={0.08} metalness={1} emissive={GOLD} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   SNARE STRINGS — 20 silver bottom strings
   ═══════════════════════════════════════════════ */
function SnareStrings() {
  return (
    <group>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const r = 0.85;
        return (
          <mesh key={i} position={[Math.cos(angle) * r, -0.62, Math.sin(angle) * r]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 0.35, 4]} />
            <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   COMPLETE DRUM — Spinning assembly (small scale)
   ═══════════════════════════════════════════════ */
function DrumModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Continuous spin
    groupRef.current.rotation.y = t * 0.5;
    // Gentle tilt
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08 + 0.15;
    groupRef.current.rotation.z = Math.cos(t * 0.25) * 0.04;

    // Hover scale
    const target = hovered ? 1.06 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
      <group
        ref={groupRef}
        scale={0.55}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <DrumShell />
        <DrumHead y={0.615} />
        <DrumHead y={-0.615} />
        <DrumRim y={0.6} />
        <DrumRim y={-0.6} />
        <TensionRods />
        <Lugs />
        <DecorativeInlay />
        <SnareStrings />
        <pointLight position={[0, 0, 0]} color="#d4af37" intensity={1.5} distance={3} />
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════
   ORBITING RINGS — Sound wave visualizers
   ═══════════════════════════════════════════════ */
function OrbitRing({ radius, speed, offset }: { radius: number; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.rotation.x = t;
    ref.current.rotation.z = t * 0.3;
    const s = 1 + Math.sin(t * 2) * 0.05;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.006, 8, 200]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.15} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   GOLD PARTICLES — Floating dust (subtle)
   ═══════════════════════════════════════════════ */
function GoldParticles() {
  const count = 60;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 1.5 + Math.random() * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#d4af37"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   MOUSE CAMERA — Subtle parallax
   ═══════════════════════════════════════════════ */
function MouseCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const rect = e.currentTarget as Document;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;

      camera.position.x += (x * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (y * 0.2 + 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [camera]);

  return null;
}

/* ═══════════════════════════════════════════════
   MAIN SCENE EXPORT — Contained, not full-screen
   ═══════════════════════════════════════════════ */
export default function ThreeHero() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.3, 4], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <MouseCamera />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} color="#FFD700" />
        <directionalLight position={[-3, 5, -3]} intensity={0.6} color="#ffffff" />
        <pointLight position={[0, 0, 0]} color="#d4af37" intensity={0.8} distance={6} />

        {/* Drum */}
        <DrumModel />

        {/* Orbit rings */}
        <OrbitRing radius={1.6} speed={0.3} offset={0} />
        <OrbitRing radius={1.9} speed={0.2} offset={1} />
        <OrbitRing radius={2.2} speed={0.15} offset={2} />

        {/* Particles */}
        <GoldParticles />
        <Sparkles count={30} scale={4} size={1.2} speed={0.3} color="#d4af37" opacity={0.2} />
      </Canvas>
    </div>
  );
}
