import { AIProvider } from "./types";
import { GeminiAIProvider } from "./providers/gemini";
import { OpenAIAIProvider } from "./providers/openai";
import { DemoAIProvider } from "./providers/demo";

export * from "./types";
export * from "./prompts";
export * from "./validator";

export function getAIProvider(): { provider: AIProvider; mode: "gemini" | "openai" | "demo" } {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiKey) {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    return {
      provider: new GeminiAIProvider(geminiKey, model),
      mode: "gemini"
    };
  }

  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (openaiKey) {
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    return {
      provider: new OpenAIAIProvider(openaiKey, model),
      mode: "openai"
    };
  }

  return {
    provider: new DemoAIProvider(),
    mode: "demo"
  };
}

export function getProviderInfo(): {
  mode: "gemini" | "openai" | "demo";
  providerName: string;
  isLive: boolean;
} {
  const { provider, mode } = getAIProvider();
  return {
    mode,
    providerName: provider.name,
    isLive: mode !== "demo"
  };
}
