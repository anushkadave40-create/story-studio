import { AIProvider } from "../types";
import {
  MicroDramaPilot,
  StoryAdaptation,
  PilotGenerationParams,
  AdaptationParams
} from "@/types/story";
import { buildPilotPrompt, buildAdaptationPrompt } from "../prompts";
import { validateAndCleanPilot, validateAndCleanAdaptation } from "../validator";

export class GeminiAIProvider implements AIProvider {
  name = "Google Gemini Live AI (Gemini 2.5 Flash)";
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = "gemini-2.5-flash") {
    this.apiKey = apiKey;
    this.model = model;
  }

  get isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  private async callGemini(prompt: string): Promise<unknown> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.75,
          topP: 0.95
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${errorText}`);
    }

    const json = await response.json();
    const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error("Gemini returned empty or malformed candidates.");
    }

    try {
      return JSON.parse(candidateText);
    } catch {
      // Try stripping markdown json fences if present
      const cleaned = candidateText.replace(/```json\s*/g, "").replace(/```\s*$/g, "").trim();
      return JSON.parse(cleaned);
    }
  }

  async generatePilot(params: PilotGenerationParams): Promise<MicroDramaPilot> {
    const prompt = buildPilotPrompt(params);
    const rawData = await this.callGemini(prompt);
    return validateAndCleanPilot(rawData, params);
  }

  async adaptScript(params: AdaptationParams): Promise<StoryAdaptation> {
    const prompt = buildAdaptationPrompt(params);
    const rawData = await this.callGemini(prompt);
    return validateAndCleanAdaptation(rawData, params);
  }
}
