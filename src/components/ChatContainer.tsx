import React, { useState, useRef, useEffect } from "react";

import type { ChatMessage as ChatMessageType } from "../types/weather";
import { WeatherService } from "../services/weather";
import { GeocodingService } from "../services/geocoding";
import { HuggingFaceService } from "../services/huggingface";
import { QueryParser } from "../utils/queryParser";
import { WelcomeMessage } from "./WelcomeMessage";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };

    const loadingMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setIsLoading(true);

    try {
      // Parse the user's query
      const extractedInfo = QueryParser.parseWeatherQuery(content);

      // Get location coordinates
      const location = await GeocodingService.searchCity(extractedInfo.city);

      if (!location) {
        throw new Error(
          `Sorry, I couldn't find the city. Please try a different city name.`
        );
      }

      // Get weather data
      const weatherData = await WeatherService.getWeatherData(
        location.latitude,
        location.longitude
      );

      if (!weatherData) {
        throw new Error(
          "Sorry, I couldn't fetch the weather data right now. Please try again later."
        );
      }

      // Find the relevant hour for the requested time
      const targetHour = QueryParser.getHourForTimeOfDay(
        extractedInfo.timeOfDay
      );
      const targetDate = extractedInfo.date.toISOString().split("T")[0];

      let closestIndex = 0;
      let minDiff = Infinity;

      weatherData.hourly.time.forEach((time, index) => {
        const weatherTime = new Date(time);
        const weatherDate = weatherTime.toISOString().split("T")[0];
        const weatherHour = weatherTime.getHours();

        if (weatherDate === targetDate) {
          const hourDiff = Math.abs(weatherHour - targetHour);
          if (hourDiff < minDiff) {
            minDiff = hourDiff;
            closestIndex = index;
          }
        }
      });

      const weatherInfo = {
        temperature: Math.round(
          weatherData.hourly.temperature_2m[closestIndex]
        ),
        description: WeatherService.getWeatherDescription(
          weatherData.hourly.weather_code[closestIndex]
        ),
        emoji: WeatherService.getWeatherEmoji(
          weatherData.hourly.weather_code[closestIndex]
        ),
        humidity: weatherData.hourly.relative_humidity_2m[closestIndex],
        windSpeed: Math.round(weatherData.hourly.wind_speed_10m[closestIndex]),
        precipitation:
          weatherData.hourly.precipitation_probability[closestIndex],
      };

      // Generate AI summary
      const dateStr = extractedInfo.date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const summary = await HuggingFaceService.generateWeatherSummary(
        location.name,
        dateStr,
        weatherInfo
      );

      const responseContent = `${weatherInfo.emoji} **Weather in ${location.name}, ${location.country}**
${dateStr} (${extractedInfo.timeOfDay})

🌡️ **Temperature:** ${weatherInfo.temperature}°C
☁️ **Conditions:** ${weatherInfo.description}
💧 **Humidity:** ${weatherInfo.humidity}%
💨 **Wind:** ${weatherInfo.windSpeed} km/h
🌧️ **Rain chance:** ${weatherInfo.precipitation}%

**My advice:** ${summary}`;

      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => prev.slice(0, -1).concat(assistantMessage));
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => prev.slice(0, -1).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="container">
          <h1>Weather Assistant</h1>
          <p>Powered by AI • Open-Meteo • Hugging Face</p>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        <div className="messages-list">
          {messages.length === 0 ? (
            <WelcomeMessage />
          ) : (
            <div>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};
