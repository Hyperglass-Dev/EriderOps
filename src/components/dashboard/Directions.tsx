'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Map } from './Map';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '@/hooks/use-toast';
import { RideMode } from './RideModeSelector';
import { RideData } from '@/hooks/use-ride-simulation';
import { scooterModels } from '@/lib/scooter-data';

type DirectionsProps = {
  lat: number;
  lng: number;
  rideMode: RideMode;
  rideData: RideData;
  scooterModel: string;
};

export function Directions({ lat, lng, rideMode, rideData, scooterModel }: DirectionsProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState('TWO_WHEELER');
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  
  const routesLibrary = useMapsLibrary('routes');
  const placesLibrary = useMapsLibrary('places');

  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  
  const originInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (!routesLibrary) return;
    setDirectionsService(new routesLibrary.DirectionsService());
  }, [routesLibrary]);

  useEffect(() => {
    if (!placesLibrary || !originInputRef.current || !destinationInputRef.current) return;

    const autocompleteOrigin = new placesLibrary.Autocomplete(originInputRef.current);
    const autocompleteDestination = new placesLibrary.Autocomplete(destinationInputRef.current);

    autocompleteOrigin.addListener('place_changed', () => {
        const place = autocompleteOrigin.getPlace();
        if (place.formatted_address) {
            setOrigin(place.formatted_address);
        }
    });

    autocompleteDestination.addListener('place_changed', () => {
        const place = autocompleteDestination.getPlace();
        if (place.formatted_address) {
            setDestination(place.formatted_address);
        }
    });

  }, [placesLibrary]);

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
        if (status === 'OK' && response) {
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

  const handleAIPickDestination = async () => {
    const scooterSpec = scooterModels.find(s => s.id === scooterModel);
    const maxRange = scooterSpec ? (scooterSpec.batteryCapacityWh / scooterSpec.efficiencyWhKm) * (rideData.battery / 100) : 0;

    toast({
      title: 'AI analyzing...',
      description: 'Finding the perfect destination for you',
    });

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Pick me a great destination to ride to. I have ${rideData.battery.toFixed(0)}% battery remaining (estimated ${maxRange.toFixed(1)}km range). My current location is lat ${lat}, lng ${lng}. Consider scenic routes, low traffic, and interesting places within my range.`,
          rideData: JSON.stringify(rideData),
          scooterModel: scooterSpec ? `${scooterSpec.brand} ${scooterSpec.name}` : scooterModel,
        }),
      });

      const data = await response.json();
      toast({
        title: 'AI Suggestion',
        description: data.response,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'AI Pick Failed',
        description: 'Could not get AI destination suggestion',
      });
    }
  };

  return (
    <>
      {rideMode === 'directions' && (
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-2">
            <Input 
              ref={originInputRef}
              placeholder="From" 
              value={origin} 
              onChange={e => setOrigin(e.target.value)} 
              className="flex-1"
            />
            <Input 
              ref={destinationInputRef}
              placeholder="To" 
              value={destination} 
              onChange={e => setDestination(e.target.value)}
              className="flex-1"
            />
            <Select onValueChange={(value) => setTravelMode(value)} defaultValue={travelMode}>
                <SelectTrigger className="w-full md:w-[240px]">
                    <SelectValue placeholder="Travel Mode" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="TWO_WHEELER">E-Scooter</SelectItem>
                    <SelectItem value="TRANSIT">E-Scooter & Transit</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={handleGetDirections}>Get Directions</Button>
          </CardContent>
        </Card>
      )}
      
      {rideMode === 'ai-pick' && (
        <Card>
          <CardContent className="p-4">
            <Button onClick={handleAIPickDestination} className="w-full">
              Let AI Pick My Destination
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="flex-1">
        <Map lat={lat} lng={lng} route={route} />
      </div>
    </>
  );
}
