import React from 'react';
import * as THREE from 'three';

interface LandingGearProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const LandingGear: React.FC<LandingGearProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const carbonMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#0f172a',
    roughness: 0.3,
    metalness: 0.6,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const aluminumJoinerMat = new THREE.MeshStandardMaterial({
    color: '#334155',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const rubberFootMat = new THREE.MeshStandardMaterial({
    color: '#020617',
    roughness: 0.9,
    metalness: 0.1,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* Dual Landing Skids (Left & Right Flanks) */}
      {[-0.18, 0.18].map((sideX, sideIdx) => (
        <group key={`skid-${sideIdx}`} position={[sideX, -0.22, 0]}>
          {/* 1. Main Horizontal Skid Tube (Carbon Fiber Tube 12mm OD) */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.007, 0.007, 0.54, 16]} />
            <primitive object={carbonMat} attach="material" />
          </mesh>

          {/* Front Upswept Ski Curve */}
          <group position={[0, 0.02, 0.27]} rotation={[-0.35, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.007, 0.007, 0.06, 16]} />
              <primitive object={carbonMat} attach="material" />
            </mesh>
            {/* Rubber End Cap */}
            <mesh position={[0, 0.035, 0]}>
              <sphereGeometry args={[0.008, 12, 12]} />
              <primitive object={rubberFootMat} attach="material" />
            </mesh>
          </group>

          {/* Rear Upswept Ski Curve */}
          <group position={[0, 0.02, -0.27]} rotation={[0.35, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.007, 0.007, 0.06, 16]} />
              <primitive object={carbonMat} attach="material" />
            </mesh>
            {/* Rubber End Cap */}
            <mesh position={[0, 0.035, 0]}>
              <sphereGeometry args={[0.008, 12, 12]} />
              <primitive object={rubberFootMat} attach="material" />
            </mesh>
          </group>

          {/* 2. Diagonal Vertical Struts Connecting to Lower Deck */}
          {/* Front Strut */}
          <group position={[0, 0.085, 0.14]} rotation={[0.32, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.006, 0.006, 0.18, 16]} />
              <primitive object={carbonMat} attach="material" />
            </mesh>
            {/* T-Joiner at Skid Junction */}
            <mesh position={[0, -0.09, 0]} castShadow>
              <boxGeometry args={[0.02, 0.016, 0.022]} />
              <primitive object={aluminumJoinerMat} attach="material" />
            </mesh>
          </group>

          {/* Rear Strut */}
          <group position={[0, 0.085, -0.14]} rotation={[-0.32, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.006, 0.006, 0.18, 16]} />
              <primitive object={carbonMat} attach="material" />
            </mesh>
            {/* T-Joiner at Skid Junction */}
            <mesh position={[0, -0.09, 0]} castShadow>
              <boxGeometry args={[0.02, 0.016, 0.022]} />
              <primitive object={aluminumJoinerMat} attach="material" />
            </mesh>
          </group>

          {/* Vibration-absorbing Silicone Rubber Ground Landing Pads */}
          <mesh position={[0, -0.008, 0.12]}>
            <boxGeometry args={[0.016, 0.006, 0.035]} />
            <primitive object={rubberFootMat} attach="material" />
          </mesh>
          <mesh position={[0, -0.008, -0.12]}>
            <boxGeometry args={[0.016, 0.006, 0.035]} />
            <primitive object={rubberFootMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* 3. Horizontal Reinforcement Crossbars between Left and Right Skids */}
      {[0.14, -0.14].map((zPos, zIdx) => (
        <mesh key={`crossbar-${zIdx}`} position={[0, -0.22, zPos]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.36, 12]} />
          <primitive object={carbonMat} attach="material" />
        </mesh>
      ))}
    </group>
  );
};
