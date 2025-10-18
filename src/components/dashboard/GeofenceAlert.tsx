'use client'
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { RideData } from '@/hooks/use-ride-simulation';

export function GeofenceAlert({ rideData }: { rideData: RideData }) {
  const [inZone, setInZone] = useState(false);
  const [speedLimit, setSpeedLimit] = useState<number | null>(null);

  useEffect(() => {
    const { lat, lng } = rideData.position;
    
    fetch(`/api/geofence?lat=${lat}&lng=${lng}`)
      .then(res => res.json())
      .then(data => {
        if (data.inZone) {
          setInZone(true);
          setSpeedLimit(data.speedLimit);
        } else {
          setInZone(false);
          setSpeedLimit(null);
        }
      })
      .catch(() => {
        setInZone(false);
        setSpeedLimit(null);
      });
  }, [rideData.position]);

  if (!inZone || !speedLimit) {
    return null;
  }

  return (
    <Alert variant="default" className="bg-accent/20 border-accent text-accent-foreground">
      <AlertCircle className="h-4 w-4 text-accent" />
      <AlertTitle className="font-headline text-accent">Geofence Alert</AlertTitle>
      <AlertDescription>
        Speed limit zone: <strong>{speedLimit} km/h</strong>. Please ride safely.
      </AlertDescription>
    </Alert>
  );
}
