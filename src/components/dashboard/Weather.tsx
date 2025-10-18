'use client'
import { useState, useEffect } from 'react';
import { Wind, Thermometer, Cloud, Trees, Sun, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { RideData } from '@/hooks/use-ride-simulation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type WeatherProps = {
    rideData: RideData
}

export function Weather({ rideData }: WeatherProps) {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [airQualityData, setAirQualityData] = useState<any>(null);
  const [pollenData, setPollenData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!rideData.position) {
        setLoading(false);
        return;
    }

    const fetchData = async () => {
      setLoading(true);
      setFetchError(false);
      try {
        const location = {
            "latitude": rideData.position.lat,
            "longitude": rideData.position.lng
        };

        console.log('Fetching weather for location:', location);

        const response = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ location }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Weather API error:', response.status, errorText);
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        console.log('Weather API response:', data);

        if (data.weather) {
          setWeatherData(data.weather);
        }

        if (data.airQuality) {
          setAirQualityData(data.airQuality);
        }

        if (data.pollen && data.pollen.dailyForecasts) {
          setPollenData(data.pollen.dailyForecasts[0]);
        }

      } catch (error) {
        console.error('Failed to fetch environmental data:', error);
        setFetchError(true);
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
        {fetchError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Live Data Fetch Failed</AlertTitle>
            <AlertDescription>
              Could not load live environmental data. This is likely an API key configuration issue. Please check your Google Cloud project to ensure your API key is correctly set up with the right HTTP referrers and that the Weather, Air Quality, and Pollen APIs are enabled.
            </AlertDescription>
          </Alert>
        )}

        {(!fetchError && !loading) && (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
