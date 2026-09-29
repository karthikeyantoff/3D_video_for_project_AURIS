import React from 'react';
import * as THREE from 'three';

interface GasSensorProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const GasSensor: React.FC<GasSensorProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const housingMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#1e293b',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const meshVentMat = new THREE.MeshStandardMaterial({
    color: '#94a3b8', // Stainless steel sinter filter mesh
    roughness: 0.4,
    metalness: 0.95,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. CNC Machined Anodized Aluminum Vented Sensor Enclosure */}
      <mesh castShadow>
        <boxGeometry args={[0.026, 0.016, 0.026]} />
        <primitive object={housingMat} attach="material" />
      </mesh>

      {/* Sintered Stainless Steel Gas-Permeable Diffusion Vent Membrane */}
      <mesh position={[0, 0, 0.0135]}>
        <circleGeometry args={[0.007, 16]} />
        <primitive object={meshVentMat} attach="material" />
      </mesh>

      {/* Side Slotted Aerodynamic Sample Air Intake Ports */}
      {[-0.0135, 0.0135].map((sx, sIdx) => (
        <React.Fragment key={`slot-${sIdx}`}>
          <mesh position={[sx, 0.002, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.014, 0.003, 0.002]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          <mesh position={[sx, -0.002, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.014, 0.003, 0.002]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
        </React.Fragment>
      ))}

      {/* 2. Gas Sampling & Volatile Anomaly Sensing Halo */}
      {showSensorBeams && (
        <group position={[0, 0, 0.02]}>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial color="#a855f7" opacity={0.15} transparent wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#c084fc" opacity={0.25} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
};
