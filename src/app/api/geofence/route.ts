import { NextRequest, NextResponse } from 'next/server';

type GeofenceZone = {
  name: string;
  lat: number;
  lng: number;
  radius: number;
  speedLimit: number;
};

const geofenceZones: GeofenceZone[] = [];

function isInZone(lat: number, lng: number, zone: GeofenceZone): boolean {
  const distance = Math.sqrt(
    Math.pow(lat - zone.lat, 2) + Math.pow(lng - zone.lng, 2)
  );
  return distance < zone.radius;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = parseFloat(searchParams.get('lat') || '0');
  const lng = parseFloat(searchParams.get('lng') || '0');

  if (!lat || !lng) {
    return NextResponse.json({ inZone: false });
  }

  for (const zone of geofenceZones) {
    if (isInZone(lat, lng, zone)) {
      return NextResponse.json({
        inZone: true,
        speedLimit: zone.speedLimit,
        zoneName: zone.name,
      });
    }
  }

  return NextResponse.json({ inZone: false });
}
