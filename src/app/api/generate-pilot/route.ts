import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai";
import { DemoAIProvider } from "@/lib/ai/providers/demo";
import { PilotGenerationParams } from "@/types/story";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { premise, genre, targetAudience, sourceLanguage, episodeDuration, tone, settingContext } = body;

    if (!premise || typeof premise !== "string" || premise.trim().length === 0) {
      return NextResponse.json(
        { error: "Story premise is required to generate a micro-drama pilot." },
        { status: 400 }
      );
    }

    const params: PilotGenerationParams = {
      premise: premise.trim(),
      genre: (genre || "Corporate Revenge Melodrama").trim(),
      targetAudience: (targetAudience || "Vertical short-form drama viewers").trim(),
      sourceLanguage: (sourceLanguage || "English").trim(),
      episodeDuration: episodeDuration === "1 min" || episodeDuration === "5 min" ? episodeDuration : "3 min",
      tone: (tone || "High Tension & Razor-Sharp Betrayal").trim(),
      settingContext: settingContext?.trim() || undefined
    };

    const { provider, mode } = getAIProvider();

    try {
      const pilot = await provider.generatePilot(params);

      return NextResponse.json({
        success: true,
        mode,
        providerName: provider.name,
        pilot
      });
    } catch (liveError: unknown) {
      // If live AI failed (e.g. invalid key, quota, timeout), fall back gracefully to Demo provider
      if (mode !== "demo") {
        console.warn("Live AI provider failed, falling back to Demo provider:", liveError);
        const demoProvider = new DemoAIProvider();
        const pilot = await demoProvider.generatePilot(params);

        const errorMessage = liveError instanceof Error ? liveError.message : "Provider connection error";

        return NextResponse.json({
          success: true,
          mode: "demo",
          providerName: demoProvider.name,
          warning: `Live AI error (${errorMessage}). Fell back to Demo Studio Engine so your workflow was not interrupted.`,
          pilot
        });
      }
      throw liveError;
    }
  } catch (error: unknown) {
    console.error("Error generating pilot:", error);
    const message = error instanceof Error ? error.message : "Failed to generate micro-drama pilot";
    return NextResponse.json(
      {
        success: false,
        error: message,
        hint: "Check server logs or provider configuration in environment variables."
      },
      { status: 500 }
    );
  }
}
