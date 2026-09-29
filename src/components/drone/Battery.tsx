import React from 'react';
import * as THREE from 'three';

interface BatteryProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const Battery: React.FC<BatteryProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const packMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#38bdf8' : '#090d16',
    roughness: 0.35,
    metalness: 0.3,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const strapMat = new THREE.MeshStandardMaterial({
    color: '#0284c7', // Cyan ballistic nylon strap
    roughness: 0.8,
    metalness: 0.1,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const trayMat = new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.3,
    metalness: 0.8,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const xt60Mat = new THREE.MeshStandardMaterial({
    color: '#eab308', // Yellow XT60/XT90 High-Amp Connector
    roughness: 0.4,
    metalness: 0.2,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Carbon Fiber Lower Battery Mounting Tray Platform */}
      <mesh position={[0, -0.048, 0]} castShadow>
        <boxGeometry args={[0.076, 0.003, 0.142]} />
        <primitive object={trayMat} attach="material" />
      </mesh>

      {/* 2. 4S 5200mAh 100C Li-Po Battery Cell Block */}
      <mesh position={[0, -0.028, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.068, 0.034, 0.134]} />
        <primitive object={packMat} attach="material" />
      </mesh>

      {/* Silver Cell Division Seams (4S Configuration) */}
      {[-0.015, 0, 0.015].map((sx, sIdx) => (
        <mesh key={`seam-${sIdx}`} position={[sx, -0.028, 0]}>
          <boxGeometry args={[0.001, 0.0345, 0.135]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
      ))}

      {/* 3. High-G Ballistic Nylon Safety Straps (Dual Buckles) */}
      {[-0.035, 0.035].map((sz, szIdx) => (
        <group key={`strap-${szIdx}`} position={[0, -0.028, sz]}>
          <mesh>
            <boxGeometry args={[0.072, 0.036, 0.018]} />
            <primitive object={strapMat} attach="material" />
          </mesh>
          {/* Metal Buckle Clamp */}
          <mesh position={[0, 0.019, 0]}>
            <boxGeometry args={[0.024, 0.004, 0.02]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.95} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* 4. High-Current 10AWG Silicone Discharge Wires & XT60 Connector */}
      <group position={[0, -0.02, -0.075]}>
        {/* Red Positive Lead */}
        <mesh position={[0.01, 0.008, 0.006]}>
          <cylinderGeometry args={[0.003, 0.003, 0.024, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.6} />
        </mesh>
        {/* Black Negative Lead */}
        <mesh position={[-0.01, 0.008, 0.006]}>
          <cylinderGeometry args={[0.003, 0.003, 0.024, 8]} />
          <meshStandardMaterial color="#020617" roughness={0.6} />
        </mesh>
        {/* XT60 High-Current Plug */}
        <mesh position={[0, 0.012, -0.01]}>
          <boxGeometry args={[0.016, 0.01, 0.018]} />
          <primitive object={xt60Mat} attach="material" />
        </mesh>
      </group>

      {/* 5. 4S JST-XH Balance Tap Lead */}
      <mesh position={[0.022, -0.02, -0.072]}>
        <boxGeometry args={[0.012, 0.004, 0.012]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.5} />
      </mesh>
    </group>
  );
};
