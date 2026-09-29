import React from 'react';
import * as THREE from 'three';

interface ThermalCameraProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const ThermalCamera: React.FC<ThermalCameraProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const housingMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#f97316' : '#0f172a',
    roughness: 0.25,
    metalness: 0.85,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const germaniumLensMat = new THREE.MeshStandardMaterial({
    color: '#ea580c', // Germanium LWIR optical lens (transmissive to 8-14μm thermal radiation)
    roughness: 0.1,
    metalness: 0.9,
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
      {/* 1. Thermal Sensor Enclosure (MLX90640 32x24 FIR Array) */}
      <group position={[0.02, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.026, 0.030, 0.032]} />
          <primitive object={housingMat} attach="material" />
        </mesh>

        {/* Germanium Lens Bezel */}
        <mesh position={[0, 0, 0.018]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.010, 0.011, 0.010, 20]} />
          <primitive object={aluminumMat} attach="material" />
        </mesh>

        {/* Germanium LWIR Optical Window */}
        <mesh position={[0, 0, 0.023]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0085, 0.0085, 0.002, 20]} />
          <primitive object={germaniumLensMat} attach="material" />
        </mesh>

        {/* Gold Sputter Thermal Filter Ring */}
        <mesh position={[0, 0, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.003, 0.008, 16]} />
          <meshBasicMaterial color="#f97316" opacity={0.6} transparent side={THREE.DoubleSide} />
        </mesh>

        {/* 2. Thermal FOV Visual Projection Cone (Long-Wave Infrared 55°x35° FOV) */}
        {showSensorBeams && (
          <group position={[0, 0, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh position={[0, 0.7, 0]}>
              <coneGeometry args={[0.55, 1.4, 24, 1, true]} />
              <meshBasicMaterial 
                color="#f97316" 
                opacity={0.14} 
                transparent 
                side={THREE.DoubleSide} 
                wireframe={false} 
              />
            </mesh>
            {/* Outline wireframe ring */}
            <mesh position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.54, 0.55, 24]} />
              <meshBasicMaterial color="#ea580c" opacity={0.7} transparent side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};
