import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PropellerProps {
  motorIndex: number;
  position: [number, number, number];
  rotationDirection: 'CW' | 'CCW';
  isFlying?: boolean;
  flightSpeedMultiplier?: number;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const Propeller: React.FC<PropellerProps> = ({
  motorIndex,
  position,
  rotationDirection,
  isFlying = false,
  flightSpeedMultiplier = 1.0,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const propGroupRef = useRef<THREE.Group>(null);
  const blurDiscRef = useRef<THREE.Mesh>(null);
  const isCW = rotationDirection === 'CW';
  const dirMultiplier = isCW ? -1 : 1;

  useFrame((_, delta) => {
    if (propGroupRef.current && isFlying) {
      // Rotate based on flight speed
      const spinSpeed = (isFlying ? 32 : 0) * flightSpeedMultiplier;
      propGroupRef.current.rotation.y += dirMultiplier * spinSpeed * delta;
    }
  });

  const carbonBladeMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#38bdf8' : '#0a0e1a',
    roughness: 0.25,
    metalness: 0.65,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const tipStripeMat = new THREE.MeshBasicMaterial({
    color: isCW ? '#00e5ff' : '#f97316',
    transparent: opacity < 1,
    opacity: opacity * 0.9,
  });

  return (
    <group 
      position={[position[0], position[1] + explodedOffsetY, position[2]]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Main Rotating Propeller Group */}
      <group ref={propGroupRef} position={[0, 0.065, 0]}>
        {/* Central Carbon Propeller Hub */}
        <mesh castShadow>
          <cylinderGeometry args={[0.014, 0.015, 0.012, 20]} />
          <primitive object={carbonBladeMat} attach="material" />
        </mesh>

        {/* 2-Blade Aerodynamic Carbon Fiber Propeller (Length: 0.38m span) */}
        {[-1, 1].map((dir) => (
          <group key={`blade-${dir}`} rotation={[0, dir === 1 ? 0 : Math.PI, 0]}>
            {/* Inner Root Section */}
            <mesh position={[0.045, 0.002, 0]} rotation={[0.15 * dirMultiplier, 0, 0]} castShadow>
              <boxGeometry args={[0.065, 0.004, 0.024]} />
              <primitive object={carbonBladeMat} attach="material" />
            </mesh>
            {/* Mid-Span Airfoil Section */}
            <mesh position={[0.105, 0.003, 0]} rotation={[0.08 * dirMultiplier, 0, 0]} castShadow>
              <boxGeometry args={[0.075, 0.003, 0.022]} />
              <primitive object={carbonBladeMat} attach="material" />
            </mesh>
            {/* Outer Tapered Tip Section */}
            <mesh position={[0.160, 0.003, 0]} rotation={[0.03 * dirMultiplier, 0, 0]} castShadow>
              <boxGeometry args={[0.048, 0.0025, 0.017]} />
              <primitive object={carbonBladeMat} attach="material" />
            </mesh>
            {/* High-Visibility Tip Safety Stripe */}
            <mesh position={[0.180, 0.0035, 0]}>
              <boxGeometry args={[0.008, 0.003, 0.016]} />
              <primitive object={tipStripeMat} attach="material" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 2. Semi-Transparent Motion Blur Disc (Active during high-speed rotation in flight) */}
      {isFlying && (
        <mesh ref={blurDiscRef} position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.03, 0.19, 32]} />
          <meshBasicMaterial 
            color={isCW ? '#00e5ff' : '#f97316'} 
            opacity={0.08} 
            transparent 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}
    </group>
  );
};
