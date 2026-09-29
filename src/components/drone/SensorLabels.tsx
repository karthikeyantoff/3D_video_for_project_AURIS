import React from 'react';
import { Html } from '@react-three/drei';

export interface SensorLabelItem {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  position: [number, number, number];
  color: string;
}

interface SensorLabelsProps {
  visible?: boolean;
  onSelectComponent?: (id: string) => void;
  selectedComponentId?: string | null;
}

export const SENSOR_LABEL_DATA: SensorLabelItem[] = [
  {
    id: 'rplidar',
    name: 'RPLIDAR A1M8',
    subtitle: '360° Spatial Scan & Obstacle Mapping',
    tag: 'SPATIAL',
    position: [0, 0.19, 0.0],
    color: '#00e5ff',
  },
  {
    id: 'gps_compass',
    name: 'GPS / COMPASS',
    subtitle: 'RTK Multi-GNSS & EMI Isolated Magnetometer',
    tag: 'NAV',
    position: [0, 0.22, -0.11],
    color: '#38bdf8',
  },
  {
    id: 'rgb_camera',
    name: 'RGB CAMERA',
    subtitle: '4K Optical Survivor & Hazard Detection',
    tag: 'VISION',
    position: [-0.12, -0.06, 0.24],
    color: '#06b6d4',
  },
  {
    id: 'thermal_camera',
    name: 'MLX90640 THERMAL',
    subtitle: 'LWIR 32x24 Thermal Hotspot Cross-Verification',
    tag: 'THERMAL',
    position: [0.12, -0.06, 0.24],
    color: '#f97316',
  },
  {
    id: 'acoustic_array',
    name: 'MEMS ACOUSTIC ARRAY',
    subtitle: '4-Mic Beamforming Sound Cue Localization',
    tag: 'AUDIO',
    position: [0, -0.12, 0.22],
    color: '#eab308',
  },
  {
    id: 'tfmini',
    name: 'TFMini MICRO',
    subtitle: 'Downward Micro-LiDAR Precision Rangefinder',
    tag: 'ALTITUDE',
    position: [0.14, -0.14, -0.02],
    color: '#ef4444',
  },
  {
    id: 'optical_flow',
    name: 'OPTICAL FLOW',
    subtitle: 'Visual Velocity & GPS-Denied Stabilization',
    tag: 'MOTION',
    position: [-0.14, -0.14, -0.02],
    color: '#10b981',
  },
  {
    id: 'gas_sensor',
    name: 'MiCS-6814 GAS',
    subtitle: 'Multi-Gas CO/NO2/VOC Hazard Anomaly',
    tag: 'SAFETY',
    position: [0.16, 0.02, 0.12],
    color: '#a855f7',
  },
  {
    id: 'rpi_ai_hat',
    name: 'Raspberry Pi 5 + AI HAT+',
    subtitle: '13 TOPS Edge-AI NPU Neural Inference',
    tag: 'EDGE-AI',
    position: [-0.16, 0.04, 0.0],
    color: '#38bdf8',
  },
  {
    id: 'pixhawk',
    name: 'PIXHAWK 6X',
    subtitle: 'Triple-Redundant Autopilot & IMU Isolation',
    tag: 'AUTOPILOT',
    position: [0, 0.05, -0.05],
    color: '#10b981',
  },
  {
    id: 'battery',
    name: '4S 5200mAh Li-Po',
    subtitle: 'Quick-Swap 100C High-Discharge Power Core',
    tag: 'POWER',
    position: [0, -0.05, -0.12],
    color: '#f59e0b',
  },
  {
    id: 'escs',
    name: 'ESC × 6 (60A DShot1200)',
    subtitle: 'Distributed BLDC Motor Drive Controllers',
    tag: 'DRIVE',
    position: [0.38, 0.06, 0.22],
    color: '#60a5fa',
  },
];

export const SensorLabels: React.FC<SensorLabelsProps> = ({
  visible = true,
  onSelectComponent,
  selectedComponentId,
}) => {
  if (!visible) return null;

  return (
    <group>
      {SENSOR_LABEL_DATA.map((item) => {
        const isSelected = selectedComponentId === item.id;

        return (
          <group key={item.id} position={item.position}>
            <Html
              distanceFactor={3.2}
              center
              className="pointer-events-auto select-none"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent?.(item.id);
                }}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border backdrop-blur-md cursor-pointer transition-all duration-200 whitespace-nowrap shadow-xl hover:scale-105 ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 ring-2 ring-cyan-400/50 scale-105'
                    : 'bg-slate-950/80 border-slate-700/60 hover:border-cyan-500/80 hover:bg-slate-900/90'
                }`}
              >
                {/* Glowing Pulse Dot */}
                <div 
                  className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0" 
                  style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} 
                />

                {/* Info Text */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold tracking-wider text-slate-100 font-mono">
                      {item.name}
                    </span>
                    <span 
                      className="text-[8px] font-mono px-1 py-0.2 rounded font-semibold uppercase tracking-widest text-slate-950"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-sans tracking-tight">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
