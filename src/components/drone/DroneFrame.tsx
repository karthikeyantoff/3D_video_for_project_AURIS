import React from 'react';
import * as THREE from 'three';

interface DroneFrameProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const DroneFrame: React.FC<DroneFrameProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const carbonMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#111827',
    roughness: 0.35,
    metalness: 0.7,
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

  const standoffMat = new THREE.MeshStandardMaterial({
    color: '#0284c7', // Anodized cyan blue standoff spacers
    roughness: 0.15,
    metalness: 0.95,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]} 
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Upper Carbon Fiber Structural Deck (2.5mm matte carbon sheet with CNC weight-reduction pockets) */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.005, 6]} />
        <primitive object={carbonMat} attach="material" />
      </mesh>

      {/* CNC Bevel Ring on Upper Deck */}
      <mesh position={[0, 0.053, 0]}>
        <ringGeometry args={[0.12, 0.215, 6]} />
        <meshBasicMaterial color="#00e5ff" opacity={0.15} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Lower Carbon Fiber Power & Mounting Deck */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.21, 0.21, 0.005, 6]} />
        <primitive object={carbonMat} attach="material" />
      </mesh>

      {/* 3. CNC Anodized Aluminum Arm Clamps (6x pairs at 60° angles) */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx * Math.PI) / 3;
        const r = 0.14;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;

        return (
          <group key={`clamp-${idx}`} position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
            {/* Upper clamp bracket */}
            <mesh position={[0, 0.032, 0]} castShadow>
              <boxGeometry args={[0.042, 0.016, 0.046]} />
              <primitive object={aluminumMat} attach="material" />
            </mesh>
            {/* Lower clamp bracket */}
            <mesh position={[0, -0.032, 0]} castShadow>
              <boxGeometry args={[0.042, 0.016, 0.046]} />
              <primitive object={aluminumMat} attach="material" />
            </mesh>
            {/* M3 Grade 12.9 High-Tensile Steel Fasteners */}
            {[-0.015, 0.015].map((bx, bIdx) => (
              <React.Fragment key={`bolt-${idx}-${bIdx}`}>
                <mesh position={[bx, 0.043, 0.016]}>
                  <cylinderGeometry args={[0.003, 0.003, 0.006, 6]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[bx, 0.043, -0.016]}>
                  <cylinderGeometry args={[0.003, 0.003, 0.006, 6]} />
                  <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
                </mesh>
              </React.Fragment>
            ))}
          </group>
        );
      })}

      {/* 4. Heavy-duty Knurled Aluminum Standoff Spacers (6x around perimeter) */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx * Math.PI) / 3 + Math.PI / 6;
        const r = 0.185;
        const x = Math.cos(angle) * r;
        const z = Math.sin(angle) * r;

        return (
          <mesh key={`standoff-${idx}`} position={[x, 0, z]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.095, 12]} />
            <primitive object={standoffMat} attach="material" />
          </mesh>
        );
      })}

      {/* 5. Central Hub Wiring Conduit Pass-through Grommet */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.096, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} wireframe={false} />
      </mesh>
    </group>
  );
};
