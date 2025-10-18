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
import { analyzeRideAndSuggest } from '@/ai/flows/ride-analysis-and-suggestions';
import { useToast } from '@/hooks/use-toast';
import type { RideData } from '@/hooks/use-ride-simulation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

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
      const rideDataString = `Distance: ${rideData.distance.toFixed(2)} km, Time: ${rideData.time}s, Avg Speed: ${(rideData.distance / (rideData.time / 3600) || 0).toFixed(1)} km/h, Elevation change: some data.`;
      const result = await analyzeRideAndSuggest({
        rideData: rideDataString,
        weatherConditions: 'Temperature: 18°C, Wind: 12 km/h NW, Partly Cloudy',
        scooterModel: scooterModel,
      });
      setAnalysis(result.suggestions);
    } catch (error) {
      console.error('AI analysis failed:', error);
      toast({
        variant: 'destructive',
        title: 'AI Analysis Failed',
        description: 'Could not generate ride suggestions. Please try again.',
      });
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
