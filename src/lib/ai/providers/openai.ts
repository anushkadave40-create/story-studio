import { AIProvider } from "../types";
import {
  MicroDramaPilot,
  StoryAdaptation,
  PilotGenerationParams,
  AdaptationParams
} from "@/types/story";
import { buildPilotPrompt, buildAdaptationPrompt } from "../prompts";
import { validateAndCleanPilot, validateAndCleanAdaptation } from "../validator";

export class OpenAIAIProvider implements AIProvider {
  name = "OpenAI Live AI (gpt-4o-mini)";
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = "gpt-4o-mini") {
    this.apiKey = apiKey;
    this.model = model;
  }

  get isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  private async callOpenAI(prompt: string, systemRole: string): Promise<unknown> {
    const url = "https://api.openai.com/v1/chat/completions";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          { role: "system", content: systemRole },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const json = await response.json();
    const content = json.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("OpenAI returned an empty response.");
    }

    return JSON.parse(content);
  }

  async generatePilot(params: PilotGenerationParams): Promise<MicroDramaPilot> {
    const prompt = buildPilotPrompt(params);
    const rawData = await this.callOpenAI(
      prompt,
      "You are an expert micro-drama showrunner producing high-retention vertical short-form serials. Always respond in valid JSON."
    );
    return validateAndCleanPilot(rawData, params);
  }

  async adaptScript(params: AdaptationParams): Promise<StoryAdaptation> {
    const prompt = buildAdaptationPrompt(params);
    const rawData = await this.callOpenAI(
      prompt,
      "You are an expert localization producer and cultural dramaturg. Always respond in valid JSON."
    );
    return validateAndCleanAdaptation(rawData, params);
  }
}
