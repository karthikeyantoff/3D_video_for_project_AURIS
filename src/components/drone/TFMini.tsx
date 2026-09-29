import React from 'react';
import * as THREE from 'three';

interface TFMiniProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const TFMini: React.FC<TFMiniProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const sensorMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#020617',
    roughness: 0.25,
    metalness: 0.85,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const lensMat = new THREE.MeshStandardMaterial({
    color: '#38bdf8',
    roughness: 0.1,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. TFMini Plus Micro Sensor Housing (Compact 42x15x16mm module) */}
      <mesh position={[0, -0.01, 0]} castShadow>
        <boxGeometry args={[0.016, 0.018, 0.042]} />
        <primitive object={sensorMat} attach="material" />
      </mesh>

      {/* Optical Transmitter Lens (VCSEL 850nm IR Laser) */}
      <mesh position={[0, -0.02, 0.012]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.004, 16]} />
        <primitive object={lensMat} attach="material" />
      </mesh>

      {/* Optical Receiver Lens (High-Sensitivity Avalanche Photodiode) */}
      <mesh position={[0, -0.02, -0.012]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.004, 16]} />
        <primitive object={lensMat} attach="material" />
      </mesh>

      {/* 2. Downward Laser Rangefinder Altitude Measurement Beam */}
      {showSensorBeams && (
        <group position={[0, -0.022, 0]}>
          {/* Collimated Laser Beam */}
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[0.002, 0.006, 1.8, 8]} />
            <meshBasicMaterial color="#ef4444" opacity={0.75} transparent />
          </mesh>

          {/* Ground Ranging Target Spot */}
          <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.02, 0.06, 24]} />
            <meshBasicMaterial color="#ef4444" opacity={0.6} transparent side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.015, 16]} />
            <meshBasicMaterial color="#f87171" opacity={0.9} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
};
