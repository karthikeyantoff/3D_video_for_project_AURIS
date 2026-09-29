import React from 'react';
import * as THREE from 'three';

interface CommunicationModuleProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const CommunicationModule: React.FC<CommunicationModuleProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const smaGoldMat = new THREE.MeshStandardMaterial({
    color: '#eab308', // Gold SMA RF Connector
    roughness: 0.2,
    metalness: 0.95,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const antennaMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#020617',
    roughness: 0.35,
    metalness: 0.4,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* Dual RF Antennas (915MHz Telemetry + 5.8GHz High-Definition Video Link) */}
      {[-0.035, 0.035].map((ax, aIdx) => (
        <group key={`ant-${aIdx}`} position={[ax, 0.052, -0.12]} rotation={[-0.2, 0, (aIdx === 0 ? -0.15 : 0.15)]}>
          {/* Gold SMA Bulkhead Connector */}
          <mesh castShadow>
            <cylinderGeometry args={[0.0035, 0.0035, 0.008, 12]} />
            <primitive object={smaGoldMat} attach="material" />
          </mesh>

          {/* Flexible Rubberized Dipole Antenna Stem */}
          <mesh position={[0, 0.045, 0]} castShadow>
            <cylinderGeometry args={[0.002, 0.0025, 0.085, 12]} />
            <primitive object={antennaMat} attach="material" />
          </mesh>

          {/* Antenna Tip Cap */}
          <mesh position={[0, 0.088, 0]}>
            <sphereGeometry args={[0.0028, 8, 8]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
