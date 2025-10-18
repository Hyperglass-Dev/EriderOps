import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export async function POST(request: NextRequest) {
  try {
    const { location } = await request.json();
    const { latitude, longitude } = location;
    
    const result: any = {};

    if (GOOGLE_API_KEY) {
      const headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_API_KEY
      };

      const airQualityRes = await fetch('https://airquality.googleapis.com/v1/currentConditions:lookup', {
        method: 'POST',
        headers,
        body: JSON.stringify({ location }),
      });

      if (airQualityRes.ok) {
        result.airQuality = await airQualityRes.json();
      } else {
        console.error('Air Quality API failed:', airQualityRes.status);
      }
    }

    if (OPENWEATHER_API_KEY) {
      console.log('Calling OpenWeatherMap API for:', latitude, longitude);
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (weatherRes.ok) {
        const data = await weatherRes.json();
        console.log('OpenWeather data received:', data);
        result.weather = {
          currentConditions: {
            temperature: data.main.temp,
            wind: {
              speed: data.wind.speed * 3.6,
              direction: getWindDirection(data.wind.deg)
            },
            shortDescription: data.weather[0].description
          }
        };
      } else {
        const errorText = await weatherRes.text();
        console.error('OpenWeather API failed:', weatherRes.status, errorText);
      }
    } else {
      console.warn('OPENWEATHER_API_KEY not configured');
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
