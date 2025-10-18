'use client';

import { RideData, RideStatus } from '@/hooks/use-ride-simulation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ScooterSelector } from '../ScooterSelector';
import { scooterModels } from '@/lib/scooter-data';
import { Battery, Gauge, Zap } from 'lucide-react';

type SettingsTabProps = {
  selectedScooter: string;
  onSelectScooter: (id: string) => void;
  initialBattery: number;
  onSetInitialBattery: (level: number) => void;
  rideStatus: RideStatus;
  rideData: RideData;
};

export function SettingsTab({
  selectedScooter,
  onSelectScooter,
  initialBattery,
  onSetInitialBattery,
  rideStatus,
  rideData
}: SettingsTabProps) {
  const scooterSpec = scooterModels.find(s => s.id === selectedScooter);
  
  const handleBatteryChange = (value: number[]) => {
    onSetInitialBattery(value[0]);
  };

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Scooter Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScooterSelector 
            onSelectScooter={onSelectScooter} 
            selectedScooter={selectedScooter}
          />
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="battery-slider">Start Battery</Label>
              <span className="font-bold text-lg">{initialBattery}%</span>
            </div>
            <Slider
              id="battery-slider"
              min={0}
              max={100}
              step={1}
              value={[initialBattery]}
              onValueChange={handleBatteryChange}
              disabled={rideStatus !== 'stopped'}
            />
          </div>
        </CardContent>
      </Card>

      {scooterSpec && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Scooter Specifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Battery className="h-4 w-4" />
                <span className="text-sm">Battery Capacity</span>
              </div>
              <span className="font-semibold">{scooterSpec.batteryCapacityWh} Wh</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Gauge className="h-4 w-4" />
                <span className="text-sm">Efficiency</span>
              </div>
              <span className="font-semibold">{scooterSpec.efficiencyWhKm} Wh/km</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4" />
                <span className="text-sm">Max Range</span>
              </div>
              <span className="font-semibold">{(scooterSpec.batteryCapacityWh / scooterSpec.efficiencyWhKm).toFixed(1)} km</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Range Prediction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            The app learns your riding style over time to provide more accurate range predictions.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-xs text-muted-foreground">Current Battery</div>
              <div className="text-2xl font-bold">{rideData.battery.toFixed(0)}%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Est. Range</div>
              <div className="text-2xl font-bold">
                {scooterSpec ? ((scooterSpec.batteryCapacityWh / scooterSpec.efficiencyWhKm) * (rideData.battery / 100)).toFixed(1) : '0'} km
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
