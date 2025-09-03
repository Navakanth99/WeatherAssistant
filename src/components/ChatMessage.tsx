import React from "react";
import type { ChatMessage as ChatMessageType } from "../types/weather";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === "user";

  return (
    <div className={`message-wrapper ${isUser ? "user" : ""}`}>
      <div className={`message-avatar ${isUser ? "user" : "assistant"}`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div className={`message-bubble ${isUser ? "user" : "assistant"}`}>
        {message.isLoading ? (
          <div className="message-loading">
            <div className="loading-spinner"></div>
            <span>Analyzing weather...</span>
          </div>
        ) : (
          <p>{message.content}</p>
        )}
      </div>
    </div>
  );
};
