'use client'

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { RideData } from '@/hooks/use-ride-simulation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { scooterModels } from '@/lib/scooter-data';

type AiAnalysisProps = {
  rideData: RideData;
  scooterModel: string;
};

export function AiAnalysis({ rideData, scooterModel }: AiAnalysisProps) {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    setIsLoading(true);
    setAnalysis('');
    try {
      const scooterSpec = scooterModels.find(s => s.id === scooterModel);
      const avgSpeed = rideData.time > 0 ? (rideData.distance / (rideData.time / 3600)).toFixed(1) : '0';
      const estimatedEnergyUsed = scooterSpec 
        ? (rideData.distance * scooterSpec.efficiencyWhKm).toFixed(0)
        : 'unknown';
      
      const rideDataString = JSON.stringify({
        distance_km: rideData.distance.toFixed(2),
        time_seconds: rideData.time,
        avg_speed_kmh: avgSpeed,
        elevation_m: rideData.elevation.toFixed(1),
        battery_remaining_pct: rideData.battery.toFixed(0),
        estimated_energy_used_wh: estimatedEnergyUsed,
      }, null, 2);

      const scooterModelString = scooterSpec 
        ? `${scooterSpec.brand} ${scooterSpec.name} (${scooterSpec.batteryCapacityWh}Wh battery, ${scooterSpec.efficiencyWhKm}Wh/km efficiency)`
        : scooterModel;

      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Analyze my ride and provide insights and suggestions.',
          rideData: rideDataString,
          scooterModel: scooterModelString,
          weatherConditions: 'Current weather conditions',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI analysis');
      }

      const data = await response.json();
      setAnalysis(data.response);
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Analysis Failed',
        description: 'Could not generate ride suggestions. Please check your OpenAI configuration.',
      });
      setAnalysis('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">AI Ride Coach</CardTitle>
      </CardHeader>
      <CardContent>
         <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAnalysis} className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={rideData.distance === 0}>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze My Ride
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl">AI Ride Analysis</DialogTitle>
              <DialogDescription>
                Personalized tips to improve your riding efficiency and safety.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Analyzing...</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{analysis || 'Click "Analyze My Ride" to get suggestions based on your completed ride.'}</p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
