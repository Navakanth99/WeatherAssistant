export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
    wind_speed_10m: number[];
    precipitation_probability: number[];
  };
}

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface ExtractedInfo {
  city: string;
  date: Date;
  timeOfDay: "morning" | "afternoon" | "evening" | "night" | "all-day";
}
