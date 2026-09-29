import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Drone } from './Drone';
import { ExplodedDrone } from './ExplodedDrone';
import { SensorLabels } from './SensorLabels';
import { PresentationMode, PRESENTATION_STEPS } from './PresentationMode';
import { ComponentInspectorModal } from './ComponentInspectorModal';
import { DroneInspectionMode, DroneCameraPreset } from '../../types/droneViewer';
import { 
  Eye, 
  Layers, 
  RotateCcw, 
  Play, 
  Pause, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  X,
  Sliders,
  Plane,
  MapPin,
  Square
} from 'lucide-react';

interface DroneStudioProps {
  onSwitchToDisasterMode?: () => void;
}

export const DroneStudio: React.FC<DroneStudioProps> = ({ onSwitchToDisasterMode }) => {
  const [inspectionMode, setInspectionMode] = useState<DroneInspectionMode>('FLIGHT');
  const [cameraPreset, setCameraPreset] = useState<DroneCameraPreset>('PERSPECTIVE');
  const [explodedProgress, setExplodedProgress] = useState<number>(0.75);
  const [activeLayerFilter, setActiveLayerFilter] = useState<number | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  // Presentation State
  const [isPresentationPlaying, setIsPresentationPlaying] = useState<boolean>(false);
  const [isPresentationPaused, setIsPresentationPaused] = useState<boolean>(false);
  const [presentationStepIndex, setPresentationStepIndex] = useState<number>(0);

  const controlsRef = useRef<any>(null);

  // Stop / Exit Presentation Mode cleanly
  const stopPresentation = useCallback(() => {
    setIsPresentationPlaying(false);
    setIsPresentationPaused(false);
    setSelectedComponentId(null);
    if (inspectionMode === 'EXPLODED') {
      setExplodedProgress(0.75);
    } else {
      setExplodedProgress(0.0);
    }
    // Re-orient camera to standard perspective
    if (controlsRef.current) {
      controlsRef.current.object.position.set(0.9, 0.65, 1.1);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, [inspectionMode]);

  // Keyboard shortcut listener (ESC to exit, Space to pause/resume, Arrows for step navigation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopPresentation();
        setSelectedComponentId(null);
      }
      if (isPresentationPlaying) {
        if (e.code === 'Space') {
          e.preventDefault();
          setIsPresentationPaused((prev) => !prev);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          setPresentationStepIndex((prev) => (prev + 1) % PRESENTATION_STEPS.length);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setPresentationStepIndex((prev) => (prev - 1 + PRESENTATION_STEPS.length) % PRESENTATION_STEPS.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationPlaying, stopPresentation]);

  // Handle Preset Camera Views
  const setPresetView = (preset: DroneCameraPreset) => {
    setCameraPreset(preset);
    if (isPresentationPlaying) {
      stopPresentation();
    }

    if (!controlsRef.current) return;

    if (preset === 'TOP') {
      controlsRef.current.object.position.set(0, 1.45, 0.001);
      controlsRef.current.target.set(0, 0, 0);
    } else if (preset === 'SIDE') {
      controlsRef.current.object.position.set(1.45, 0.05, 0);
      controlsRef.current.target.set(0, 0, 0);
    } else if (preset === 'FRONT') {
      controlsRef.current.object.position.set(0, 0.05, 1.45);
      controlsRef.current.target.set(0, 0, 0);
    } else if (preset === 'PERSPECTIVE' || preset === 'FREE') {
      controlsRef.current.object.position.set(0.9, 0.65, 1.1);
      controlsRef.current.target.set(0, 0, 0);
    }
    controlsRef.current.update();
  };

  const handleReset = () => {
    stopPresentation();
    setInspectionMode('FLIGHT');
    setExplodedProgress(0.0);
    setActiveLayerFilter(null);
    setSelectedComponentId(null);
    setPresetView('PERSPECTIVE');
  };

  const startPresentation = () => {
    setInspectionMode('FLIGHT');
    setPresentationStepIndex(0);
    setIsPresentationPaused(false);
    setIsPresentationPlaying(true);
  };

  const layersList = [
    { num: 1, name: 'Propellers' },
    { num: 2, name: 'Motors' },
    { num: 3, name: 'Arms & ESCs' },
    { num: 4, name: 'Frame & Pod' },
    { num: 5, name: 'Electronics' },
    { num: 6, name: 'Battery' },
    { num: 7, name: 'Sensors' },
    { num: 8, name: 'Landing Gear' },
  ];

  const currentPresStep = PRESENTATION_STEPS[presentationStepIndex] || PRESENTATION_STEPS[0];

  return (
    <div className="w-full h-full relative bg-[#040711] overflow-hidden select-none">
      {/* 1. THREE.JS 3D CANVAS STAGE */}
      <Canvas
        camera={{ position: [0.9, 0.65, 1.1], fov: 42, near: 0.05, far: 100 }}
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#040711']} />

        {/* Studio Turntable Lighting Rig */}
        <ambientLight intensity={0.85} color="#e2e8f0" />
        
        {/* Key Light (Cool Daylight) */}
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.4}
          color="#f8fafc"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />

        {/* Fill Rim Light (AURIS Cyan Glow) */}
        <directionalLight
          position={[-4, 3, -4]}
          intensity={1.8}
          color="#00e5ff"
        />

        {/* Warm Underbelly Fill Light */}
        <directionalLight
          position={[0, -4, 0]}
          intensity={0.6}
          color="#38bdf8"
        />

        {/* Technical Carbon Studio Grid Floor */}
        <Grid
          position={[0, -0.32, 0]}
          args={[12, 12]}
          cellSize={0.1}
          cellThickness={1.0}
          cellColor="#00e5ff"
          sectionSize={0.5}
          sectionThickness={1.5}
          sectionColor="#0284c7"
          fadeDistance={6}
          fadeStrength={1.5}
        />

        {/* Soft Contact Shadows on Turntable */}
        <ContactShadows
          position={[0, -0.315, 0]}
          opacity={0.75}
          scale={2.2}
          blur={1.8}
          far={1.5}
          color="#00e5ff"
        />

        {/* Active 3D Drone Model */}
        {inspectionMode === 'EXPLODED' ? (
          <ExplodedDrone
            explosionProgress={explodedProgress}
            activeLayerFilter={activeLayerFilter}
            selectedComponentId={selectedComponentId}
            onSelectComponent={(id) => setSelectedComponentId(id)}
            showSensorBeams={true}
          />
        ) : (
          <Drone
            isStudioMode={true}
            showSensorBeams={inspectionMode === 'SENSOR' || isPresentationPlaying}
            showSensorLabels={inspectionMode === 'SENSOR'}
            selectedComponentId={selectedComponentId}
            onSelectComponent={(id) => setSelectedComponentId(id)}
          />
        )}

        {/* Interactive Presentation Mode Camera Sequencer */}
        <PresentationMode
          isPlaying={isPresentationPlaying}
          stepIndex={presentationStepIndex}
          isPaused={isPresentationPaused}
          onStepChange={(idx) => setPresentationStepIndex(idx)}
          onUpdateExplodedProgress={(p) => {
            if (p > 0) {
              setInspectionMode('EXPLODED');
              setExplodedProgress(p);
            } else if (inspectionMode === 'EXPLODED') {
              setExplodedProgress(0);
            }
          }}
          onSelectComponent={(id) => setSelectedComponentId(id)}
        />

        {/* Orbit Controls with Damping (Disabled during presentation so it does not fight camera animation) */}
        <OrbitControls
          ref={controlsRef}
          enabled={!isPresentationPlaying}
          enableDamping
          dampingFactor={0.05}
          minDistance={0.3}
          maxDistance={4.0}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>

      {/* 2. TOP HEADER & STUDIO TITLE BAR */}
      <div className="absolute top-4 left-4 right-4 pointer-events-auto flex items-center justify-between z-20">
        {/* Title & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
            <Plane className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-widest text-white font-mono">
                AURIS <span className="text-cyan-400">3D MODEL</span>
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold uppercase tracking-widest">
                HEXACOPTER CAD
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Autonomous Uncertainty-aware Rescue Intelligence System
            </p>
          </div>
        </div>

        {/* Mode Actions */}
        <div className="flex items-center gap-2">
          {onSwitchToDisasterMode && !isPresentationPlaying && (
            <button
              onClick={onSwitchToDisasterMode}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              DISASTER MISSION SIMULATOR
            </button>
          )}

          {/* Presentation Tour Button */}
          {!isPresentationPlaying ? (
            <button
              onClick={startPresentation}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/30"
            >
              <Play className="w-4 h-4 fill-current" />
              START PRESENTATION TOUR
            </button>
          ) : (
            <button
              onClick={stopPresentation}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider transition-all shadow-lg bg-red-600 hover:bg-red-500 text-white shadow-red-600/30 animate-pulse"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
              EXIT TOUR (ESC)
            </button>
          )}
        </div>
      </div>

      {/* 3. PRESENTATION MODE ACTIVE HUD OVERLAY (Floating Top/Center) */}
      {isPresentationPlaying && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-auto z-30 w-full max-w-xl px-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-slate-950/95 border border-cyan-500/60 backdrop-blur-md shadow-2xl text-left relative overflow-hidden ring-1 ring-cyan-400/30">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
            
            {/* Header with Step Tracker and Close Button */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                STAGE {presentationStepIndex + 1} / {PRESENTATION_STEPS.length} • CAD SHOWCASE
              </span>
              
              {/* Quick Close Button */}
              <button
                onClick={stopPresentation}
                className="flex items-center gap-1 text-slate-400 hover:text-red-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono transition-colors"
                title="Exit presentation (ESC)"
              >
                <X className="w-3.5 h-3.5" />
                <span>EXIT</span>
              </button>
            </div>

            {/* Part Name & Subtitle */}
            <h3 className="text-base font-bold text-white font-sans tracking-wide">
              {currentPresStep.title}
            </h3>
            <p className="text-xs text-cyan-300 font-mono mb-2">
              {currentPresStep.subtitle}
            </p>
            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-3">
              {currentPresStep.narration}
            </p>

            {/* Interactive Step Navigation Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                {/* Prev Step */}
                <button
                  onClick={() => setPresentationStepIndex((prev) => (prev - 1 + PRESENTATION_STEPS.length) % PRESENTATION_STEPS.length)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white font-mono transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  PREV
                </button>

                {/* Pause / Resume */}
                <button
                  onClick={() => setIsPresentationPaused(!isPresentationPaused)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg border font-mono text-xs font-bold transition-all ${
                    isPresentationPaused
                      ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-amber-600 hover:bg-amber-500 border-amber-500 text-white'
                  }`}
                >
                  {isPresentationPaused ? (
                    <>
                      <Play className="w-3 h-3 fill-current" />
                      RESUME
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 fill-current" />
                      PAUSE
                    </>
                  )}
                </button>

                {/* Next Step */}
                <button
                  onClick={() => setPresentationStepIndex((prev) => (prev + 1) % PRESENTATION_STEPS.length)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white font-mono transition-all"
                >
                  NEXT
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Keyboard helper hint */}
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                [Space]: Pause/Resume • [ESC]: Exit
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MAIN INSPECTION MODE CONTROLS BAR (Bottom Center) - Only when not in Presentation Tour */}
      {!isPresentationPlaying && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto z-20 flex flex-col items-center gap-3">
          {/* Exploded View Layer Sliders (Visible when Exploded Mode is active) */}
          {inspectionMode === 'EXPLODED' && (
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md shadow-2xl flex flex-col items-center gap-2 animate-fade-in max-w-xl w-full">
              <div className="flex items-center justify-between w-full text-xs font-mono text-cyan-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  EXPLOSION SEPARATION: {Math.round(explodedProgress * 100)}%
                </span>
                <span className="text-[10px] text-slate-400">
                  DRAG SLIDER OR SELECT LAYER
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedProgress}
                onChange={(e) => setExplodedProgress(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />

              {/* Layer Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                <button
                  onClick={() => setActiveLayerFilter(null)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all ${
                    activeLayerFilter === null
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ALL LAYERS
                </button>
                {layersList.map((layer) => (
                  <button
                    key={layer.num}
                    onClick={() => setActiveLayerFilter(activeLayerFilter === layer.num ? null : layer.num)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                      activeLayerFilter === layer.num
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    L{layer.num}: {layer.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Primary Mode Selector Group */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md shadow-2xl">
            {/* Flight Mode */}
            <button
              onClick={() => {
                setInspectionMode('FLIGHT');
                setIsPresentationPlaying(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all ${
                inspectionMode === 'FLIGHT'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Plane className="w-4 h-4" />
              FLIGHT MODE
            </button>

            {/* Sensor Mode */}
            <button
              onClick={() => {
                setInspectionMode('SENSOR');
                setIsPresentationPlaying(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all ${
                inspectionMode === 'SENSOR'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Eye className="w-4 h-4" />
              SENSOR MODE
            </button>

            {/* Exploded View */}
            <button
              onClick={() => {
                setInspectionMode('EXPLODED');
                setIsPresentationPlaying(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider transition-all ${
                inspectionMode === 'EXPLODED'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              EXPLODED VIEW
            </button>
          </div>

          {/* Camera View Angle Presets & Reset */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-md text-[11px] font-mono">
            <button
              onClick={() => setPresetView('TOP')}
              className={`px-3 py-1 rounded-lg transition-all ${
                cameraPreset === 'TOP' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              TOP VIEW
            </button>
            <button
              onClick={() => setPresetView('SIDE')}
              className={`px-3 py-1 rounded-lg transition-all ${
                cameraPreset === 'SIDE' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              SIDE VIEW
            </button>
            <button
              onClick={() => setPresetView('FRONT')}
              className={`px-3 py-1 rounded-lg transition-all ${
                cameraPreset === 'FRONT' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              FRONT VIEW
            </button>
            <button
              onClick={() => setPresetView('PERSPECTIVE')}
              className={`px-3 py-1 rounded-lg transition-all ${
                cameraPreset === 'PERSPECTIVE' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              PERSPECTIVE
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-red-400 font-bold transition-all ml-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              RESET
            </button>
          </div>
        </div>
      )}

      {/* 5. SPECIFICATION MODAL (When a part is selected) */}
      <ComponentInspectorModal
        componentId={selectedComponentId}
        onClose={() => setSelectedComponentId(null)}
      />
    </div>
  );
};
