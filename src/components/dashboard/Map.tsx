'use client';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

export function Map({ lat, lng, route }: { lat: number, lng: number, route: google.maps.DirectionsResult | null }) {
  const position = { lat, lng };

  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    return (
      <div className="h-full w-full rounded-lg overflow-hidden border border-primary/20 bg-muted flex items-center justify-center">
        <div className="text-center p-4">
          <p className="font-bold text-lg">Google Maps API Key Missing</p>
          <p className="text-sm text-muted-foreground">Please add your NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to the .env file.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-primary/20">
      <APIProvider apiKey={API_KEY} libraries={['routes', 'places']}>
        <GoogleMap
          defaultCenter={position}
          defaultZoom={15}
          center={position}
          mapId="e-rider-ops-map"
          disableDefaultUI={true}
          gestureHandling={'greedy'}
          mapTypeControl={false}
          streetViewControl={false}
        >
          <AdvancedMarker position={position}>
            <Pin 
                background={'#FFA500'}
                borderColor={'#fff'}
                glyphColor={'#000'}
            />
          </AdvancedMarker>
          {route && <DirectionsRenderer route={route} />}
        </GoogleMap>
      </APIProvider>
    </div>
  );
}


function DirectionsRenderer({ route }: { route: google.maps.DirectionsResult }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLibrary || !map) return;
    const renderer = new routesLibrary.DirectionsRenderer({ 
      map, 
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#FFA500',
        strokeOpacity: 0.8,
        strokeWeight: 6,
      }
    });
    setDirectionsRenderer(renderer);

    return () => {
        renderer.setMap(null);
    }
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setDirections(route);
  }, [directionsRenderer, route]);

  return null;
}
