import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai";
import { DemoAIProvider } from "@/lib/ai/providers/demo";
import { AdaptationParams } from "@/types/story";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { scriptToAdapt, storyTitle, sourceLanguage, targetLanguage, audienceRegion, adaptationStyle } = body;

    if (!scriptToAdapt || typeof scriptToAdapt !== "string" || scriptToAdapt.trim().length === 0) {
      return NextResponse.json(
        { error: "A script is required to perform multilingual adaptation." },
        { status: 400 }
      );
    }

    const validStyles = ["faithful", "conversational", "locally_adapted"] as const;
    const resolvedStyle = validStyles.includes(adaptationStyle) ? adaptationStyle : "locally_adapted";
    const normSource = (sourceLanguage || "English").trim();
    const normTarget = (targetLanguage || (normSource === "Hindi" ? "English" : "Hindi")).trim();

    if (normSource !== "Hindi" && normSource !== "English") {
      return NextResponse.json(
        { error: "Unsupported source language. Story Studio supports only 'Hindi' and 'English'." },
        { status: 400 }
      );
    }

    if (normTarget !== "Hindi" && normTarget !== "English") {
      return NextResponse.json(
        { error: "Unsupported target language. Story Studio supports only 'Hindi' and 'English'." },
        { status: 400 }
      );
    }

    const params: AdaptationParams = {
      scriptToAdapt: scriptToAdapt.trim(),
      storyTitle: storyTitle?.trim() || "Untitled",
      sourceLanguage: normSource as "Hindi" | "English",
      targetLanguage: normTarget as "Hindi" | "English",
      audienceRegion: audienceRegion?.trim() || undefined,
      adaptationStyle: resolvedStyle
    };

    const { provider, mode } = await getAIProvider();

    try {
      const adaptation = await provider.adaptScript(params);

      return NextResponse.json({
        success: true,
        mode,
        providerName: provider.name,
        adaptation
      });
    } catch (liveError: unknown) {
      if (mode !== "demo") {
        console.warn("Live AI adaptation failed, falling back to Demo provider:", liveError);
        const demoProvider = new DemoAIProvider();
        const adaptation = await demoProvider.adaptScript(params);

        const errorMessage = liveError instanceof Error ? liveError.message : "Provider connection error";

        return NextResponse.json({
          success: true,
          mode: "demo",
          providerName: demoProvider.name,
          warning: `Live AI error (${errorMessage}). Fell back to Demo Studio Engine so your workflow was not interrupted.`,
          adaptation
        });
      }
      throw liveError;
    }
  } catch (error: unknown) {
    console.error("Error adapting script:", error);
    const message = error instanceof Error ? error.message : "Failed to adapt story";
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
