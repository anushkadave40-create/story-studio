import { AIProvider } from "../types";
import { PilotGenerationParams, MicroDramaPilot, AdaptationParams, StoryAdaptation } from "@/types/story";
import { buildPilotPrompt, buildAdaptationPrompt } from "../prompts";
import { validateAndCleanPilot, validateAndCleanAdaptation } from "../validator";

function parseJsonSafely(raw: string): any {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {
        return {};
      }
    }
    return {};
  }
}

export class OllamaAIProvider implements AIProvider {
  name = "Ollama Local Engine";
  isConfigured = true;
  private baseUrl: string;
  private model: string;

  constructor(
    baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
    model = process.env.OLLAMA_MODEL || "llama3.2"
  ) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.model = model;
  }

  static async checkAvailable(baseUrl = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434"): Promise<{
    available: boolean;
    models: string[];
    selectedModel: string;
  }> {
    const cleanUrl = baseUrl.replace(/\/$/, "");
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${cleanUrl}/api/tags`, {
        signal: controller.signal,
        headers: { Accept: "application/json" }
      });
      clearTimeout(timer);

      if (!res.ok) {
        return { available: false, models: [], selectedModel: "" };
      }

      const data = await res.json();
      const models: string[] = (data.models || []).map((m: { name: string }) => m.name);
      const envModel = process.env.OLLAMA_MODEL || "llama3.2";
      const selected = models.find((m) => m === envModel || m.startsWith(envModel)) || models[0] || envModel;

      return {
        available: true,
        models,
        selectedModel: selected
      };
    } catch {
      return { available: false, models: [], selectedModel: "" };
    }
  }

  async generatePilot(params: PilotGenerationParams): Promise<MicroDramaPilot> {
    const userPrompt = buildPilotPrompt(params);

    const payload = {
      model: this.model,
      messages: [
        {
          role: "system",
          content: "You are an expert micro-drama screenwriter and showrunner. Respond ONLY with a valid, parseable JSON object matching the requested schema. Do NOT include markdown code fences or conversational text."
        },
        { role: "user", content: userPrompt }
      ],
      format: "json",
      stream: false,
      options: {
        temperature: 0.7
      }
    };

    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Ollama request failed (${res.status}): ${errText || res.statusText}`);
    }

    const data = await res.json();
    const rawContent = data.message?.content || "";
    const parsed = parseJsonSafely(rawContent);

    const pilot = validateAndCleanPilot(parsed, params);
    pilot.isDemoSample = false;
    pilot.generatorModel = `Ollama: ${this.model}`;
    return pilot;
  }

  async adaptScript(params: AdaptationParams): Promise<StoryAdaptation> {
    const userPrompt = buildAdaptationPrompt(params);

    const payload = {
      model: this.model,
      messages: [
        {
          role: "system",
          content: "You are an expert multilingual cultural localization screenwriter. If targetLanguage is Hindi, all adaptedScript dialogues and adaptedTitle MUST be written in authentic Devanagari Hindi script. Respond ONLY with a valid JSON object."
        },
        { role: "user", content: userPrompt }
      ],
      format: "json",
      stream: false,
      options: {
        temperature: 0.5
      }
    };

    const res = await fetch(`${this.baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Ollama request failed (${res.status}): ${errText || res.statusText}`);
    }

    const data = await res.json();
    const rawContent = data.message?.content || "";
    const parsed = parseJsonSafely(rawContent);

    const adaptation = validateAndCleanAdaptation(parsed, params);
    adaptation.isDemoSample = false;
    adaptation.generatorModel = `Ollama: ${this.model}`;
    return adaptation;
  }
}
