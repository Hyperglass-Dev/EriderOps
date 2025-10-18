'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { scooterModels } from '@/lib/scooter-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Zap } from 'lucide-react';

export default function OnboardingPage() {
  const [selectedScooter, setSelectedScooter] = useState('');
  const [profileName, setProfileName] = useState('My Scooter');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const brands = [...new Set(scooterModels.map(model => model.brand))];

  const handleComplete = async () => {
    if (!user || !selectedScooter) return;

    setLoading(true);
    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        defaultProfile: 'profile1',
        profiles: {
          profile1: {
            name: profileName,
            scooterModelId: selectedScooter,
            createdAt: new Date().toISOString(),
          }
        }
      });

      toast({
        title: 'Profile created!',
        description: 'Welcome to E-RiderOps',
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Setup failed',
        description: 'Could not create your profile',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-headline">Welcome to E-RiderOps</CardTitle>
          <CardDescription>Let's set up your first ride profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="profile-name">Profile Name</Label>
            <Input
              id="profile-name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="My Scooter"
            />
          </div>

          <div className="space-y-2">
            <Label>Select Your Scooter</Label>
            <Select onValueChange={setSelectedScooter} value={selectedScooter}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your scooter model" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
                {brands.map(brand => (
                  <div key={brand}>
                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{brand}</div>
                    {scooterModels.filter(model => model.brand === brand).map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleComplete} 
            className="w-full" 
            disabled={!selectedScooter || loading}
          >
            {loading ? 'Setting up...' : 'Complete Setup'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
