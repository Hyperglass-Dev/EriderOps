'use client'
import { useState, useEffect } from 'react';
import { Wind, Thermometer, Cloud, Trees, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RideData } from '@/hooks/use-ride-simulation';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

type WeatherProps = {
    rideData: RideData
}

export function Weather({ rideData }: WeatherProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [pollenData, setPollenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE" || !rideData.position) {
        setLoading(false);
        return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY
        };
        
        const location = {
            "latitude": rideData.position.lat,
            "longitude": rideData.position.lng
        };

        // Fetch all data in parallel
        const [weatherRes, airQualityRes, pollenRes] = await Promise.allSettled([
          fetch('https://weather.googleapis.com/v1/currentConditions:lookup', {
            method: 'POST',
            headers,
            body: JSON.stringify({ location }),
          }),
          fetch('https://airquality.googleapis.com/v1/currentConditions:lookup', {
            method: 'POST',
            headers,
            body: JSON.stringify({ location }),
          }),
          fetch('https://pollen.googleapis.com/v1/forecast:lookup?days=1', {
            method: 'POST',
            headers,
            body: JSON.stringify({ location }),
          }),
        ]);

        if (weatherRes.status === 'fulfilled' && weatherRes.value.ok) {
            const data = await weatherRes.value.json();
            setWeatherData(data);
        } else {
            console.error("Failed to fetch weather data", weatherRes.status === 'fulfilled' ? await weatherRes.value.text() : weatherRes.reason);
        }

        if (airQualityRes.status === 'fulfilled' && airQualityRes.value.ok) {
            const data = await airQualityRes.value.json();
            setAirQualityData(data);
        } else {
             console.error("Failed to fetch air quality data", airQualityRes.status === 'fulfilled' ? await airQualityRes.value.text() : airQualityRes.reason);
        }

        if (pollenRes.status === 'fulfilled' && pollenRes.value.ok) {
            const data = await pollenRes.value.json();
            // We only care about the first day forecast
            setPollenData(data.dailyForecasts[0]);
        } else {
             console.error("Failed to fetch pollen data", pollenRes.status === 'fulfilled' ? await pollenRes.value.text() : pollenRes.reason);
        }

      } catch (error) {
        console.error('Failed to fetch environmental data:', error);
        toast({
          variant: 'destructive',
          title: 'Failed to load live data',
          description: 'Could not fetch weather, air quality, or pollen data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rideData.position.lat, rideData.position.lng, toast]);
  
  if (loading) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Weather & Environment</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Loading live data...</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weather & Environment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {weatherData ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-muted-foreground" />
                <span>Temperature</span>
              </div>
              <span className="font-bold">{weatherData.currentConditions.temperature.toFixed(0)}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-muted-foreground" />
                <span>Wind</span>
              </div>
              <span className="font-bold">{weatherData.currentConditions.wind.speed.toFixed(0)} km/h {weatherData.currentConditions.wind.direction}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-muted-foreground" />
                <span>Conditions</span>
              </div>
              <span className="font-bold">{weatherData.currentConditions.shortDescription}</span>
            </div>
          </>
        ) : <p className="text-sm text-muted-foreground">Weather data unavailable.</p>}

        {airQualityData ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-muted-foreground" />
              <span>Air Quality (AQI)</span>
            </div>
            <span className="font-bold">{airQualityData.indexes[0].aqi} ({airQualityData.indexes[0].category})</span>
          </div>
        ) : <p className="text-sm text-muted-foreground">Air quality data unavailable.</p>}

        {pollenData ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trees className="h-5 w-5 text-muted-foreground" />
                <span>Tree Pollen</span>
              </div>
              <span className="font-bold">{pollenData.pollenForecast.find((p:any) => p.type === 'TREE')?.indexInfo?.category || 'N/A'}</span>
            </div>
          </>
        ) : <p className="text-sm text-muted-foreground">Pollen data unavailable.</p>}
      </CardContent>
    </Card>
  );
}
