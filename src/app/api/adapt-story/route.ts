import { NextRequest, NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai";
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

    const params: AdaptationParams = {
      scriptToAdapt: scriptToAdapt.trim(),
      storyTitle: storyTitle?.trim() || "Untitled",
      sourceLanguage: (sourceLanguage || "English").trim(),
      targetLanguage: (targetLanguage || "Spanish (Latin America)").trim(),
      audienceRegion: audienceRegion?.trim() || undefined,
      adaptationStyle: resolvedStyle
    };

    const { provider, mode } = getAIProvider();
    const adaptation = await provider.adaptScript(params);

    return NextResponse.json({
      success: true,
      mode,
      providerName: provider.name,
      adaptation
    });
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
