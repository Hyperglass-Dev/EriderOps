'use client';

import { useState } from 'react';
import { RideData } from '@/hooks/use-ride-simulation';
import { RideModeSelector, RideMode } from '../RideModeSelector';
import { Directions } from '../Directions';

type NavigationTabProps = {
  rideData: RideData;
  selectedScooter: string;
};

export function NavigationTab({ rideData, selectedScooter }: NavigationTabProps) {
  const [rideMode, setRideMode] = useState<RideMode>('just-ride');

  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <RideModeSelector 
          selectedMode={rideMode} 
          onSelectMode={setRideMode}
        />
      </div>
      <div className="flex-1">
        <Directions 
          lat={rideData.position.lat} 
          lng={rideData.position.lng}
          rideMode={rideMode}
          rideData={rideData}
          scooterModel={selectedScooter}
        />
      </div>
    </div>
  );
}
