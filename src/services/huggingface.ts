export class HuggingFaceService {
  private static apiKey: string = "";

  static setApiKey(key: string) {
    this.apiKey = key;
  }

  private static readonly BASE_URL =
    "https://api-inference.huggingface.co/models";

  static async extractEntities(text: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/dbmdz/bert-large-cased-finetuned-conll03-english`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: text }),
        }
      );

      if (!response.ok) {
        throw new Error("NER API request failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Hugging Face NER error:", error);
      return [];
    }
  }

  static async generateWeatherSummary(
    city: string,
    date: string,
    weatherData: any
  ): Promise<string> {
    const prompt = `Weather in ${city} on ${date}: ${weatherData.temperature}°C, ${weatherData.description}, ${weatherData.humidity}% humidity, ${weatherData.windSpeed} km/h wind, ${weatherData.precipitation}% rain chance. Give friendly advice in 50 words.`;

    try {
      const response = await fetch(
        `${this.BASE_URL}/microsoft/DialoGPT-medium`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 100,
              temperature: 0.7,
              do_sample: true,
            },
          }),
        }
      );

      if (!response.ok) {
        return this.getFallbackSummary(city, weatherData);
      }

      const result = await response.json();
      return (
        result.generated_text || this.getFallbackSummary(city, weatherData)
      );
    } catch (error) {
      console.error("Hugging Face LLM error:", error);
      return this.getFallbackSummary(city, weatherData);
    }
  }

  private static getFallbackSummary(city: string, weatherData: any): string {
    const temp = weatherData.temperature;
    const description = weatherData.description;

    let advice = "";
    if (temp < 0) {
      advice =
        "Bundle up with warm layers, gloves, and a hat! Perfect weather for hot cocoa indoors. ❄️";
    } else if (temp < 10) {
      advice =
        "Dress warmly with a jacket or coat. Great weather for a brisk walk! 🧥";
    } else if (temp < 20) {
      advice =
        "A light jacket or sweater should be perfect. Ideal for outdoor activities! 👕";
    } else if (temp < 30) {
      advice =
        "Comfortable clothing, maybe a light shirt. Perfect weather for anything! 👔";
    } else {
      advice =
        "Light, breathable clothing recommended! Stay hydrated and seek shade. ☀️";
    }

    if (weatherData.precipitation > 70) {
      advice += " Don't forget an umbrella - high chance of rain! ☔";
    } else if (weatherData.precipitation > 30) {
      advice += " Maybe bring an umbrella just in case. 🌦️";
    }

    return `${description} with pleasant ${temp}°C weather. ${advice} Have a wonderful time in ${city}!`;
  }
}
