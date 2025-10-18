'use client';

import { useState, useEffect, useCallback } from 'react';

export type RideStatus = 'stopped' | 'active' | 'paused';

export interface RideData {
  speed: number;
  distance: number;
  time: number;
  elevation: number;
  position: { lat: number; lng: number };
  battery: number;
}

const INITIAL_LAT = 34.052235;
const INITIAL_LNG = -118.243683;

export function useRideSimulation() {
  const [rideStatus, setRideStatus] = useState<RideStatus>('stopped');
  const [rideData, setRideData] = useState<RideData>({
    speed: 0,
    distance: 0,
    time: 0,
    elevation: 25,
    position: { lat: INITIAL_LAT, lng: INITIAL_LNG },
    battery: 100,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (rideStatus === 'active') {
      interval = setInterval(() => {
        setRideData((prev) => {
          const newSpeed = Math.max(0, prev.speed + (Math.random() - 0.48) * 4);
          const cappedSpeed = Math.min(newSpeed, 35);
          const distanceIncrement = cappedSpeed / 3600; // km per second
          const newDistance = prev.distance + distanceIncrement;
          const newTime = prev.time + 1;
          const newElevation = prev.elevation + (Math.random() - 0.5) * 0.5;
          const newLat = prev.position.lat + (Math.random() - 0.5) * 0.0001;
          const newLng = prev.position.lng + (Math.random() - 0.5) * 0.0001;
          const batteryDrain = 0.01 + (cappedSpeed / 25) * 0.05;
          const newBattery = Math.max(0, prev.battery - batteryDrain);

          return {
            speed: cappedSpeed,
            distance: newDistance,
            time: newTime,
            elevation: newElevation,
            position: { lat: newLat, lng: newLng },
            battery: newBattery,
          };
        });
      }, 1000);
    } else if (rideStatus === 'stopped') {
        setRideData({
            speed: 0,
            distance: 0,
            time: 0,
            elevation: 25,
            position: { lat: INITIAL_LAT, lng: INITIAL_LNG },
            battery: 100,
        });
    } else if (rideStatus === 'paused') {
      setRideData(prev => ({ ...prev, speed: 0 }));
    }

    return () => {
      if(interval) clearInterval(interval);
    };
  }, [rideStatus]);

  const startRide = useCallback(() => setRideStatus('active'), []);
  const pauseRide = useCallback(() => setRideStatus('paused'), []);
  const stopRide = useCallback(() => setRideStatus('stopped'), []);

  return { rideStatus, rideData, startRide, pauseRide, stopRide };
}
