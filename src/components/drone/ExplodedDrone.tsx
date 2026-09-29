import React from 'react';
import { DroneFrame } from './DroneFrame';
import { DroneArm } from './DroneArm';
import { Motor } from './Motor';
import { Propeller } from './Propeller';
import { LandingGear } from './LandingGear';
import { PayloadBody } from './PayloadBody';
import { ElectronicsBay } from './ElectronicsBay';
import { Battery } from './Battery';
import { RGBCamera } from './RGBCamera';
import { ThermalCamera } from './ThermalCamera';
import { RPLidar } from './RPLidar';
import { TFMini } from './TFMini';
import { OpticalFlow } from './OpticalFlow';
import { GPSCompass } from './GPSCompass';
import { MicrophoneArray } from './MicrophoneArray';
import { GasSensor } from './GasSensor';
import { CommunicationModule } from './CommunicationModule';

interface ExplodedDroneProps {
  explosionProgress: number; // 0.0 (assembled) to 1.0 (fully exploded)
  activeLayerFilter?: number | null; // null = all layers, 1..8 = single layer
  selectedComponentId?: string | null;
  onSelectComponent?: (id: string) => void;
  showSensorBeams?: boolean;
}

export const ExplodedDrone: React.FC<ExplodedDroneProps> = ({
  explosionProgress = 0,
  activeLayerFilter = null,
  selectedComponentId = null,
  onSelectComponent,
  showSensorBeams = false,
}) => {
  const p = Math.max(0, Math.min(1, explosionProgress));

  // Layer offsets scaled by progress
  const layer1Y = p * 0.30; // Layer 1: Propellers
  const layer2Y = p * 0.18; // Layer 2: Motors
  const layer3Rad = p * 0.08; // Layer 3: Arms expansion
  const layer3Y = p * 0.08;
  const layer4UpperY = p * 0.05; // Layer 4: Frame Upper
  const layer4LowerY = -p * 0.05; // Layer 4: Frame Lower
  const layer5Y = p * 0.12; // Layer 5: Electronics
  const layer6Y = -p * 0.10; // Layer 6: Battery
  const layer7SensorsY = -p * 0.18; // Layer 7: Underside Sensors
  const layer7LidarY = p * 0.22; // Layer 7: LiDAR
  const layer7GpsY = p * 0.26; // Layer 7: GPS
  const layer8Y = -p * 0.28; // Layer 8: Landing Gear

  // Determine visibility/opacity per layer if layer filter is active
  const getLayerOpacity = (layerNum: number) => {
    if (activeLayerFilter === null) return 1.0;
    return activeLayerFilter === layerNum ? 1.0 : 0.15;
  };

  const isLayerVisible = (layerNum: number) => {
    if (activeLayerFilter === null) return true;
    return activeLayerFilter === layerNum;
  };

  const armLength = 0.58;

  return (
    <group>
      {/* LAYER 4: Central Frame & Aerodynamic Fuselage */}
      {isLayerVisible(4) && (
        <group>
          <DroneFrame
            explodedOffsetY={layer4UpperY}
            highlighted={selectedComponentId === 'frame'}
            opacity={getLayerOpacity(4)}
            onSelect={() => onSelectComponent?.('frame')}
          />
          <PayloadBody
            explodedOffsetY={layer4LowerY}
            highlighted={selectedComponentId === 'payload_body'}
            opacity={p > 0.05 ? 0.35 * getLayerOpacity(4) : getLayerOpacity(4)}
            onSelect={() => onSelectComponent?.('payload_body')}
          />
        </group>
      )}

      {/* LAYER 5: Internal Electronics (Pixhawk, RPi 5 + AI HAT+, PDB) */}
      {isLayerVisible(5) && (
        <ElectronicsBay
          explodedOffsetY={layer5Y}
          highlighted={selectedComponentId === 'rpi_ai_hat' || selectedComponentId === 'pixhawk'}
          opacity={getLayerOpacity(5)}
          onSelect={() => onSelectComponent?.('rpi_ai_hat')}
        />
      )}

      {/* LAYER 6: 4S Li-Po Battery */}
      {isLayerVisible(6) && (
        <Battery
          explodedOffsetY={layer6Y}
          highlighted={selectedComponentId === 'battery'}
          opacity={getLayerOpacity(6)}
          onSelect={() => onSelectComponent?.('battery')}
        />
      )}

      {/* LAYER 3, 2, 1: Six Arms, Motors, and Propellers */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx * Math.PI) / 3;
        const rotDir = idx % 2 === 0 ? 'CW' : 'CCW';
        const radX = Math.cos(angle) * (armLength + layer3Rad);
        const radZ = Math.sin(angle) * (armLength + layer3Rad);

        return (
          <group key={`exploded-arm-${idx}`}>
            {/* LAYER 3: Arm Structure & ESC */}
            {isLayerVisible(3) && (
              <DroneArm
                armIndex={idx}
                angle={angle}
                armLength={armLength}
                explodedOffset={[Math.cos(angle) * layer3Rad, layer3Y, Math.sin(angle) * layer3Rad]}
                highlighted={selectedComponentId === 'escs'}
                opacity={getLayerOpacity(3)}
                onSelect={() => onSelectComponent?.('escs')}
              />
            )}

            {/* LAYER 2: BLDC Motor */}
            {isLayerVisible(2) && (
              <Motor
                motorIndex={idx + 1}
                position={[radX, 0, radZ]}
                rotationDirection={rotDir}
                explodedOffsetY={layer2Y}
                highlighted={selectedComponentId === `motor_${idx + 1}`}
                opacity={getLayerOpacity(2)}
                onSelect={() => onSelectComponent?.(`motor_${idx + 1}`)}
              />
            )}

            {/* LAYER 1: 15-inch Propeller */}
            {isLayerVisible(1) && (
              <Propeller
                motorIndex={idx + 1}
                position={[radX, 0, radZ]}
                rotationDirection={rotDir}
                isFlying={false}
                explodedOffsetY={layer1Y}
                highlighted={selectedComponentId === `propeller_${idx + 1}`}
                opacity={getLayerOpacity(1)}
                onSelect={() => onSelectComponent?.(`propeller_${idx + 1}`)}
              />
            )}
          </group>
        );
      })}

      {/* LAYER 7: Perception Sensors Suite */}
      {isLayerVisible(7) && (
        <group>
          {/* Upper LiDAR */}
          <group position={[0, 0.09, 0]}>
            <RPLidar
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7LidarY}
              highlighted={selectedComponentId === 'rplidar'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('rplidar')}
            />
          </group>

          {/* Elevated GPS Mast */}
          <GPSCompass
            explodedOffsetY={layer7GpsY}
            highlighted={selectedComponentId === 'gps_compass'}
            opacity={getLayerOpacity(7)}
            onSelect={() => onSelectComponent?.('gps_compass')}
          />

          {/* Front Dual RGB + Thermal Gimbal */}
          <group position={[0, -0.065, 0.22]}>
            <RGBCamera
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7SensorsY * 0.6}
              highlighted={selectedComponentId === 'rgb_camera'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('rgb_camera')}
            />
            <ThermalCamera
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7SensorsY * 0.6}
              highlighted={selectedComponentId === 'thermal_camera'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('thermal_camera')}
            />
          </group>

          {/* Front Acoustic Microphone Array */}
          <group position={[0, -0.095, 0.18]}>
            <MicrophoneArray
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7SensorsY * 0.7}
              highlighted={selectedComponentId === 'acoustic_array'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('acoustic_array')}
            />
          </group>

          {/* Underside TFMini Micro Rangefinder */}
          <group position={[0.04, -0.065, 0.0]}>
            <TFMini
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7SensorsY}
              highlighted={selectedComponentId === 'tfmini'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('tfmini')}
            />
          </group>

          {/* Underside Optical Flow Sensor */}
          <group position={[-0.04, -0.065, 0.0]}>
            <OpticalFlow
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7SensorsY}
              highlighted={selectedComponentId === 'optical_flow'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('optical_flow')}
            />
          </group>

          {/* Side Gas Anomaly Sensor */}
          <group position={[0.13, 0.01, 0.08]}>
            <GasSensor
              showSensorBeams={showSensorBeams}
              explodedOffsetY={layer7SensorsY * 0.5}
              highlighted={selectedComponentId === 'gas_sensor'}
              opacity={getLayerOpacity(7)}
              onSelect={() => onSelectComponent?.('gas_sensor')}
            />
          </group>

          {/* Communication Module Antennas */}
          <CommunicationModule
            explodedOffsetY={layer7GpsY * 0.6}
            highlighted={selectedComponentId === 'comm'}
            opacity={getLayerOpacity(7)}
            onSelect={() => onSelectComponent?.('comm')}
          />
        </group>
      )}

      {/* LAYER 8: Dual Industrial Landing Gear */}
      {isLayerVisible(8) && (
        <LandingGear
          explodedOffsetY={layer8Y}
          highlighted={selectedComponentId === 'landing_gear'}
          opacity={getLayerOpacity(8)}
          onSelect={() => onSelectComponent?.('landing_gear')}
        />
      )}
    </group>
  );
};
