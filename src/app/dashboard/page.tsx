'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Header } from '@/components/dashboard/Header';
import { Directions } from '@/components/dashboard/Directions';
import { InfoPanel } from '@/components/dashboard/InfoPanel';
import { RideModeSelector, RideMode } from '@/components/dashboard/RideModeSelector';
import { useRideSimulation } from '@/hooks/use-ride-simulation';
import { scooterModels } from '@/lib/scooter-data';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedScooter, setSelectedScooter] = useState(scooterModels[0].id);
  const [initialBattery, setInitialBattery] = useState(100);
  const [profileLoading, setProfileLoading] = useState(true);
  const [rideMode, setRideMode] = useState<RideMode>('just-ride');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const defaultProfile = data.profiles[data.defaultProfile];
          setSelectedScooter(defaultProfile.scooterModelId);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  const { rideStatus, rideData, startRide, pauseRide, stopRide } = useRideSimulation(selectedScooter, initialBattery);

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header
        speed={rideData.speed}
        distance={rideData.distance}
        time={rideData.time}
        elevation={rideData.elevation}
      />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
        <div className="lg:col-span-2 h-[400px] lg:h-auto flex flex-col gap-4">
          <RideModeSelector 
            selectedMode={rideMode} 
            onSelectMode={setRideMode}
            disabled={rideStatus === 'active'}
          />
          <Directions 
            lat={rideData.position.lat} 
            lng={rideData.position.lng}
            rideMode={rideMode}
            rideData={rideData}
            scooterModel={selectedScooter}
          />
        </div>
        <div className="lg:col-span-1 overflow-y-auto">
          <InfoPanel
            rideStatus={rideStatus}
            rideData={rideData}
            onStart={startRide}
            onPause={pauseRide}
            onStop={stopRide}
            selectedScooter={selectedScooter}
            onSelectScooter={setSelectedScooter}
            initialBattery={initialBattery}
            onSetInitialBattery={setInitialBattery}
          />
        </div>
      </main>
    </div>
  );
}
