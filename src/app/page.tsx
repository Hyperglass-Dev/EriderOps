'use client'

import { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { Map } from '@/components/dashboard/Map';
import { InfoPanel } from '@/components/dashboard/InfoPanel';
import { useRideSimulation } from '@/hooks/use-ride-simulation';

export default function DashboardPage() {
  const { rideStatus, rideData, startRide, pauseRide, stopRide } = useRideSimulation();
  const [selectedScooter, setSelectedScooter] = useState('segway-max');
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        speed={rideData.speed}
        distance={rideData.distance}
        time={rideData.time}
        elevation={rideData.elevation}
      />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2 h-[400px] lg:h-auto">
          <Map lat={rideData.position.lat} lng={rideData.position.lng} />
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
          />
        </div>
      </main>
    </div>
  );
}
