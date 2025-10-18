import { Wind, Thermometer, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data, in a real app this would come from an API
const weatherData = {
  temperature: 18,
  windSpeed: 12,
  windDirection: 'NW',
  description: 'Partly Cloudy',
};

export function Weather() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weather</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-muted-foreground" />
            <span>Temperature</span>
          </div>
          <span className="font-bold">{weatherData.temperature}°C</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-muted-foreground" />
            <span>Wind</span>
          </div>
          <span className="font-bold">{weatherData.windSpeed} km/h {weatherData.windDirection}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-muted-foreground" />
            <span>Conditions</span>
          </div>
          <span className="font-bold">{weatherData.description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
