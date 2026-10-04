import { NextRequest, NextResponse } from "next/server";
import { ComfyUIClient } from "@/lib/ai/comfyui";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const promptId = searchParams.get("promptId");

    if (!promptId) {
      return NextResponse.json(
        { error: "Query parameter 'promptId' is required to check ComfyUI generation status." },
        { status: 400 }
      );
    }

    const client = new ComfyUIClient();
    const result = await client.pollHistory(promptId);

    // If ComfyUI produced a file, save it to the local public/outputs folder
    if (result.status === "completed" && result.targetFile) {
      try {
        const viewUrl = client.getViewUrl(result.targetFile);
        const fileRes = await fetch(viewUrl);

        if (fileRes.ok) {
          const buffer = await fileRes.arrayBuffer();
          const outputsDir = path.join(process.cwd(), "public", "outputs");

          if (!fs.existsSync(outputsDir)) {
            fs.mkdirSync(outputsDir, { recursive: true });
          }

          const ext = path.extname(result.targetFile.filename) || ".mp4";
          const localFileName = `${promptId}${ext}`;
          const targetPath = path.join(outputsDir, localFileName);

          fs.writeFileSync(targetPath, Buffer.from(buffer));

          result.videoUrl = `/outputs/${localFileName}`;
          result.localFilename = localFileName;
        }
      } catch (saveErr) {
        console.warn("Could not save ComfyUI file locally to public/outputs:", saveErr);
      }
    }

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error: unknown) {
    console.error("ComfyUI polling error:", error);
    const message = error instanceof Error ? error.message : "Failed to poll ComfyUI operation.";
    return NextResponse.json(
      {
        success: false,
        error: message
      },
      { status: 500 }
    );
  }
}
