import React from "react";
import { Cloud, MapPin, Calendar, Clock } from "lucide-react";

export const WelcomeMessage: React.FC = () => {
  const exampleQueries = [
    "What's the weather like in Hyderabad tomorrow?",
    "Will it rain in Delhi this afternoon?",
    "Weather in Mumbai next Monday morning",
    "Should I bring a jacket to Paris tonight?",
  ];

  return (
    <div className="welcome-container">
      <div className="mb-8">
        <div className="welcome-icon">
          <div className="welcome-icon-bg">
            <Cloud size={32} className="text-white" />
          </div>
        </div>
        <h1 className="welcome-title">Smart Weather Assistant</h1>
        <p className="welcome-subtitle">
          Ask me about weather in natural language. I'll understand your
          question and provide detailed forecasts with helpful advice.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-item">
          <MapPin size={16} className="feature-icon" />
          <span>Any city worldwide</span>
        </div>
        <div className="feature-item">
          <Calendar size={16} className="feature-icon" />
          <span>Up to 7 days ahead</span>
        </div>
        <div className="feature-item">
          <Clock size={16} className="feature-icon" />
          <span>Specific times of day</span>
        </div>
        <div className="feature-item">
          <Cloud size={16} className="feature-icon" />
          <span>Smart recommendations</span>
        </div>
      </div>

      <div className="examples-section">
        <h3 className="examples-title">Try asking:</h3>
        <div className="examples-list">
          {exampleQueries.map((query, index) => (
            <div key={index} className="example-query">
              "{query}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
