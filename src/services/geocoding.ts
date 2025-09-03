import axios from "axios";
import type { GeocodingResult } from "../types/weather";

export class GeocodingService {
  private static readonly BASE_URL =
    "https://geocoding-api.open-meteo.com/v1/search";

  static async searchCity(cityName: string): Promise<GeocodingResult | null> {
    try {
      const response = await axios.get(this.BASE_URL, {
        params: {
          name: cityName,
          count: 1,
          language: "en",
          format: "json",
        },
      });

      const results = response.data.results;
      if (!results || results.length === 0) {
        return null;
      }

      const result = results[0];
      return {
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        admin1: result.admin1,
      };
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  }
}
