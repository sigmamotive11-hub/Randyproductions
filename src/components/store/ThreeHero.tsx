'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
  Sparkles,
  Trail,
  Stars,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

/* ───────────── GOLD ACCENT COLOR ───────────── */
const GOLD = new THREE.Color('#d4af37');
const DARK_RED = new THREE.Color('#8B1A1A');
const DRUM_SHELL = new THREE.Color('#6B0F0F');
const CREAM = new THREE.Color('#F5E6D3');
const BRASS = new THREE.Color('#C9A84C');

/* ═══════════════════════════════════════════════
   DRUM SHELL — Lathe geometry for barrel shape
   ═══════════════════════════════════════════════ */
function DrumShell() {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segments = 32;
    const height = 1.2;
    const baseRadius = 1.0;
    const bulge = 0.12; // barrel bulge

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = t * height - height / 2;
      // Barrel curve: wider in middle
      const bulgeFactor = 1 + bulge * Math.sin(t * Math.PI);
      const r = baseRadius * bulgeFactor;
      pts.push(new THREE.Vector2(r, y));
    }
    return pts;
  }, []);

  return (
    <mesh castShadow>
      <latheGeometry args={[points, 64]} />
      <meshPhysicalMaterial
        color={DRUM_SHELL}
        roughness={0.35}
        metalness={0.1}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        reflectivity={0.6}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   DRUM HEAD — Top & Bottom white/cream heads
   ═══════════════════════════════════════════════ */
function DrumHead({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[position[1] > 0 ? 0 : Math.PI, 0, 0]} castShadow receiveShadow>
      <circleGeometry args={[1.05, 64]} />
      <meshPhysicalMaterial
        color={CREAM}
        roughness={0.6}
        metalness={0.0}
        clearcoat={0.3}
        clearcoatRoughness={0.4}
        transmission={0.05}
        thickness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   DRUM RIM — Gold metallic rim on top & bottom
   ═══════════════════════════════════════════════ */
function DrumRim({ y }: { y: number }) {
  return (
    <mesh position={[0, y, 0]}>
      <torusGeometry args={[1.08, 0.045, 16, 100]} />
      <meshPhysicalMaterial
        color={BRASS}
        roughness={0.15}
        metalness={0.95}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        reflectivity={1}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   TENSION RODS — 8 gold rods around the drum
   ═══════════════════════════════════════════════ */
function TensionRods() {
  const rods = useMemo(() => {
    const items: JSX.Element[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * 1.14;
      const z = Math.sin(angle) * 1.14;
      items.push(
        <group key={i} position={[x, 0, z]}>
          {/* Rod shaft */}
          <mesh castShadow>
            <cylinderGeometry args={[0.018, 0.018, 1.3, 8]} />
            <meshPhysicalMaterial color={BRASS} roughness={0.15} metalness={0.95} clearcoat={1} />
          </mesh>
          {/* Top lug nut */}
          <mesh position={[0, 0.68, 0]}>
            <boxGeometry args={[0.08, 0.06, 0.08]} />
            <meshPhysicalMaterial color={BRASS} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Bottom lug nut */}
          <mesh position={[0, -0.68, 0]}>
            <boxGeometry args={[0.08, 0.06, 0.08]} />
            <meshPhysicalMaterial color={BRASS} roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      );
    }
    return items;
  }, []);

  return <group>{rods}</group>;
}

/* ═══════════════════════════════════════════════
   LUGS — Decorative mounting brackets
   ═══════════════════════════════════════════════ */
function Lugs() {
  const lugs = useMemo(() => {
    const items: JSX.Element[] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * 1.1;
      const z = Math.sin(angle) * 1.1;
      // Rotate lug to face outward
      const rotY = -angle;
      items.push(
        <group key={i} position={[x, 0, z]} rotation={[0, rotY, 0]}>
          {/* Lug body */}
          <mesh castShadow>
            <boxGeometry args={[0.12, 0.22, 0.06]} />
            <meshPhysicalMaterial color={BRASS} roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      );
    }
    return items;
  }, []);

  return <group>{lugs}</group>;
}

/* ═══════════════════════════════════════════════
   DECORATIVE INLAY — Gold stripe on the shell
   ═══════════════════════════════════════════════ */
function DecorativeInlay() {
  return (
    <group>
      {[0.0, 0.15, -0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[1.01 + Math.abs(y) * 0.08, 0.015, 12, 100]} />
          <meshPhysicalMaterial
            color={GOLD}
            roughness={0.1}
            metalness={1}
            emissive={GOLD}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════════════════════════════════════════════
   SNARE STRINGS (decorative) — Bottom details
   ═══════════════════════════════════════════════ */
function SnareStrings() {
  const strings = useMemo(() => {
    const items: JSX.Element[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 0.85;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      items.push(
        <mesh key={i} position={[x, -0.62, z]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.35, 4]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.3} />
        </mesh>
      );
    }
    return items;
  }, []);

  return <group>{strings}</group>;
}

/* ═══════════════════════════════════════════════
   COMPLETE DRUM MODEL — Assembles all parts
   ═══════════════════════════════════════════════ */
function DrumModel() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth continuous rotation
    groupRef.current.rotation.y = t * 0.5;
    // Gentle wobble / tilt
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 + 0.15;
    groupRef.current.rotation.z = Math.cos(t * 0.25) * 0.05;

    // Scale pulse on hover
    const targetScale = hovered ? 1.08 : 1.0;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.4}
      floatingRange={[-0.1, 0.1]}
    >
      <group
        ref={groupRef}
        scale={1.6}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Drum shell */}
        <DrumShell />

        {/* Drum heads */}
        <DrumHead position={[0, 0.615, 0]} />
        <DrumHead position={[0, -0.615, 0]} />

        {/* Gold rims */}
        <DrumRim y={0.6} />
        <DrumRim y={-0.6} />

        {/* Tension rods */}
        <TensionRods />

        {/* Lugs */}
        <Lugs />

        {/* Decorative inlay */}
        <DecorativeInlay />

        {/* Snare strings */}
        <SnareStrings />

        {/* Inner glow light inside the drum */}
        <pointLight position={[0, 0, 0]} color="#d4af37" intensity={2} distance={3} />
      </group>
    </Float>
  );
}

