import React from 'react';
import * as THREE from 'three';

interface DroneArmProps {
  armIndex: number;
  angle: number;
  armLength?: number;
  explodedOffset?: [number, number, number];
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
  children?: React.ReactNode;
}

export const DroneArm: React.FC<DroneArmProps> = ({
  armIndex,
  angle,
  armLength = 0.58,
  explodedOffset = [0, 0, 0],
  highlighted = false,
  opacity = 1.0,
  onSelect,
  children,
}) => {
  const armMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#0a0f1d',
    roughness: 0.3,
    metalness: 0.6,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: '#334155',
    roughness: 0.25,
    metalness: 0.85,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const escMat = new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  // Calculate tip coordinates
  const tipX = Math.cos(angle) * armLength;
  const tipZ = Math.sin(angle) * armLength;

  // Strobe LED colors based on standard aviation rules (Arm 0/1: Front Red, Arm 2/3: Right/Back Green, Arm 4/5: Left/Tail)
  const navColor = [0, 1].includes(armIndex) 
    ? '#ef4444' 
    : [2, 3].includes(armIndex) 
    ? '#10b981' 
    : '#00e5ff';

  return (
    <group 
      position={explodedOffset}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Carbon Fiber Tubular Arm (3K Twill Matte Weave, 16mm OD) */}
      <mesh
        position={[tipX * 0.52, 0.0, tipZ * 0.52]}
        rotation={[0, -angle + Math.PI / 2, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.010, 0.010, armLength * 0.74, 16]} />
        <primitive object={armMat} attach="material" />
      </mesh>

      {/* Arm Reinforcement Collar Rings */}
      <mesh
        position={[tipX * 0.24, 0.0, tipZ * 0.24]}
        rotation={[0, -angle + Math.PI / 2, 0]}
      >
        <cylinderGeometry args={[0.012, 0.012, 0.018, 16]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>
      <mesh
        position={[tipX * 0.82, 0.0, tipZ * 0.82]}
        rotation={[0, -angle + Math.PI / 2, 0]}
      >
        <cylinderGeometry args={[0.012, 0.012, 0.018, 16]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>

      {/* 2. On-Arm 60A DShot1200 Electronic Speed Controller (ESC) with Anodized Heatsink */}
      <group
        position={[tipX * 0.52, 0.015, tipZ * 0.52]}
        rotation={[0, -angle + Math.PI / 2, 0]}
      >
        {/* ESC Body */}
        <mesh castShadow>
          <boxGeometry args={[0.024, 0.012, 0.065]} />
          <primitive object={escMat} attach="material" />
        </mesh>
        {/* ESC Heatsink Fins */}
        {[-0.008, 0, 0.008].map((fx, fIdx) => (
          <mesh key={`fin-${fIdx}`} position={[fx, 0.008, 0]}>
            <boxGeometry args={[0.002, 0.006, 0.058]} />
            <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Silicone Motor Wires Routing */}
        <mesh position={[0, -0.007, 0.038]}>
          <cylinderGeometry args={[0.002, 0.002, 0.02, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.8} />
        </mesh>
        <mesh position={[-0.005, -0.007, 0.038]}>
          <cylinderGeometry args={[0.002, 0.002, 0.02, 8]} />
          <meshStandardMaterial color="#2563eb" roughness={0.8} />
        </mesh>
        <mesh position={[0.005, -0.007, 0.038]}>
          <cylinderGeometry args={[0.002, 0.002, 0.02, 8]} />
          <meshStandardMaterial color="#eab308" roughness={0.8} />
        </mesh>
      </group>

      {/* 3. Distal CNC Anodized Motor Mount Platform at Arm Tip */}
      <group position={[tipX, 0.0, tipZ]}>
        {/* Base bracket clamping the arm */}
        <mesh castShadow>
          <boxGeometry args={[0.046, 0.018, 0.046]} />
          <primitive object={aluminumMat} attach="material" />
        </mesh>
        {/* Circular motor platform plate */}
        <mesh position={[0, 0.012, 0]} castShadow>
          <cylinderGeometry args={[0.024, 0.024, 0.006, 20]} />
          <primitive object={aluminumMat} attach="material" />
        </mesh>
        {/* Navigation LED Strobe on Under-Mount */}
        <mesh position={[0, -0.014, 0]}>
          <sphereGeometry args={[0.006, 12, 12]} />
          <meshBasicMaterial color={navColor} />
        </mesh>
        <pointLight position={[0, -0.02, 0]} color={navColor} intensity={0.4} distance={0.6} />
      </group>

      {/* Nested components (Motor, Propeller, etc.) */}
      {children}
    </group>
  );
};
