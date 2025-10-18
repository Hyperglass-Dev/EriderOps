'use client';

import { useState, useEffect, useCallback } from 'react';
import { scooterModels, type ScooterModel } from '@/lib/scooter-data';

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

export function useRideSimulation(scooterId: string, initialBattery: number) {
  const [rideStatus, setRideStatus] = useState<RideStatus>('stopped');
  const [scooterSpec, setScooterSpec] = useState<ScooterModel | undefined>(scooterModels.find(s => s.id === scooterId));
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const [rideData, setRideData] = useState<RideData>({
    speed: 0,
    distance: 0,
    time: 0,
    elevation: 25,
    position: { lat: INITIAL_LAT, lng: INITIAL_LNG },
    battery: initialBattery,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setRideData(prev => ({
            ...prev,
            position: location,
          }));
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    setScooterSpec(scooterModels.find(s => s.id === scooterId));
  }, [scooterId]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (rideStatus === 'active' && scooterSpec) {
      interval = setInterval(() => {
        setRideData((prev) => {
          // Simulate speed changes
          const newSpeed = Math.max(0, prev.speed + (Math.random() - 0.48) * 4);
          const cappedSpeed = Math.min(newSpeed, 35);
          
          // Calculate distance traveled in this interval
          const distanceIncrementKm = cappedSpeed / 3600; // km per second
          
          // Calculate energy consumed in this interval
          // Formula: energy (Wh) = efficiency (Wh/km) * distance (km)
          const energyConsumedWh = scooterSpec.efficiencyWhKm * distanceIncrementKm;
          
          // Calculate battery percentage drain
          const percentageDrain = (energyConsumedWh / scooterSpec.batteryCapacityWh) * 100;
          
          const newBattery = Math.max(0, prev.battery - percentageDrain);

          // If battery is dead, stop the ride
          if (newBattery === 0) {
            setRideStatus('stopped');
          }

          const newDistance = prev.distance + distanceIncrementKm;
          const newTime = prev.time + 1;
          const newElevation = prev.elevation + (Math.random() - 0.5) * 0.5;
          const newLat = prev.position.lat + (Math.random() - 0.5) * 0.0001;
          const newLng = prev.position.lng + (Math.random() - 0.5) * 0.0001;

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
        const resetPosition = userLocation || { lat: INITIAL_LAT, lng: INITIAL_LNG };
        setRideData({
            speed: 0,
            distance: 0,
            time: 0,
            elevation: 25,
            position: resetPosition,
            battery: initialBattery,
        });
    } else if (rideStatus === 'paused') {
      setRideData(prev => ({ ...prev, speed: 0 }));
    }

    return () => {
      if(interval) clearInterval(interval);
    };
  }, [rideStatus, scooterSpec, initialBattery]);

  const startRide = useCallback(() => {
     const resetPosition = userLocation || { lat: INITIAL_LAT, lng: INITIAL_LNG };
     setRideData(prev => ({
      speed: 0,
      distance: 0,
      time: 0,
      elevation: 25,
      position: resetPosition,
      battery: prev.battery,
    }));
    setRideStatus('active')
  }, [userLocation]);

  const pauseRide = useCallback(() => setRideStatus('paused'), []);
  const stopRide = useCallback(() => setRideStatus('stopped'), []);

  const setInitialBattery = useCallback((level: number) => {
    if (rideStatus === 'stopped') {
      setRideData(prev => ({...prev, battery: level}));
    }
  }, [rideStatus]);


  useEffect(() => {
    if (rideStatus === 'stopped') {
      const resetPosition = userLocation || { lat: INITIAL_LAT, lng: INITIAL_LNG };
      setRideData({
        speed: 0,
        distance: 0,
        time: 0,
        elevation: 25,
        position: resetPosition,
        battery: initialBattery,
      });
    }
  }, [initialBattery, rideStatus, userLocation]);

  return { rideStatus, rideData, startRide, pauseRide, stopRide, setInitialBattery };
}
