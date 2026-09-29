import React from 'react';
import * as THREE from 'three';

interface PayloadBodyProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const PayloadBody: React.FC<PayloadBodyProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const fuselageMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#38bdf8' : '#0f172a',
    roughness: 0.25,
    metalness: 0.75,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: '#00e5ff',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Main Aerodynamic Fuselage Pod (Smooth curves enclosing central electronics & battery) */}
      {/* Upper Canopy Dome */}
      <mesh position={[0, 0.045, 0.01]} scale={[1.05, 0.65, 1.4]} castShadow receiveShadow>
        <sphereGeometry args={[0.15, 32, 24]} />
        <primitive object={fuselageMat} attach="material" />
      </mesh>

      {/* Lower Payload Pod Belly */}
      <mesh position={[0, -0.045, 0.01]} scale={[0.98, 0.65, 1.35]} castShadow receiveShadow>
        <sphereGeometry args={[0.145, 32, 24]} />
        <primitive object={fuselageMat} attach="material" />
      </mesh>

      {/* 2. Aerodynamic Nose Cone (Front curvature) */}
      <mesh position={[0, 0.002, 0.175]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.0, 0.8, 1.0]} castShadow>
        <cylinderGeometry args={[0.08, 0.02, 0.07, 24]} />
        <primitive object={fuselageMat} attach="material" />
      </mesh>

      {/* 3. Tapered Rear Airfoil Section */}
      <mesh position={[0, 0.002, -0.17]} rotation={[Math.PI / 2, 0, 0]} scale={[0.85, 0.75, 1.0]} castShadow>
        <cylinderGeometry args={[0.075, 0.025, 0.08, 24]} />
        <primitive object={fuselageMat} attach="material" />
      </mesh>

      {/* 4. AURIS Rescue Accent Stripes & Trim */}
      <mesh position={[0, 0.088, 0.01]}>
        <boxGeometry args={[0.008, 0.003, 0.22]} />
        <primitive object={accentMat} attach="material" />
      </mesh>

      {/* Left/Right Side Pinstripes */}
      <mesh position={[-0.142, 0.01, 0.01]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.003, 0.006, 0.19]} />
        <primitive object={accentMat} attach="material" />
      </mesh>
      <mesh position={[0.142, 0.01, 0.01]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.003, 0.006, 0.19]} />
        <primitive object={accentMat} attach="material" />
      </mesh>

      {/* 5. NACA Cooling Airflow Intake Louvers for Internal Pi 5 & AI HAT+ NPU */}
      {[-0.05, 0.05].map((lx, lIdx) => (
        <group key={`intake-${lIdx}`} position={[lx, 0.065, 0.06]} rotation={[-0.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.022, 0.006, 0.035]} />
            <meshStandardMaterial color="#020617" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.004, 0]}>
            <boxGeometry args={[0.024, 0.002, 0.004]} />
            <primitive object={accentMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* 6. AURIS Wordmark Emblem Plate */}
      <group position={[0, 0.078, -0.06]} rotation={[-0.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.085, 0.004, 0.035]} />
          <meshStandardMaterial color="#020617" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Subtle glowing badge indicator */}
        <mesh position={[0, 0.003, 0]}>
          <boxGeometry args={[0.075, 0.001, 0.024]} />
          <meshBasicMaterial color="#00e5ff" opacity={0.7} transparent />
        </mesh>
      </group>

      {/* 7. Quick-Release Service Latches (for battery swap in < 15 seconds) */}
      {[-0.13, 0.13].map((cx, cIdx) => (
        <mesh key={`latch-${cIdx}`} position={[cx, -0.03, 0]} castShadow>
          <boxGeometry args={[0.008, 0.018, 0.028]} />
          <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
};
