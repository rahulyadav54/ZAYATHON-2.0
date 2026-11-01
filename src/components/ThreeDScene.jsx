import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGL } from '../hooks/useWebGL';

/**
 * High-tech Crystalline Core & Orbital Gyroscope
 */
function FuturisticCore({ pointer }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Subtle mouse responsive tilt with smooth damping
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.current.x * 0.4 + t * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.current.y * 0.35 + Math.sin(t * 0.4) * 0.1,
        0.05
      );
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.3;
      innerRef.current.rotation.y = t * 0.4;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.25;
      ring1Ref.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.35;
      ring2Ref.current.rotation.z = Math.cos(t * 0.3) * 0.25;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.2;
      ring3Ref.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Floating Polyhedron (Crystal Core) */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={innerRef} scale={1.35}>
          <octahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            color="#9B70FF"
            emissive="#35D5FF"
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>
        
        {/* Inner Glowing Core */}
        <mesh scale={0.75}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#35D5FF"
            wireframe={true}
            transparent={true}
            opacity={0.6}
          />
        </mesh>
      </Float>

      {/* Primary Orbital Gyroscopic Ring */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[2.2, 0.022, 16, 100]} />
          <meshStandardMaterial
            color="#35D5FF"
            emissive="#35D5FF"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Secondary Tilted Violet Ring */}
      <group ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.55, 0.02, 16, 100]} />
          <meshStandardMaterial
            color="#743BFF"
            emissive="#9B70FF"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Tertiary Outer Segmented Ring */}
      <group ref={ring3Ref} rotation={[-Math.PI / 4, 0, Math.PI / 4]}>
        <mesh>
          <torusGeometry args={[2.85, 0.015, 12, 80]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#9B70FF"
            emissiveIntensity={0.5}
            wireframe={true}
          />
        </mesh>
      </group>

      {/* Floating Holographic Node Points */}
      <Sparkles
        count={50}
        scale={6}
        size={3}
        speed={0.4}
        color="#35D5FF"
        opacity={0.8}
      />
      <Sparkles
        count={60}
        scale={5}
        size={2.5}
        speed={0.3}
        color="#9B70FF"
        opacity={0.7}
      />
    </group>
  );
}

/**
 * WebGL Graceful Fallback Component (CSS 3D Hologram)
 */
function FallbackHeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#743BFF]/30 to-[#35D5FF]/30 blur-3xl animate-pulse" />
      <div className="relative z-10 w-64 h-64 border border-[#35D5FF]/40 rounded-full flex items-center justify-center animate-[spin_12s_linear_infinite]">
        <div className="w-52 h-52 border border-[#9B70FF]/50 border-dashed rounded-full flex items-center justify-center animate-[spin_18s_linear_infinite_reverse]">
          <div className="w-36 h-36 bg-gradient-to-br from-[#35D5FF] via-[#9B70FF] to-[#743BFF] rotate-45 rounded-2xl shadow-glow-purple flex items-center justify-center">
            <div className="text-center font-mono text-xs text-white font-bold tracking-widest">
              ZAYATHON<br />2.0
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThreeDScene() {
  const isWebGLSupported = useWebGL();
  const pointerRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    pointerRef.current = {
      x: (clientX / innerWidth) * 2 - 1,
      y: (clientY / innerHeight) * 2 - 1
    };
  };

  if (!isWebGLSupported) {
    return <FallbackHeroVisual />;
  }

  return (
    <div 
      className="relative w-full h-[450px] sm:h-[500px] lg:h-[600px] select-none cursor-grab active:cursor-grabbing"
      onPointerMove={handlePointerMove}
    >
      {/* Ambient background glow behind 3D Canvas */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] bg-gradient-to-tr from-[#743BFF]/30 via-[#35D5FF]/20 to-[#9B70FF]/30 rounded-full blur-[90px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 6], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFFFFF" />
          <pointLight position={[-6, -4, -4]} intensity={2.5} color="#35D5FF" />
          <pointLight position={[6, -3, 3]} intensity={2.8} color="#743BFF" />
          <pointLight position={[0, 4, -2]} intensity={2.0} color="#9B70FF" />

          <FuturisticCore pointer={pointerRef} />
        </Suspense>
      </Canvas>

      {/* Cyberpunk HUD Frame Accents */}
      <div className="absolute bottom-4 right-4 font-mono text-[11px] text-[#A5A0B5]/80 bg-[#171328]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#35D5FF] animate-ping" />
        <span>INTERACTIVE 3D ENGINE • R3F</span>
      </div>
    </div>
  );
}

