import { AIProvider } from "./types";
import { OllamaAIProvider } from "./providers/ollama";
import { DemoAIProvider } from "./providers/demo";

export * from "./types";
export * from "./prompts";
export * from "./validator";
export * from "./providers/ollama";
export * from "./providers/demo";

export interface ProviderInspection {
  mode: "ollama" | "demo";
  providerName: string;
  isLive: boolean;
  model: string;
  baseUrl?: string;
  installedModels?: string[];
  note?: string;
}

export async function getAIProvider(): Promise<{
  provider: AIProvider;
  mode: "ollama" | "demo";
  model: string;
  isLive: boolean;
}> {
  const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  const ollamaCheck = await OllamaAIProvider.checkAvailable(ollamaUrl);

  if (ollamaCheck.available) {
    const modelToUse = ollamaCheck.selectedModel || process.env.OLLAMA_MODEL || "llama3.2";
    return {
      provider: new OllamaAIProvider(ollamaUrl, modelToUse),
      mode: "ollama",
      model: modelToUse,
      isLive: true
    };
  }

  return {
    provider: new DemoAIProvider(),
    mode: "demo",
    model: "Offline Demo Engine (Sample Mode)",
    isLive: false
  };
}

export async function getProviderInfo(): Promise<ProviderInspection> {
  const ollamaUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
  const ollamaCheck = await OllamaAIProvider.checkAvailable(ollamaUrl);

  if (ollamaCheck.available) {
    const model = ollamaCheck.selectedModel || process.env.OLLAMA_MODEL || "llama3.2";
    return {
      mode: "ollama",
      providerName: `Local Ollama (${model})`,
      isLive: true,
      model,
      baseUrl: ollamaUrl,
      installedModels: ollamaCheck.models
    };
  }

  return {
    mode: "demo",
    providerName: "Offline Demo Engine (Sample Mode)",
    isLive: false,
    model: "Sample Generator",
    baseUrl: ollamaUrl,
    note: "Local Ollama is offline. Story Studio is using offline demo mode. Run 'ollama run llama3.2' to enable custom local AI script generation."
  };
}
