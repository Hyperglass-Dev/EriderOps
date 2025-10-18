import { Play, Pause, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RideStatus } from '@/hooks/use-ride-simulation';

type ControlsProps = {
  rideStatus: RideStatus;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
};

export function Controls({ rideStatus, onStart, onPause, onStop }: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {rideStatus === 'stopped' || rideStatus === 'paused' ? (
        <Button onClick={onStart} size="lg" className="bg-primary hover:bg-primary/80 rounded-full w-24 h-24 text-4xl">
          <Play className="h-12 w-12 fill-primary-foreground" />
          <span className="sr-only">Start Ride</span>
        </Button>
      ) : (
        <Button onClick={onPause} size="lg" variant="secondary" className="rounded-full w-24 h-24 text-4xl">
          <Pause className="h-12 w-12 fill-secondary-foreground" />
          <span className="sr-only">Pause Ride</span>
        </Button>
      )}
      <Button onClick={onStop} size="lg" variant="destructive" className="rounded-full w-24 h-24 text-4xl" disabled={rideStatus === 'stopped'}>
        <StopCircle className="h-12 w-12 fill-destructive-foreground" />
        <span className="sr-only">Stop Ride</span>
      </Button>
    </div>
  );
}
