'use client';
import { useState, useEffect, useCallback } from 'react';
import { Map } from './Map';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';

export function Directions({ lat, lng }: { lat: number; lng: number }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('TWO_WHEELER');
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary]);

  const handleGetDirections = useCallback(() => {
    if (!directionsService || !origin || !destination) {
        if (!origin || !destination) {
            toast({
                variant: 'destructive',
                title: 'Missing Location',
                description: 'Please enter a starting point and destination.',
            });
        }
        return;
    };

    directionsService.route(
      {
        origin,
        destination,
        travelMode: travelMode as google.maps.TravelMode,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
          setRoute(response);
        } else {
            toast({
                variant: 'destructive',
                title: 'Directions Failed',
                description: `Could not get directions. Reason: ${status}`,
            });
        }
      }
    );
  }, [directionsService, origin, destination, travelMode, toast]);

  return (
    <>
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row gap-2">
          <Input 
            placeholder="From" 
            value={origin} 
            onChange={e => setOrigin(e.target.value)} 
            className="flex-1"
          />
          <Input 
            placeholder="To" 
            value={destination} 
            onChange={e => setDestination(e.target.value)}
            className="flex-1"
          />
          <Select onValueChange={(value) => setTravelMode(value)} defaultValue={travelMode}>
              <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Travel Mode" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="TWO_WHEELER">E-Scooter</SelectItem>
                  <SelectItem value="TRANSIT">Transit</SelectItem>
              </SelectContent>
          </Select>
          <Button onClick={handleGetDirections}>Get Directions</Button>
        </CardContent>
      </Card>
      <div className="flex-1">
        <Map lat={lat} lng={lng} route={route} />
      </div>
    </>
  );
}
