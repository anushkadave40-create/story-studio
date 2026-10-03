import { NextResponse } from "next/server";
import { getProviderInfo, isPlaceholderKey } from "@/lib/ai";

export async function GET() {
  const info = getProviderInfo();
  return NextResponse.json({
    status: "ok",
    ...info,
    configuredKeys: {
      gemini: Boolean(process.env.GEMINI_API_KEY && !isPlaceholderKey(process.env.GEMINI_API_KEY)),
      openai: Boolean(process.env.OPENAI_API_KEY && !isPlaceholderKey(process.env.OPENAI_API_KEY))
    }
  });
}
