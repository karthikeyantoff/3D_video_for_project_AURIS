import React from 'react';
import * as THREE from 'three';

interface OpticalFlowProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const OpticalFlow: React.FC<OpticalFlowProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const pcbMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#020617',
    roughness: 0.3,
    metalness: 0.85,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const lensMat = new THREE.MeshStandardMaterial({
    color: '#0284c7',
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
      {/* 1. Optical Flow Sensor Board (PMW3901 High-Speed Tracking Module) */}
      <mesh position={[0, -0.008, 0]} castShadow>
        <boxGeometry args={[0.024, 0.006, 0.024]} />
        <primitive object={pcbMat} attach="material" />
      </mesh>

      {/* Optical Flow Camera Lens */}
      <mesh position={[0, -0.014, 0]}>
        <cylinderGeometry args={[0.004, 0.005, 0.006, 16]} />
        <primitive object={lensMat} attach="material" />
      </mesh>

      {/* 850nm Infrared Tracking Flood LED */}
      <mesh position={[0.007, -0.012, 0.007]}>
        <sphereGeometry args={[0.0025, 8, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* 2. Downward Visual Motion Estimation Grid Projection */}
      {showSensorBeams && (
        <group position={[0, -0.016, 0]}>
          <mesh position={[0, -0.8, 0]}>
            <coneGeometry args={[0.45, 1.6, 16, 1, true]} />
            <meshBasicMaterial color="#10b981" opacity={0.10} transparent side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.44, 0.45, 16]} />
            <meshBasicMaterial color="#10b981" opacity={0.5} transparent side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};
