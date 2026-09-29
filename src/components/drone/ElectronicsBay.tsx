import React from 'react';
import * as THREE from 'three';

interface ElectronicsBayProps {
  explodedOffsetY?: number;
  highlighted?: boolean;
  opacity?: number;
  onSelect?: () => void;
}

export const ElectronicsBay: React.FC<ElectronicsBayProps> = ({
  explodedOffsetY = 0,
  highlighted = false,
  opacity = 1.0,
  onSelect,
}) => {
  const pcbMat = new THREE.MeshStandardMaterial({
    color: '#064e3b', // Classic dark green solder mask PCB
    roughness: 0.35,
    metalness: 0.5,
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

  const pixhawkMat = new THREE.MeshStandardMaterial({
    color: highlighted ? '#00e5ff' : '#020617',
    roughness: 0.2,
    metalness: 0.9,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const aiHatMat = new THREE.MeshStandardMaterial({
    color: '#0369a1', // Anodized cyan/blue AI HAT+ heatsink
    roughness: 0.15,
    metalness: 0.95,
    transparent: opacity < 1,
    opacity: opacity,
  });

  const siliconeDamperMat = new THREE.MeshStandardMaterial({
    color: '#00e5ff',
    roughness: 0.9,
    metalness: 0.1,
    transparent: opacity < 1,
    opacity: opacity,
  });

  return (
    <group 
      position={[0, explodedOffsetY, 0]}
      onClick={(e) => { e.stopPropagation(); onSelect?.(); }}
    >
      {/* 1. Internal CNC Avionics Tray Platform */}
      <mesh position={[0, 0.005, 0]} castShadow>
        <boxGeometry args={[0.16, 0.004, 0.18]} />
        <primitive object={aluminumMat} attach="material" />
      </mesh>

      {/* 2. Pixhawk 6X Autopilot Flight Controller (Centered directly over CG) */}
      <group position={[0, 0.024, -0.045]}>
        {/* Anti-Vibration Silicone Dampening Balls (4x corners) */}
        {[-0.028, 0.028].map((dx, dIdx) => (
          <React.Fragment key={`damper-${dIdx}`}>
            <mesh position={[dx, -0.01, 0.025]}>
              <sphereGeometry args={[0.005, 12, 12]} />
              <primitive object={siliconeDamperMat} attach="material" />
            </mesh>
            <mesh position={[dx, -0.01, -0.025]}>
              <sphereGeometry args={[0.005, 12, 12]} />
              <primitive object={siliconeDamperMat} attach="material" />
            </mesh>
          </React.Fragment>
        ))}

        {/* Pixhawk CNC Anodized Aluminum Flight Controller Enclosure */}
        <mesh castShadow>
          <boxGeometry args={[0.052, 0.014, 0.058]} />
          <primitive object={pixhawkMat} attach="material" />
        </mesh>

        {/* Top Pixhawk Status RGB Indicator LED */}
        <mesh position={[0, 0.008, 0]}>
          <cylinderGeometry args={[0.004, 0.004, 0.002, 16]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
        <pointLight position={[0, 0.015, 0]} color="#10b981" intensity={0.6} distance={0.4} />

        {/* I/O Pin Headers & CAN/Telemetry Port Interfaces */}
        <mesh position={[0, 0.002, 0.028]}>
          <boxGeometry args={[0.044, 0.008, 0.006]} />
          <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.002, -0.028]}>
          <boxGeometry args={[0.044, 0.008, 0.006]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 3. Raspberry Pi 5 + Raspberry Pi AI HAT+ (13 TOPS Hailo-8 NPU) Stack */}
      <group position={[0, 0.024, 0.048]}>
        {/* Raspberry Pi 5 Mainboard PCB */}
        <mesh position={[0, -0.005, 0]} castShadow>
          <boxGeometry args={[0.085, 0.003, 0.056]} />
          <primitive object={pcbMat} attach="material" />
        </mesh>

        {/* Broadcom BCM2712 Quad-Core SoC Heatsink */}
        <mesh position={[-0.012, 0.002, -0.005]} castShadow>
          <boxGeometry args={[0.022, 0.008, 0.022]} />
          <primitive object={aluminumMat} attach="material" />
        </mesh>

        {/* Raspberry Pi AI HAT+ PCIe Expansion Board (13 TOPS Hailo-8 NPU) */}
        <mesh position={[0, 0.008, 0]} castShadow>
          <boxGeometry args={[0.082, 0.003, 0.054]} />
          <primitive object={aiHatMat} attach="material" />
        </mesh>

        {/* NPU Anodized Cooling Fin Stack */}
        {[-0.02, -0.01, 0, 0.01, 0.02].map((fx, fIdx) => (
          <mesh key={`npu-fin-${fIdx}`} position={[fx, 0.015, 0]}>
            <boxGeometry args={[0.002, 0.009, 0.038]} />
            <primitive object={aiHatMat} attach="material" />
          </mesh>
        ))}

        {/* Dual CSI Ribbon Cables connecting to Front Vision Suite */}
        <mesh position={[0.035, 0.004, 0.015]}>
          <boxGeometry args={[0.012, 0.001, 0.024]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.5} />
        </mesh>

        {/* USB 3.0 & Gigabit Ethernet Ports */}
        <mesh position={[0.044, 0.002, -0.012]}>
          <boxGeometry args={[0.014, 0.012, 0.016]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 4. Power Distribution Board (PDB) & 5V/12V Regulators */}
      <group position={[0, -0.01, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.09, 0.003, 0.09]} />
          <primitive object={pcbMat} attach="material" />
        </mesh>
        {/* High-Current Solid Copper Busbars */}
        <mesh position={[0, 0.003, 0.02]}>
          <boxGeometry args={[0.07, 0.002, 0.01]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.003, -0.02]}>
          <boxGeometry args={[0.07, 0.002, 0.01]} />
          <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Electrolytic Smoothing Capacitors (Low-ESR Filter) */}
        {[-0.025, 0.025].map((cx, cIdx) => (
          <mesh key={`cap-${cIdx}`} position={[cx, 0.008, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.016, 12]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};
