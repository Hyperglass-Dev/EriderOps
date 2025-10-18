'use client'
import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { RideData } from '@/hooks/use-ride-simulation';

// Mock geofence
const speedLimitZone = {
  lat: 34.052,
  lng: -118.243,
  radius: 0.0005, // in lat/lng degrees, approx 55m
  speedLimit: 15, // km/h
};

export function GeofenceAlert({ rideData }: { rideData: RideData }) {
  const [inZone, setInZone] = useState(false);

  useEffect(() => {
    const { lat, lng } = rideData.position;
    const distance = Math.sqrt(
      Math.pow(lat - speedLimitZone.lat, 2) + Math.pow(lng - speedLimitZone.lng, 2)
    );
    
    if (distance < speedLimitZone.radius) {
      setInZone(true);
    } else {
      setInZone(false);
    }
  }, [rideData.position]);

  if (!inZone) {
    return null;
  }

  return (
    <Alert variant="default" className="bg-accent/20 border-accent text-accent-foreground">
      <AlertCircle className="h-4 w-4 text-accent" />
      <AlertTitle className="font-headline text-accent">Geofence Alert</AlertTitle>
      <AlertDescription>
        Speed limit zone: <strong>{speedLimitZone.speedLimit} km/h</strong>. Please ride safely.
      </AlertDescription>
    </Alert>
  );
}
