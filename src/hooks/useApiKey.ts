import { useState, useEffect } from "react";

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("hf_api_key");
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const saveApiKey = (key: string) => {
    localStorage.setItem("hf_api_key", key);
    setApiKey(key);
  };

  const clearApiKey = () => {
    localStorage.removeItem("hf_api_key");
    setApiKey(null);
  };

  return {
    apiKey,
    saveApiKey,
    clearApiKey,
    hasApiKey: !!apiKey,
  };
};
