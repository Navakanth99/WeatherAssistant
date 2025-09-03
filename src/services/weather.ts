import axios from "axios";
import type { WeatherData } from "../types/weather";

export class WeatherService {
  private static readonly BASE_URL = "https://api.open-meteo.com/v1/forecast";

  static async getWeatherData(
    latitude: number,
    longitude: number,
    timezone: string = "auto"
  ): Promise<WeatherData | null> {
    try {
      const response = await axios.get(this.BASE_URL, {
        params: {
          latitude,
          longitude,
          hourly: [
            "temperature_2m",
            "relative_humidity_2m",
            "weather_code",
            "wind_speed_10m",
            "precipitation_probability",
          ].join(","),
          timezone,
          forecast_days: 7,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Weather API error:", error);
      return null;
    }
  }

  static getWeatherDescription(code: number): string {
    const weatherCodes: Record<number, string> = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      77: "Snow grains",
      80: "Slight rain showers",
      81: "Moderate rain showers",
      82: "Violent rain showers",
      85: "Slight snow showers",
      86: "Heavy snow showers",
      95: "Thunderstorm",
      96: "Thunderstorm with slight hail",
      99: "Thunderstorm with heavy hail",
    };

    return weatherCodes[code] || "Unknown weather";
  }

  static getWeatherEmoji(code: number): string {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 55) return "🌦️";
    if (code <= 65) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    if (code <= 86) return "❄️";
    if (code >= 95) return "⛈️";
    return "🌤️";
  }
}
