'use client';

import { useEffect, useState } from 'react';

const CRASH_THRESHOLD = 25;

export function useCrashDetection(isRiding: boolean) {
  const [crashDetected, setCrashDetected] = useState(false);

  useEffect(() => {
    if (!isRiding || typeof window === 'undefined') return;

    let lastAcceleration = { x: 0, y: 0, z: 0 };

    const handleMotion = (event: DeviceMotionEvent) => {
      if (!event.accelerationIncludingGravity) return;

      const { x, y, z } = event.accelerationIncludingGravity;
      
      if (x === null || y === null || z === null) return;

      const deltaX = Math.abs(x - lastAcceleration.x);
      const deltaY = Math.abs(y - lastAcceleration.y);
      const deltaZ = Math.abs(z - lastAcceleration.z);

      const totalDelta = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);

      if (totalDelta > CRASH_THRESHOLD) {
        setCrashDetected(true);
      }

      lastAcceleration = { x, y, z };
    };

    if (typeof DeviceMotionEvent !== 'undefined' && 'requestPermission' in DeviceMotionEvent) {
      (DeviceMotionEvent as any).requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [isRiding]);

  const resetCrashDetection = () => setCrashDetected(false);

  return { crashDetected, resetCrashDetection };
}
