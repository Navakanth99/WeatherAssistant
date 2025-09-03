import React, { useState } from "react";
import type { KeyboardEvent } from "react";
import { Send, Mic } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
}) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <div className="chat-input-wrapper">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about weather... (e.g., 'What's the weather like in Hyderabad tomorrow afternoon?')"
            disabled={disabled}
            className="chat-input"
          />
          <button type="button" className="mic-button">
            <Mic size={16} />
          </button>
        </div>

        <button
          onClick={handleSend}
          disabled={!input.trim() || disabled}
          className="send-button"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
