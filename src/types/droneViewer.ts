export type DroneViewerMode = 'STUDIO' | 'DISASTER';

export type DroneInspectionMode = 'FLIGHT' | 'SENSOR' | 'EXPLODED';

export type DroneCameraPreset = 'PERSPECTIVE' | 'TOP' | 'SIDE' | 'FRONT' | 'FREE';

export interface DroneComponentSpec {
  id: string;
  name: string;
  category: 'STRUCTURE' | 'AVIONICS' | 'PERCEPTION' | 'PROPULSION' | 'POWER' | 'COMMUNICATION';
  role: string;
  specs: { [key: string]: string };
  description: string;
  highlightPosition: [number, number, number];
}

export interface ExplodedLayerConfig {
  layer: number;
  name: string;
  offsetY: number;
  opacity: number;
}
