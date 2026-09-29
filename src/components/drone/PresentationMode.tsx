import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PRESENTATION_STEPS } from '../../data/presentationSteps';

interface PresentationModeProps {
  isPlaying: boolean;
  stepIndex: number;
  isPaused: boolean;
  onStepChange: (stepIndex: number) => void;
  onUpdateExplodedProgress: (progress: number) => void;
  onSelectComponent: (id: string | null) => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({
  isPlaying,
  stepIndex,
  isPaused,
  onStepChange,
  onUpdateExplodedProgress,
  onSelectComponent,
}) => {
  const stepTimerRef = useRef<number>(0);
  const { camera } = useThree();

  const currentStep = PRESENTATION_STEPS[stepIndex] || PRESENTATION_STEPS[0];

  // Smooth camera interpolation in useFrame
  useFrame((_, delta) => {
    if (!isPlaying) return;

    // Advance step timer only when not paused
    if (!isPaused) {
      stepTimerRef.current += delta;
      if (stepTimerRef.current >= currentStep.durationSec) {
        stepTimerRef.current = 0;
        if (stepIndex < PRESENTATION_STEPS.length - 1) {
          onStepChange(stepIndex + 1);
        } else {
          onStepChange(0); // Loop
        }
      }
    }

    // Smooth camera position interpolation
    const targetPos = new THREE.Vector3(...currentStep.targetCameraPos);
    camera.position.lerp(targetPos, Math.min(1.0, delta * 3.0));

    // Smooth camera lookAt interpolation
    const targetLookAt = new THREE.Vector3(...currentStep.targetLookAt);
    camera.lookAt(targetLookAt);
  });

  // Sync exploded progress & highlight whenever step changes
  useEffect(() => {
    if (isPlaying) {
      stepTimerRef.current = 0;
      onUpdateExplodedProgress(currentStep.explodedProgress);
      onSelectComponent(currentStep.highlightedComponentId);
    }
  }, [stepIndex, isPlaying, currentStep, onUpdateExplodedProgress, onSelectComponent]);

  return (
    <>
      {/* 3D Target Reticle Marker in Scene pointing directly to the highlighted part */}
      {isPlaying && currentStep.target3DMarkerPos && (
        <group position={currentStep.target3DMarkerPos}>
          <mesh>
            <sphereGeometry args={[0.015, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" opacity={0.8} transparent />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.025, 0.035, 24]} />
            <meshBasicMaterial color="#00e5ff" opacity={0.6} transparent side={THREE.DoubleSide} />
          </mesh>
          <pointLight color="#00e5ff" intensity={1.2} distance={0.4} />
        </group>
      )}
    </>
  );
};
