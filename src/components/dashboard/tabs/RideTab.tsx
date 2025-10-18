'use client';

import { RideData, RideStatus } from '@/hooks/use-ride-simulation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, StopCircle, Gauge, Navigation, Clock, Mountain } from 'lucide-react';
import { BatteryIndicator } from '../BatteryIndicator';
import { Weather } from '../Weather';
import { scooterModels } from '@/lib/scooter-data';

type RideTabProps = {
  rideData: RideData;
  rideStatus: RideStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  selectedScooter: string;
};

export function RideTab({ rideData, rideStatus, onStart, onPause, onStop, selectedScooter }: RideTabProps) {
  const scooterSpec = scooterModels.find(s => s.id === selectedScooter);
  const maxRange = scooterSpec ? (scooterSpec.batteryCapacityWh / scooterSpec.efficiencyWhKm) : 0;
  const estimatedRange = (rideData.battery / 100) * maxRange;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="h-full flex flex-col p-4 gap-4 overflow-y-auto">
      {/* Speed Display */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Speed
            </span>
          </div>
          <div className="text-5xl font-bold font-headline text-primary">
            {rideData.speed.toFixed(1)} 
            <span className="text-xl text-muted-foreground ml-2">km/h</span>
          </div>
        </CardContent>
      </Card>

      {/* Ride Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <Navigation className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-xs text-muted-foreground">Distance</div>
            <div className="text-lg font-bold">{rideData.distance.toFixed(2)} km</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <Clock className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-xs text-muted-foreground">Time</div>
            <div className="text-lg font-bold">{formatTime(rideData.time)}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <Mountain className="h-4 w-4 mx-auto text-muted-foreground mb-1" />
            <div className="text-xs text-muted-foreground">Elevation</div>
            <div className="text-lg font-bold">{rideData.elevation.toFixed(0)} m</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 py-4">
        {rideStatus === 'stopped' || rideStatus === 'paused' ? (
          <Button onClick={onStart} size="lg" className="rounded-full w-20 h-20">
            <Play className="h-10 w-10" />
          </Button>
        ) : (
          <Button onClick={onPause} size="lg" variant="secondary" className="rounded-full w-20 h-20">
            <Pause className="h-10 w-10" />
          </Button>
        )}
        <Button onClick={onStop} size="lg" variant="destructive" className="rounded-full w-20 h-20" disabled={rideStatus === 'stopped'}>
          <StopCircle className="h-10 w-10" />
        </Button>
      </div>

      {/* Battery & Environment */}
      <BatteryIndicator batteryLevel={rideData.battery} estimatedRange={estimatedRange} />
      <Weather rideData={rideData} />
    </div>
  );
}
