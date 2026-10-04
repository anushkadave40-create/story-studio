import { NextResponse } from "next/server";
import { ComfyUIClient } from "@/lib/ai/comfyui";

export async function GET() {
  const client = new ComfyUIClient();
  const status = await client.checkStatus();

  return NextResponse.json({
    status: "ok",
    backend: "comfyui",
    available: status.available,
    baseUrl: status.baseUrl,
    error: status.error,
    supportedAspectRatios: ["9:16", "16:9"],
    supportedDurations: [4, 8],
    recommendedModels: status.recommendedModels,
    setupInstructions: status.setupInstructions
  });
}
