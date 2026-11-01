import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useWebGL } from '../hooks/useWebGL';

function TrophyModel() {
  const trophyRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (trophyRef.current) {
      trophyRef.current.rotation.y = t * 0.45;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.4;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={trophyRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Chalice Cup */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[1.1, 0.4, 1.4, 32, 1, true]} />
          <meshPhysicalMaterial
            color="#FFD700"
            emissive="#FFA500"
            emissiveIntensity={0.2}
            metalness={0.95}
            roughness={0.15}
            clearcoat={1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Central Star Gem */}
        <mesh position={[0, 0.6, 0]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshPhysicalMaterial
            color="#35D5FF"
            emissive="#35D5FF"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Trophy Stem */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.7, 16]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Pedestal Base */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.8, 0.9, 0.35, 32]} />
          <meshStandardMaterial color="#171328" metalness={0.8} roughness={0.4} />
        </mesh>
      </Float>

      {/* Orbiting Ring */}
      <group ref={ringRef} position={[0, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[1.7, 0.02, 16, 64]} />
          <meshBasicMaterial color="#35D5FF" />
        </mesh>
      </group>

      <Sparkles count={40} scale={4} size={2} color="#FFD700" opacity={0.7} />
      <Sparkles count={30} scale={3} size={2.5} color="#35D5FF" opacity={0.7} />
    </group>
  );
}

export default function TrophyScene() {
  const isWebGLSupported = useWebGL();

  if (!isWebGLSupported) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#FFD700] to-[#743BFF] flex items-center justify-center shadow-glow-purple">
          <span className="font-heading font-black text-2xl text-white">🏆</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] select-none pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFD700]/10 via-transparent to-transparent rounded-full blur-2xl" />
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[4, 5, 4]} intensity={2.2} color="#FFFFFF" />
          <pointLight position={[-4, -2, -2]} intensity={2.5} color="#35D5FF" />
          <pointLight position={[3, 2, 2]} intensity={2} color="#FFA500" />
          <TrophyModel />
        </Suspense>
      </Canvas>
    </div>
  );
}

