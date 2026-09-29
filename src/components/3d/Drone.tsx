import React from 'react';
import { Drone as HexacopterDrone } from '../drone/Drone';

export const Drone: React.FC = () => {
  return (
    <HexacopterDrone
      isStudioMode={false}
      showSensorBeams={true}
      showSensorLabels={false}
    />
  );
};
