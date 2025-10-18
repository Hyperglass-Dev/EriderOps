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
          styles={[
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#556B2F" }], // Olive Green for highways
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ]}
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
