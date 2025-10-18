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
import { scooterModels } from '@/lib/scooter-data';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

type InfoPanelProps = {
  rideData: RideData;
  rideStatus: RideStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onSelectScooter: (id: string) => void;
  selectedScooter: string;
  initialBattery: number;
  onSetInitialBattery: (level: number) => void;
};

export function InfoPanel(props: InfoPanelProps) {
  const [crashModalOpen, setCrashModalOpen] = useState(false);
  
  const scooterSpec = scooterModels.find(s => s.id === props.selectedScooter);
  const maxRange = scooterSpec ? (scooterSpec.batteryCapacityWh / scooterSpec.efficiencyWhKm) : 0;
  const estimatedRange = (props.rideData.battery / 100) * maxRange;
  
  const handleBatteryChange = (value: number[]) => {
    props.onSetInitialBattery(value[0]);
  };

  return (
    <aside className="p-4 flex flex-col gap-4">
      <Controls 
        rideStatus={props.rideStatus}
        onStart={props.onStart}
        onPause={props.onPause}
        onStop={props.onStop}
      />

      <Card>
          <CardHeader>
              <CardTitle className="text-lg">Ride Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScooterSelector onSelectScooter={props.onSelectScooter} selectedScooter={props.selectedScooter} />
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="battery-slider">Start Battery</Label>
                    <span className="font-bold font-headline text-lg">{props.initialBattery}%</span>
                </div>
                <Slider
                    id="battery-slider"
                    min={0}
                    max={100}
                    step={1}
                    value={[props.initialBattery]}
                    onValueChange={handleBatteryChange}
                    disabled={props.rideStatus !== 'stopped'}
                />
            </div>
          </CardContent>
      </Card>
      
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
