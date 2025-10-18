'use client'

import { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Directions } from '@/components/dashboard/Directions';
import { InfoPanel } from '@/components/dashboard/InfoPanel';
import { useRideSimulation } from '@/hooks/use-ride-simulation';
import { scooterModels } from '@/lib/scooter-data';

export default function DashboardPage() {
  const [selectedScooter, setSelectedScooter] = useState(scooterModels[0].id);
  const [initialBattery, setInitialBattery] = useState(100);

  const { rideStatus, rideData, startRide, pauseRide, stopRide } = useRideSimulation(selectedScooter, initialBattery);
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        speed={rideData.speed}
        distance={rideData.distance}
        time={rideData.time}
        elevation={rideData.elevation}
      />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2 h-[400px] lg:h-auto flex flex-col gap-4">
          <Directions lat={rideData.position.lat} lng={rideData.position.lng} />
        </div>
        <div className="lg:col-span-1 overflow-y-auto">
          <InfoPanel
            rideStatus={rideStatus}
            rideData={rideData}
            onStart={startRide}
            onPause={pauseRide}
            onStop={stopRide}
            selectedScooter={selectedScooter}
            onSelectScooter={setSelectedScooter}
            initialBattery={initialBattery}
            onSetInitialBattery={setInitialBattery}
          />
        </div>
      </main>
    </div>
  );
}
