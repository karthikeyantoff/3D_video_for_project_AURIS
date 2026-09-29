import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RPLidarProps {
  showSensorBeams?: boolean;
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const RPLidar: React.FC<RPLidarProps> = ({
  showSensorBeams = false,
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const turretRef = useRef<THREE.Group>(null);
  const sweepRayRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (turretRef.current) {
      turretRef.current.rotation.y += 10.0 * delta; // 10 Hz rotation (600 RPM)
    }
    if (sweepRayRef.current) {
      sweepRayRef.current.rotation.y += 10.0 * delta;
    }
  });

  const baseMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#0a0f1d',
    roughness: 0.25,
    metalness: 0.85,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const turretMat = new THREE.MeshStandardMaterial({
    color: '#020617',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const opticWindowMat = new THREE.MeshStandardMaterial({
    color: '#ef4444', // Infrared 785nm laser diode window
    roughness: 0.1,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  // Simulated 360° LiDAR Point Cloud obstacles around drone
  const pointCloudPositions = useMemo(() => {
    const points: [number, number, number][] = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      // Add realistic varied distance profile (simulating surrounding rubble/walls)
      const dist = 2.4 + Math.sin(theta * 3) * 0.8 + Math.cos(theta * 5) * 0.4;
      points.push([Math.cos(theta) * dist, 0.01, Math.sin(theta) * dist]);
    }
    return points;
  }, []);

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Fixed Base Housing (Mounting bracket to upper payload deck) */}
      <mesh position={[0, 0.012, 0]} castShadow>
        <cylinderGeometry args={[0.042, 0.046, 0.024, 32]} />
        <primitive object={baseMat} attach="material" />
      </mesh>

      {/* Slip Ring Motor Core */}
      <mesh position={[0, 0.025, 0]}>
        <cylinderGeometry args={[0.032, 0.032, 0.006, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* 2. Rotating Optical Turret Head (Spins at 10Hz) */}
      <group ref={turretRef} position={[0, 0.036, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.038, 0.038, 0.020, 24]} />
          <primitive object={turretMat} attach="material" />
        </mesh>

        {/* Laser Diode Emitter Aperture */}
        <mesh position={[0.014, 0, 0.034]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.006, 12]} />
          <primitive object={opticWindowMat} attach="material" />
        </mesh>

        {/* Optical Triangulation CMOS Receiver Window */}
        <mesh position={[-0.014, 0, 0.034]} rotation={[Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.012, 0.008, 0.006]} />
          <primitive object={opticWindowMat} attach="material" />
        </mesh>

        {/* Top Dome Cap */}
        <mesh position={[0, 0.011, 0]}>
          <cylinderGeometry args={[0.036, 0.038, 0.004, 24]} />
          <primitive object={baseMat} attach="material" />
        </mesh>
      </group>

      {/* 3. Active 360° LiDAR Sweep & Point Cloud Visualization */}
      {showSensorBeams && (
        <group position={[0, 0.036, 0]}>
          {/* Rotating Laser Beam Ray */}
          <group ref={sweepRayRef}>
            <mesh position={[0, 0, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.002, 0.006, 2.8, 8]} />
              <meshBasicMaterial color="#00e5ff" opacity={0.8} transparent />
            </mesh>
            {/* Beam Lead Glow Dot */}
            <mesh position={[0, 0, 2.8]}>
              <sphereGeometry args={[0.02, 12, 12]} />
              <meshBasicMaterial color="#38bdf8" />
            </mesh>
          </group>

          {/* 360° Laser Radar Scanning Disc */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.1, 2.8, 48]} />
            <meshBasicMaterial color="#00e5ff" opacity={0.06} transparent side={THREE.DoubleSide} />
          </mesh>

          {/* Range Distance Concentric Rings (1m, 2m, 3m) */}
          {[1.0, 2.0, 2.8].map((radius, rIdx) => (
            <mesh key={`ring-${rIdx}`} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius - 0.005, radius, 48]} />
              <meshBasicMaterial color="#00e5ff" opacity={0.25} transparent side={THREE.DoubleSide} />
            </mesh>
          ))}

          {/* Point Cloud Obstacle Dots */}
          {pointCloudPositions.map((pos, pIdx) => (
            <mesh key={`pt-${pIdx}`} position={pos}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshBasicMaterial color="#00e5ff" />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
