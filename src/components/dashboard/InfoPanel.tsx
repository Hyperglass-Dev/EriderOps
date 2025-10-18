'use client';
import { ScooterSelector } from './ScooterSelector';
import { BatteryIndicator } from './BatteryIndicator';
import { Weather } from './Weather';
import { GeofenceAlert } from './GeofenceAlert';
import { CrashDetectionModal } from './CrashDetectionModal';
import { AiAnalysis } from './AiAnalysis';
import { Controls } from './Controls';
import type { RideData, RideStatus } from '@/hooks/use-ride-simulation';
import { Button } from '../ui/button';
import { useState } from 'react';

type InfoPanelProps = {
  rideData: RideData;
  rideStatus: RideStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onSelectScooter: (id: string) => void;
  selectedScooter: string;
};

export function InfoPanel(props: InfoPanelProps) {
  const [crashModalOpen, setCrashModalOpen] = useState(false);
  
  // Predict range (simple model)
  const estimatedRange = (props.rideData.battery / 100) * 30; // Assuming 30km range for a full battery
  
  return (
    <aside className="p-4 flex flex-col gap-4">
      <Controls 
        rideStatus={props.rideStatus}
        onStart={props.onStart}
        onPause={props.onPause}
        onStop={props.onStop}
      />
      <ScooterSelector onSelectScooter={props.onSelectScooter} selectedScooter={props.selectedScooter} />
      <BatteryIndicator batteryLevel={props.rideData.battery} estimatedRange={estimatedRange} />
      <Weather />
      <AiAnalysis rideData={props.rideData} scooterModel={props.selectedScooter} />
      <GeofenceAlert rideData={props.rideData} />
      <Button variant="destructive" onClick={() => setCrashModalOpen(true)}>
        Simulate Crash
      </Button>
      <CrashDetectionModal open={crashModalOpen} onOpenChange={setCrashModalOpen} />
    </aside>
  );
}
