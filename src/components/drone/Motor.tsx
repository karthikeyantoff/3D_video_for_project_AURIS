import React from 'react';
import * as THREE from 'three';

interface MotorProps {
  motorIndex: number;
  position: [number, number, number];
  rotationDirection: 'CW' | 'CCW';
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const Motor: React.FC<MotorProps> = ({
  motorIndex,
  position,
  rotationDirection,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const isCW = rotationDirection === 'CW';
  const accentColor = isCW ? '#00e5ff' : '#f97316'; // Cyan for CW, Orange for CCW direction clarity

  const statorMat = new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.35,
    metalness: 0.8,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const rotorBellMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#38bdf8' : '#1e293b',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const copperMat = new THREE.MeshStandardMaterial({
    color: '#b45309', // Copper winding coils
    roughness: 0.4,
    metalness: 0.7,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const steelShaftMat = new THREE.MeshStandardMaterial({
    color: '#e2e8f0',
    roughness: 0.1,
    metalness: 0.98,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[position[0], position[1] + explodedOffsetY, position[2]]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Lower Stator Base Mounting Plate (Direct Mount to Arm Tip) */}
      <mesh position={[0, 0.016, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.024, 0.008, 24]} />
        <primitive object={statorMat} attach="material" />
      </mesh>

      {/* 2. Copper Stator Windings (12N14P configuration visible inside cooling windows) */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
        const theta = (idx * Math.PI) / 4;
        const wr = 0.014;
        return (
          <mesh
            key={`coil-${idx}`}
            position={[Math.cos(theta) * wr, 0.028, Math.sin(theta) * wr]}
          >
            <cylinderGeometry args={[0.0035, 0.0035, 0.014, 8]} />
            <primitive object={copperMat} attach="material" />
          </mesh>
        );
      })}

      {/* 3. Outer Anodized Aluminum Rotor Bell Housing (4108 380KV Brushless Outrunner) */}
      <mesh position={[0, 0.032, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.022, 24, 1, true]} />
        <primitive object={rotorBellMat} attach="material" />
      </mesh>

      {/* Top Cap of Rotor Bell with Radial Air Cooling Vents */}
      <mesh position={[0, 0.043, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.004, 24]} />
        <primitive object={rotorBellMat} attach="material" />
      </mesh>

      {/* Anodized Identification Ring (CW Cyan / CCW Orange) */}
      <mesh position={[0, 0.038, 0]}>
        <cylinderGeometry args={[0.0254, 0.0254, 0.004, 24]} />
        <meshBasicMaterial color={accentColor} />
      </mesh>

      {/* 4. Hardened 4mm Precision Steel Output Shaft */}
      <mesh position={[0, 0.052, 0]} castShadow>
        <cylinderGeometry args={[0.003, 0.003, 0.024, 16]} />
        <primitive object={steelShaftMat} attach="material" />
      </mesh>

      {/* 5. Knurled M6 Aluminum Self-Locking Propeller Hub Nut */}
      <mesh position={[0, 0.062, 0]} castShadow>
        <cylinderGeometry args={[0.007, 0.008, 0.010, 6]} />
        <meshStandardMaterial color={accentColor} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
};
