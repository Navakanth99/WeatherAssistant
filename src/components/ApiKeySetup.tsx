import React, { useState } from "react";
import { Key, ExternalLink, AlertCircle } from "lucide-react";

interface ApiKeySetupProps {
  onApiKeySet: (apiKey: string) => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <div className="text-center mb-6">
          <div className="setup-icon">
            <Key size={24} />
          </div>
          <h1 className="setup-title">Setup Required</h1>
          <p className="setup-subtitle">
            Enter your Hugging Face API key to get started
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="apiKey" className="form-label">
              Hugging Face API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="hf_..."
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="submit-button"
          >
            Start Chatting
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="instructions-toggle"
          >
            <AlertCircle size={16} />
            How to get API key?
          </button>

          {showInstructions && (
            <div className="instructions-content">
              <ol className="instructions-list">
                <li>
                  1. Visit{" "}
                  <a
                    href="https://huggingface.co/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instructions-link"
                  >
                    Hugging Face Tokens <ExternalLink size={12} />
                  </a>
                </li>
                <li>2. Click "New token"</li>
                <li>3. Give it a name and select "Read" permissions</li>
                <li>4. Copy the token and paste it above</li>
              </ol>
              <div className="warning-box">
                <p className="warning-text">
                  ⚠️ This is for learning purposes only. In production, API keys
                  should be secured on the backend.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
