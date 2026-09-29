import React from 'react';
import * as THREE from 'three';

interface RGBCameraProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const RGBCamera: React.FC<RGBCameraProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const housingMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#0f172a',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const lensGlassMat = new THREE.MeshPhysicalMaterial({
    color: '#0284c7',
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.9,
    ior: 1.52,
    transparent: true,
    opacity: 0.85 * opacity,
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
      {/* 1. Gimbal Pitch Yoke & Mounting Arm */}
      <mesh position={[-0.024, 0, 0]} castShadow>
        <boxGeometry args={[0.006, 0.038, 0.032]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>

      {/* 2. RGB Optical Sensor Enclosure (4K Sony IMX Low-Light Sensor) */}
      <group position={[-0.02, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.028, 0.032, 0.034]} />
          <primitive object={housingMat} attach="material" />
        </mesh>

        {/* Lens Barrel Cylinder */}
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.014, 0.014, 24]} />
          <primitive object={housingMat} attach="material" />
        </mesh>

        {/* Optical Glass Lens Element */}
        <mesh position={[0, 0, 0.027]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.0105, 0.0105, 0.002, 24]} />
          <primitive object={lensGlassMat} attach="material" />
        </mesh>

        {/* Antireflective Coating Glimmer */}
        <mesh position={[0, 0, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.002, 0.009, 16]} />
          <meshBasicMaterial color="#00e5ff" opacity={0.4} transparent side={THREE.DoubleSide} />
        </mesh>

        {/* 3. Sensor Field of View (FOV) Visual Projection Cone */}
        {showSensorBeams && (
          <group position={[0, 0, 0.03]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh position={[0, 0.75, 0]}>
              <coneGeometry args={[0.65, 1.5, 24, 1, true]} />
              <meshBasicMaterial 
                color="#00e5ff" 
                opacity={0.12} 
                transparent 
                side={THREE.DoubleSide} 
                wireframe={false} 
              />
            </mesh>
            {/* Cone Outline Wireframe Rings */}
            <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.64, 0.65, 24]} />
              <meshBasicMaterial color="#00e5ff" opacity={0.6} transparent side={THREE.DoubleSide} />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};
