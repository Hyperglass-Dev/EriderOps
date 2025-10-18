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
    <div className="h-full flex flex-col p-3 gap-2 overflow-hidden">
      {/* Speed Display */}
      <Card className="bg-card/50 backdrop-blur-sm flex-shrink-0">
        <CardContent className="p-3">
          <div className="text-center">
            <div className="text-xs font-medium text-muted-foreground mb-1">Speed</div>
            <div className="text-4xl font-bold font-headline text-primary">
              {rideData.speed.toFixed(1)} 
              <span className="text-lg text-muted-foreground ml-1">km/h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ride Stats */}
      <div className="grid grid-cols-3 gap-2 flex-shrink-0">
        <Card className="bg-card/50">
          <CardContent className="p-2 text-center">
            <Navigation className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
            <div className="text-xs text-muted-foreground">Distance</div>
            <div className="text-sm font-bold">{rideData.distance.toFixed(2)} km</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-2 text-center">
            <Clock className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
            <div className="text-xs text-muted-foreground">Time</div>
            <div className="text-sm font-bold">{formatTime(rideData.time)}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-2 text-center">
            <Mountain className="h-3 w-3 mx-auto text-muted-foreground mb-1" />
            <div className="text-xs text-muted-foreground">Elevation</div>
            <div className="text-sm font-bold">{rideData.elevation.toFixed(0)} m</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 flex-shrink-0">
        {rideStatus === 'stopped' || rideStatus === 'paused' ? (
          <Button onClick={onStart} size="lg" className="h-14 px-8">
            <Play className="h-6 w-6 mr-2" />
            Start
          </Button>
        ) : (
          <Button onClick={onPause} size="lg" variant="secondary" className="h-14 px-8">
            <Pause className="h-6 w-6 mr-2" />
            Pause
          </Button>
        )}
        <Button onClick={onStop} size="lg" variant="destructive" className="h-14 px-8" disabled={rideStatus === 'stopped'}>
          <StopCircle className="h-6 w-6 mr-2" />
          Stop
        </Button>
      </div>

      {/* Battery & Environment */}
      <BatteryIndicator batteryLevel={rideData.battery} estimatedRange={estimatedRange} />
      <Weather rideData={rideData} />
    </div>
  );
}
