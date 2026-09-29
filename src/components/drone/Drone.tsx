import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAurisStore } from '../../state/aurisStore';
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
import { SensorLabels } from './SensorLabels';

interface DroneProps {
  isStudioMode?: boolean;
  showSensorBeams?: boolean;
  showSensorLabels?: boolean;
  selectedComponentId?: string | null;
  onSelectComponent?: (id: string) => void;
}

export const Drone: React.FC<DroneProps> = ({
  isStudioMode = false,
  showSensorBeams = false,
  showSensorLabels = false,
  selectedComponentId = null,
  onSelectComponent,
}) => {
  const { 
    drone, 
    targetWaypoint, 
    flightSpeed,
    sensors, 
    setDroneTelemetry 
  } = useAurisStore();

  const droneGroupRef = useRef<THREE.Group>(null);

  // Smooth continuous internal physics state
  const currentPos = useRef(new THREE.Vector3(...drone.position));
  const currentVelocity = useRef(new THREE.Vector3(0, 0, 0));
  const currentYaw = useRef(drone.rotation[1]);
  const currentPitch = useRef(0);
  const currentRoll = useRef(0);
  const orbitAngle = useRef(0);

  const armLength = 0.58;
  const isFlying = !isStudioMode && (drone.position[1] > 0.5 || drone.speed > 0.1);

  useFrame((state, delta) => {
    if (isStudioMode) return;

    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.1);
    const target = new THREE.Vector3(...targetWaypoint);

    // Speed configuration based on user preference
    const speedConfig = {
      SLOW: { maxSpeed: 2.6, orbitSpeed: 0.22, lerpRate: 1.8 },
      NORMAL: { maxSpeed: 5.2, orbitSpeed: 0.45, lerpRate: 2.8 },
      FAST: { maxSpeed: 8.5, orbitSpeed: 0.70, lerpRate: 3.8 },
    }[flightSpeed];

    // 1. Calculate vector to target
    const toTarget = new THREE.Vector3().subVectors(target, currentPos.current);
    const distToTarget = toTarget.length();

    let currentSpeed = 0;
    let desiredYaw = currentYaw.current;
    let desiredPitch = 0;
    let desiredRoll = 0;

    if (distToTarget > 2.0) {
      // Smooth slow transit to waypoint
      const speedFactor = Math.min(1.0, distToTarget / 6.0);
      currentSpeed = speedConfig.maxSpeed * Math.max(0.25, speedFactor);

      const moveDir = toTarget.clone().normalize();
      currentVelocity.current.lerp(moveDir.multiplyScalar(currentSpeed), dt * speedConfig.lerpRate);
      currentPos.current.addScaledVector(currentVelocity.current, dt);

      // Smooth heading direction
      const targetAngle = Math.atan2(moveDir.x, moveDir.z);
      let angleDiff = targetAngle - desiredYaw;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      desiredYaw += angleDiff;

      // Gentle aerodynamic banking
      desiredPitch = 0.08 * speedFactor;
      desiredRoll = -Math.sin(angleDiff) * 0.15;
    } else {
      // Station keeping or slow 360-degree inspection orbit
      if (target.z < -35) {
        // Base Pad Landing Hover
        currentSpeed = 0.0;
        currentVelocity.current.lerp(new THREE.Vector3(0, 0, 0), dt * 3.0);
        currentPos.current.lerp(target, dt * 2.0);
        desiredPitch = 0;
        desiredRoll = 0;
      } else {
        // Slow inspection orbit around target area
        currentSpeed = 1.8;
        orbitAngle.current += dt * speedConfig.orbitSpeed;
        const orbitRadius = 5.8;

        const desiredX = target.x + Math.cos(orbitAngle.current) * orbitRadius;
        const desiredZ = target.z + Math.sin(orbitAngle.current) * orbitRadius;
        const desiredY = target.y + Math.sin(t * 1.2) * 0.25;

        const desiredOrbitPos = new THREE.Vector3(desiredX, desiredY, desiredZ);
        currentPos.current.lerp(desiredOrbitPos, dt * 2.2);

        desiredYaw = orbitAngle.current + Math.PI / 2 + 0.15;
        desiredRoll = -0.06;
        desiredPitch = 0.02;
      }
    }

    // Micro hover vibration
    const hoverVibe = Math.sin(t * 8) * 0.006;

    // Smooth Euler damping
    currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, desiredYaw, dt * 3.0);
    currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, desiredPitch, dt * 3.5);
    currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, desiredRoll, dt * 3.5);

    // Apply to 3D Transform
    if (droneGroupRef.current) {
      droneGroupRef.current.position.set(
        currentPos.current.x,
        currentPos.current.y + hoverVibe,
        currentPos.current.z
      );
      droneGroupRef.current.rotation.set(
        currentPitch.current,
        currentYaw.current,
        currentRoll.current
      );
    }

    // Synchronize Store Telemetry
    setDroneTelemetry({
      position: [currentPos.current.x, currentPos.current.y, currentPos.current.z],
      rotation: [currentPitch.current, currentYaw.current, currentRoll.current],
      altitude: Math.max(0.4, currentPos.current.y),
      speed: Math.round(currentSpeed * 10) / 10,
    });
  });

  return (
    <group 
      ref={droneGroupRef} 
      position={isStudioMode ? [0, 0, 0] : drone.position}
    >
      {/* 1. Structural Carbon Fiber Decks */}
      <DroneFrame
        highlighted={selectedComponentId === 'frame'}
        onSelect={() => onSelectComponent?.('frame')}
      />

      {/* 2. Aerodynamic Central Payload Fuselage */}
      <PayloadBody
        highlighted={selectedComponentId === 'payload_body'}
        onSelect={() => onSelectComponent?.('payload_body')}
      />

      {/* 3. Internal Electronics & Avionics Stack (Inside Payload Bay) */}
      <ElectronicsBay
        highlighted={selectedComponentId === 'rpi_ai_hat' || selectedComponentId === 'pixhawk'}
        onSelect={() => onSelectComponent?.('rpi_ai_hat')}
      />

      {/* 4. 4S Li-Po High-Discharge Battery Power Core */}
      <Battery
        highlighted={selectedComponentId === 'battery'}
        onSelect={() => onSelectComponent?.('battery')}
      />

      {/* 5. Six Symmetrical Radial Carbon Arms, BLDC Motors & Propellers */}
      {[0, 1, 2, 3, 4, 5].map((idx) => {
        const angle = (idx * Math.PI) / 3;
        const rotDir = idx % 2 === 0 ? 'CW' : 'CCW';
        const radX = Math.cos(angle) * armLength;
        const radZ = Math.sin(angle) * armLength;

        return (
          <group key={`arm-assembly-${idx}`}>
            {/* Structural Carbon Arm Tube + 60A ESC */}
            <DroneArm
              armIndex={idx}
              angle={angle}
              armLength={armLength}
              highlighted={selectedComponentId === 'escs'}
              onSelect={() => onSelectComponent?.('escs')}
            />

            {/* Industrial 4108 BLDC Brushless Motor */}
            <Motor
              motorIndex={idx + 1}
              position={[radX, 0, radZ]}
              rotationDirection={rotDir}
              highlighted={selectedComponentId === `motor_${idx + 1}`}
              onSelect={() => onSelectComponent?.(`motor_${idx + 1}`)}
            />

            {/* 15-Inch Aerodynamic Propeller */}
            <Propeller
              motorIndex={idx + 1}
              position={[radX, 0, radZ]}
              rotationDirection={rotDir}
              isFlying={isFlying || isStudioMode}
              flightSpeedMultiplier={isStudioMode ? 0.8 : (drone.speed > 0.1 ? 1.4 : 0.8)}
              highlighted={selectedComponentId === `propeller_${idx + 1}`}
              onSelect={() => onSelectComponent?.(`propeller_${idx + 1}`)}
            />
          </group>
        );
      })}

      {/* 6. Dual Industrial Rescue Landing Gear */}
      <LandingGear
        highlighted={selectedComponentId === 'landing_gear'}
        onSelect={() => onSelectComponent?.('landing_gear')}
      />

      {/* 7. Perception Sensors Suite */}
      {/* Top Deck: RPLIDAR A1M8 360° Laser Scanner */}
      <group position={[0, 0.088, 0.01]}>
        <RPLidar
          showSensorBeams={showSensorBeams && sensors.lidar}
          highlighted={selectedComponentId === 'rplidar'}
          onSelect={() => onSelectComponent?.('rplidar')}
        />
      </group>

      {/* Top Deck: Elevated GNSS/Compass Mast */}
      <GPSCompass
        highlighted={selectedComponentId === 'gps_compass'}
        onSelect={() => onSelectComponent?.('gps_compass')}
      />

      {/* Front Nose: Dual RGB + MLX90640 Thermal Stabilized Gimbal */}
      <group position={[0, -0.065, 0.20]} rotation={[0.18, 0, 0]}>
        <RGBCamera
          showSensorBeams={showSensorBeams && sensors.rgb}
          highlighted={selectedComponentId === 'rgb_camera'}
          onSelect={() => onSelectComponent?.('rgb_camera')}
        />
        <ThermalCamera
          showSensorBeams={showSensorBeams && sensors.thermal}
          highlighted={selectedComponentId === 'thermal_camera'}
          onSelect={() => onSelectComponent?.('thermal_camera')}
        />
      </group>

      {/* Lower Front: 4-Element MEMS Acoustic Directional Array */}
      <group position={[0, -0.095, 0.16]} rotation={[0.25, 0, 0]}>
        <MicrophoneArray
          showSensorBeams={showSensorBeams && sensors.acoustic}
          highlighted={selectedComponentId === 'acoustic_array'}
          onSelect={() => onSelectComponent?.('acoustic_array')}
        />
      </group>

      {/* Underside Belly: Downward TFMini Micro LiDAR Rangefinder */}
      <group position={[0.035, -0.062, 0.0]}>
        <TFMini
          showSensorBeams={showSensorBeams}
          highlighted={selectedComponentId === 'tfmini'}
          onSelect={() => onSelectComponent?.('tfmini')}
        />
      </group>

      {/* Underside Belly: Optical Flow Velocity Camera */}
      <group position={[-0.035, -0.062, 0.0]}>
        <OpticalFlow
          showSensorBeams={showSensorBeams && sensors.opticalFlow}
          highlighted={selectedComponentId === 'optical_flow'}
          onSelect={() => onSelectComponent?.('optical_flow')}
        />
      </group>

      {/* Side Port: MiCS-6814 Multi-Channel Gas Anomaly Sensor */}
      <group position={[0.13, 0.005, 0.07]}>
        <GasSensor
          showSensorBeams={showSensorBeams}
          highlighted={selectedComponentId === 'gas_sensor'}
          onSelect={() => onSelectComponent?.('gas_sensor')}
        />
      </group>

      {/* Rear Deck: Dual RF Telemetry & Video Link Antennas */}
      <CommunicationModule
        highlighted={selectedComponentId === 'comm'}
        onSelect={() => onSelectComponent?.('comm')}
      />

      {/* 8. Interactive 3D HTML Sensor Annotation Overlays */}
      <SensorLabels
        visible={showSensorLabels}
        selectedComponentId={selectedComponentId}
        onSelectComponent={onSelectComponent}
      />
    </group>
  );
};
