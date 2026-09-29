import React from 'react';
import * as THREE from 'three';

interface MicrophoneArrayProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const MicrophoneArray: React.FC<MicrophoneArrayProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const mountMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#0f172a',
    roughness: 0.3,
    metalness: 0.8,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const micGoldMat = new THREE.MeshStandardMaterial({
    color: '#fbbf24', // Gold-plated acoustic MEMS port
    roughness: 0.2,
    metalness: 0.95,
    transparent: opacity < 1,
    opacity: opacity,
  });

  // 4 MEMS Microphone positions in front acoustic array
  const micPositions: [number, number, number][] = [
    [-0.032, 0.008, 0.0],
    [-0.011, -0.008, 0.0],
    [0.011, -0.008, 0.0],
    [0.032, 0.008, 0.0],
  ];

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Curved Acoustic Mounting Bracket (Lower Front Nose) */}
      <mesh castShadow>
        <boxGeometry args={[0.088, 0.024, 0.012]} />
        <primitive object={mountMat} attach="material" />
      </mesh>

      {/* 2. 4-Element MEMS Acoustic Microphones (Beamforming Time-Difference-of-Arrival (TDoA)) */}
      {micPositions.map((pos, idx) => (
        <group key={`mems-mic-${idx}`} position={pos}>
          {/* Outer Protective Acoustic Mesh Collar */}
          <mesh position={[0, 0, 0.006]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.004, 0.004, 0.004, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Gold Acoustic Port Diaphragm */}
          <mesh position={[0, 0, 0.008]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.0025, 0.0025, 0.001, 16]} />
            <primitive object={micGoldMat} attach="material" />
          </mesh>
        </group>
      ))}

      {/* 3. Directional Acoustic Listening Sonar Waves Visualization */}
      {showSensorBeams && (
        <group position={[0, 0, 0.02]}>
          {[0.4, 0.8, 1.2, 1.6].map((dist, arcIdx) => (
            <mesh 
              key={`sonar-arc-${arcIdx}`} 
              position={[0, 0, dist]} 
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <ringGeometry args={[dist * 0.45, dist * 0.48, 24, 1, -Math.PI / 4, Math.PI / 2]} />
              <meshBasicMaterial 
                color="#eab308" 
                opacity={0.35 - arcIdx * 0.07} 
                transparent 
                side={THREE.DoubleSide} 
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
