import React from "react";
import { useApiKey } from "./hooks/useApiKey";
import { HuggingFaceService } from "./services/huggingface";
import { ChatContainer } from "./components/ChatContainer";
import { ApiKeySetup } from "./components/ApiKeySetup";

function App() {
  const { apiKey, saveApiKey, hasApiKey } = useApiKey();

  const handleApiKeySet = (key: string) => {
    HuggingFaceService.setApiKey(key);
    saveApiKey(key);
  };

  // Set API key on mount if available
  React.useEffect(() => {
    if (apiKey) {
      HuggingFaceService.setApiKey(apiKey);
    }
  }, [apiKey]);

  if (!hasApiKey) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  return <ChatContainer />;
}

export default App;
