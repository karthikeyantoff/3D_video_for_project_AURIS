import React from 'react';
import * as THREE from 'three';

interface GPSCompassProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const GPSCompass: React.FC<GPSCompassProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const domeMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#38bdf8' : '#0f172a',
    roughness: 0.25,
    metalness: 0.8,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const carbonMat = new THREE.MeshStandardMaterial({
    color: '#020617',
    roughness: 0.3,
    metalness: 0.5,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const aluminumMat = new THREE.MeshStandardMaterial({
    color: '#334155',
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
      {/* 1. CNC Aluminum Folding Mast Base Mount (Attached to Upper Frame Plate) */}
      <mesh position={[0, 0.056, -0.09]} castShadow>
        <boxGeometry args={[0.024, 0.012, 0.024]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>

      {/* 2. Carbon Fiber Elevated Isolation Mast (90mm Height to clear Motor/ESC EMI) */}
      <mesh position={[0, 0.105, -0.09]} castShadow>
        <cylinderGeometry args={[0.004, 0.004, 0.095, 12]} />
        <primitive object={carbonMat} attach="material" />
      </mesh>

      {/* 3. Multi-GNSS RTK / Compass Puck Dome (Here3+ / u-blox ZED-F9P Module) */}
      <group position={[0, 0.158, -0.09]}>
        {/* Lower Puck Housing Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.028, 0.030, 0.012, 24]} />
          <primitive object={domeMat} attach="material" />
        </mesh>

        {/* Upper Curved Ceramic Patch Antenna Radome */}
        <mesh position={[0, 0.007, 0]} castShadow>
          <sphereGeometry args={[0.028, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <primitive object={domeMat} attach="material" />
        </mesh>

        {/* GPS Fixed Lock Status Notification LED Ring */}
        <mesh position={[0, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.027, 0.029, 24]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <pointLight position={[0, 0.01, 0]} color="#10b981" intensity={0.5} distance={0.5} />

        {/* Internal 3-Axis Electronic Magnetometer Chip Indicator */}
        <mesh position={[0, 0.018, 0]}>
          <boxGeometry args={[0.008, 0.002, 0.008]} />
          <meshStandardMaterial color="#00e5ff" metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
};