/* ═══════════════════════════════════════════════
   ORBITING RINGS — Sound wave visual
   ═══════════════════════════════════════════════ */
function OrbitingRing({ radius, speed, offset }: { radius: number; speed: number; offset: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.rotation.x = t;
    ref.current.rotation.z = t * 0.3;
    // Pulse scale
    const s = 1 + Math.sin(t * 2) * 0.05;
    ref.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 8, 200]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.2} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   FLOATING PARTICLES — Gold dust around drum
   ═══════════════════════════════════════════════ */
function GoldParticles() {
  const count = 150;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2.5 + Math.random() * 3;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.05;
    ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#d4af37"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════
   GLOW ORB — Animated light source
   ═══════════════════════════════════════════════ */
function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * 0.5) * 3;
    ref.current.position.y = Math.cos(t * 0.3) * 2;
    ref.current.position.z = Math.sin(t * 0.4) * 2;
    // Pulse material
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.15 + Math.sin(t * 2) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#d4af37" transparent opacity={0.2} />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════
   MOUSE REACTIVE CAMERA
   ═══════════════════════════════════════════════ */
function MouseCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.02;
    camera.position.y += (mouse.current.y * 0.4 + 0.5 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  // Track mouse position
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  return null;
}

/* ═══════════════════════════════════════════════
   SCENE — Main 3D Canvas
   ═══════════════════════════════════════════════ */
export default function ThreeHero() {
  return (
    <div className="absolute top-0 right-0 w-full h-full z-0">
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        {/* Camera */}
        <MouseCamera />

        {/* Lighting — dramatic studio setup */}
        <ambientLight intensity={0.3} />
        <spotLight
          position={[8, 12, 5]}
          angle={0.3}
          penumbra={0.8}
          intensity={3}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-6, 8, -4]}
          angle={0.4}
          penumbra={0.5}
          intensity={1.5}
          color="#d4af37"
        />
        <spotLight
          position={[0, -5, 6]}
          angle={0.5}
          penumbra={0.7}
          intensity={1}
          color="#4a3080"
        />
        <pointLight position={[-10, 0, -5]} intensity={0.8} color="#d4af37" />
        <pointLight position={[5, -3, 5]} intensity={0.5} color="#ffffff" />

        {/* Drum */}
        <DrumModel />

        {/* Orbiting rings */}
        <OrbitingRing radius={2.2} speed={0.3} offset={0} />
        <OrbitingRing radius={2.6} speed={0.2} offset={1} />
        <OrbitingRing radius={3.0} speed={0.15} offset={2} />

        {/* Floating particles */}
        <GoldParticles />
        <Sparkles count={80} scale={6} size={1.5} speed={0.3} color="#d4af37" opacity={0.4} />

        {/* Glow orb */}
        <GlowOrb />

        {/* Background stars */}
        <Stars radius={15} depth={50} count={1000} factor={2} saturation={0} fade speed={0.5} />

        {/* Environment for reflections */}
        <Environment preset="night" />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.6}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0005, 0.0005)}
          />
          <Vignette
            offset={0.3}
            darkness={0.7}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
