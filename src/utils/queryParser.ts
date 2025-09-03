import * as chrono from "chrono-node";
import type { ExtractedInfo } from "../types/weather";

export class QueryParser {
  static parseWeatherQuery(query: string): ExtractedInfo {
    // Extract date information using chrono-node
    const parsedDates = chrono.parse(query);
    let date = new Date();

    if (parsedDates.length > 0) {
      date = parsedDates[0].start.date();
    }

    // Extract time of day
    const timeOfDay = this.extractTimeOfDay(query);

    // Extract city name (simple approach - look for capitalized words)
    const city = this.extractCity(query);

    return {
      city: city || " ", // Default fallback
      date,
      timeOfDay,
    };
  }

  private static extractTimeOfDay(
    query: string
  ): "morning" | "afternoon" | "evening" | "night" | "all-day" {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes("morning") || lowerQuery.includes("am")) {
      return "morning";
    }
    if (lowerQuery.includes("afternoon") || lowerQuery.includes("noon")) {
      return "afternoon";
    }
    if (lowerQuery.includes("evening") || lowerQuery.includes("pm")) {
      return "evening";
    }
    if (lowerQuery.includes("night") || lowerQuery.includes("tonight")) {
      return "night";
    }

    return "all-day";
  }

  private static extractCity(query: string): string {
    // Simple city extraction - look for "in [City]" pattern
    const inPattern =
      /\bin\s+([A-Z][a-zA-Z\s]+?)(?:\s+(?:on|at|tomorrow|today|next|this|morning|afternoon|evening|night)|$)/i;
    const match = query.match(inPattern);

    if (match) {
      return match[1].trim();
    }

    // Fallback: look for capitalized words that might be cities
    const words = query.split(" ");
    for (const word of words) {
      if (word.length > 2 && /^[A-Z][a-z]+$/.test(word)) {
        return word;
      }
    }

    return "";
  }

  static getHourForTimeOfDay(timeOfDay: string): number {
    switch (timeOfDay) {
      case "morning":
        return 9;
      case "afternoon":
        return 15;
      case "evening":
        return 18;
      case "night":
        return 21;
      default:
        return 12;
    }
  }
}
