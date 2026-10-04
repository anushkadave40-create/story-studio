import { NextResponse } from "next/server";
import { getProviderInfo } from "@/lib/ai";
import { ComfyUIClient } from "@/lib/ai/comfyui";

export async function GET() {
  const scriptBackend = await getProviderInfo();
  const comfyClient = new ComfyUIClient();
  const videoBackend = await comfyClient.checkStatus();

  return NextResponse.json({
    status: "ok",
    isFreeLocal: true,
    scriptBackend: {
      mode: scriptBackend.mode,
      providerName: scriptBackend.providerName,
      isLive: scriptBackend.isLive,
      model: scriptBackend.model,
      baseUrl: scriptBackend.baseUrl,
      installedModels: scriptBackend.installedModels || [],
      note: scriptBackend.note
    },
    videoBackend: {
      backend: "comfyui",
      available: videoBackend.available,
      baseUrl: videoBackend.baseUrl,
      error: videoBackend.error,
      recommendedModels: videoBackend.recommendedModels
    }
  });
}
