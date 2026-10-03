import { NextResponse } from "next/server";
import { getProviderInfo } from "@/lib/ai";

export async function GET() {
  const info = getProviderInfo();
  return NextResponse.json({
    status: "ok",
    ...info,
    configuredKeys: {
      gemini: Boolean(process.env.GEMINI_API_KEY?.trim()),
      openai: Boolean(process.env.OPENAI_API_KEY?.trim())
    }
  });
}
