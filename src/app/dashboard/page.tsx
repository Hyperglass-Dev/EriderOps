'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, Map, Settings, LogOut, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RideTab } from '@/components/dashboard/tabs/RideTab';
import { NavigationTab } from '@/components/dashboard/tabs/NavigationTab';
import { SettingsTab } from '@/components/dashboard/tabs/SettingsTab';
import { useRideSimulation } from '@/hooks/use-ride-simulation';
import { scooterModels } from '@/lib/scooter-data';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [selectedScooter, setSelectedScooter] = useState(scooterModels[0].id);
  const [initialBattery, setInitialBattery] = useState(100);
  const [profileLoading, setProfileLoading] = useState(true);

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
          const defaultProfile = data.profiles?.[data.defaultProfile];
          if (defaultProfile) {
            setSelectedScooter(defaultProfile.scooterModelId);
          }
        }
      } catch (error) {
        console.warn('Profile not yet created or permissions issue:', error);
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
      <header className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-headline font-bold">E-RiderOps</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={() => logout()}>
          <LogOut className="h-4 w-4" />
        </Button>
      </header>

      <Tabs defaultValue="ride" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
          <TabsTrigger value="ride" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Ride Data</span>
          </TabsTrigger>
          <TabsTrigger value="navigation" className="gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Navigation</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ride" className="flex-1 m-0">
          <RideTab
            rideData={rideData}
            rideStatus={rideStatus}
            onStart={startRide}
            onPause={pauseRide}
            onStop={stopRide}
            selectedScooter={selectedScooter}
          />
        </TabsContent>

        <TabsContent value="navigation" className="flex-1 m-0">
          <NavigationTab
            rideData={rideData}
            selectedScooter={selectedScooter}
          />
        </TabsContent>

        <TabsContent value="settings" className="flex-1 m-0">
          <SettingsTab
            selectedScooter={selectedScooter}
            onSelectScooter={setSelectedScooter}
            initialBattery={initialBattery}
            onSetInitialBattery={setInitialBattery}
            rideStatus={rideStatus}
            rideData={rideData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
