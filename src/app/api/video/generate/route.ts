import { NextRequest, NextResponse } from "next/server";
import { ComfyUIClient } from "@/lib/ai/comfyui";
import { VideoPromptSettings } from "@/types/story";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sceneNumber, sceneHeading, prompt, aspectRatio, durationSeconds } = body;

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "A video prompt is required to generate video." },
        { status: 400 }
      );
    }

    const client = new ComfyUIClient();
    const status = await client.checkStatus();

    if (!status.available) {
      return NextResponse.json(
        {
          success: false,
          error: "Local ComfyUI backend is not running at " + status.baseUrl + ". Video generation runs locally and requires ComfyUI to be active.",
          setupInstructions: status.setupInstructions,
          recommendedModels: status.recommendedModels
        },
        { status: 503 }
      );
    }

    const validAspectRatio: "9:16" | "16:9" = aspectRatio === "16:9" ? "16:9" : "9:16";
    const validDuration: 4 | 8 = durationSeconds === 8 ? 8 : 4;

    const settings: VideoPromptSettings = {
      sceneNumber: typeof sceneNumber === "number" ? sceneNumber : 1,
      sceneHeading: String(sceneHeading || "Scene 1"),
      prompt: prompt.trim(),
      aspectRatio: validAspectRatio,
      durationSeconds: validDuration,
      resolution: "720p",
      workflow: "LTX-Video / Open-Source Video"
    };

    const { promptId } = await client.queuePrompt({
      prompt: settings.prompt,
      aspectRatio: validAspectRatio,
      durationSeconds: validDuration,
      sceneNumber: settings.sceneNumber,
      sceneHeading: settings.sceneHeading
    });

    return NextResponse.json({
      success: true,
      jobId: `comfy-job-${promptId}`,
      promptId,
      backend: "comfyui",
      settings
    });
  } catch (error: unknown) {
    console.error("Local ComfyUI generation launch error:", error);
    const message = error instanceof Error ? error.message : "Failed to queue video in local ComfyUI.";
    return NextResponse.json(
      {
        success: false,
        error: message
      },
      { status: 500 }
    );
  }
}
