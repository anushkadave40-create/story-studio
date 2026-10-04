export interface ComfyUIStatus {
  available: boolean;
  baseUrl: string;
  systemStats?: any;
  error?: string;
  recommendedModels: {
    name: string;
    description: string;
    type: string;
    vramRequired: string;
  }[];
  setupInstructions: {
    title: string;
    steps: string[];
    commands: string[];
  };
}

export interface ComfyUIGenerateOptions {
  prompt: string;
  negativePrompt?: string;
  aspectRatio: "9:16" | "16:9";
  durationSeconds: 4 | 8;
  resolution?: "720p" | "1080p";
  sceneNumber: number;
  sceneHeading: string;
}

export interface ComfyUIPollResult {
  status: "processing" | "completed" | "failed";
  progress?: number;
  videoUrl?: string;
  localFilename?: string;
  targetFile?: { filename: string; subfolder: string; type: string };
  error?: string;
}

export class ComfyUIClient {
  public baseUrl: string;

  constructor(baseUrl = process.env.COMFYUI_BASE_URL || "http://127.0.0.1:8188") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  static getSetupInstructions() {
    return {
      title: "Local ComfyUI Video Setup",
      steps: [
        "1. Keep ComfyUI Desktop running; Story Studio connects to its local server at 127.0.0.1:8188.",
        "2. In ComfyUI Desktop, install the LTX-Video checkpoint ltx-video-2b-v0.9.5.safetensors under models/checkpoints/.",
        "3. Install the T5 encoder t5xxl_fp16.safetensors under models/text_encoders/.",
        "4. Story Studio uses ComfyUI's built-in video export when available; otherwise install VideoHelperSuite from Extensions.",
        "5. Return to Story Studio, click Test Connection, select a generated scene, and try video generation."
      ],
      commands: []
    };
  }

  static getRecommendedModels() {
    return [
      {
        name: "LTX-Video (LightTricks Open-Source 2B)",
        description: "State-of-the-art fast open-source video foundation model. Highly recommended for consumer GPUs and Apple Silicon M-series Macs.",
        type: "DiT Video Diffusion",
        vramRequired: "8GB - 12GB VRAM"
      },
      {
        name: "Wan2.1 (Wan-AI Open-Source Video)",
        description: "High-fidelity motion and cinematic lighting with outstanding text-to-video alignment.",
        type: "Video Diffusion",
        vramRequired: "12GB - 16GB VRAM"
      },
      {
        name: "AnimateDiff-Evolved (with SD1.5 or SDXL)",
        description: "Versatile community motion module for stylized, cinematic short-form drama shots.",
        type: "Motion Adapter",
        vramRequired: "6GB - 10GB VRAM"
      }
    ];
  }

  async checkStatus(): Promise<ComfyUIStatus> {
    const setupInstructions = ComfyUIClient.getSetupInstructions();
    const recommendedModels = ComfyUIClient.getRecommendedModels();

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.baseUrl}/system_stats`, {
        signal: controller.signal,
        headers: { Accept: "application/json" }
      });
      clearTimeout(timeout);

      if (!res.ok) {
        return {
          available: false,
          baseUrl: this.baseUrl,
          error: `ComfyUI responded with HTTP ${res.status}`,
          setupInstructions,
          recommendedModels
        };
      }

      const stats = await res.json();
      return {
        available: true,
        baseUrl: this.baseUrl,
        systemStats: stats,
        setupInstructions,
        recommendedModels
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Connection refused";
      return {
        available: false,
        baseUrl: this.baseUrl,
        error: `Could not reach ComfyUI at ${this.baseUrl} (${msg}). Is ComfyUI running?`,
        setupInstructions,
        recommendedModels
      };
    }
  }

  buildVideoPromptGraph(options: ComfyUIGenerateOptions, useNativeVideoExport = true) {
    const isPortrait = options.aspectRatio === "9:16";
    const width = isPortrait ? 576 : 768;
    const height = isPortrait ? 1024 : 512;
    // LTX expects 8n+1 frames. At 24fps, 97 frames is ~4s and 193 is ~8s.
    const frameCount = options.durationSeconds === 8 ? 193 : 97;
    const seed = Math.floor(Math.random() * 0xffffffff);

    const graph: Record<string, any> = {
      "1": {
        inputs: {
          ckpt_name: "ltx-video-2b-v0.9.5.safetensors"
        },
        class_type: "CheckpointLoaderSimple",
        _meta: { title: "Load LTX Video Checkpoint" }
      },
      "2": {
        inputs: {
          clip_name: "t5xxl_fp16.safetensors",
          type: "ltxv",
          device: "default"
        },
        class_type: "CLIPLoader",
        _meta: { title: "Load LTX Text Encoder" }
      },
      "3": {
        inputs: {
          text: options.prompt,
          clip: ["2", 0]
        },
        class_type: "CLIPTextEncode",
        _meta: { title: "Scene Action Prompt" }
      },
      "4": {
        inputs: {
          text: options.negativePrompt || "blurry, low quality, artifacts, watermark, distorted faces, jitter, deformed, text overlay",
          clip: ["2", 0]
        },
        class_type: "CLIPTextEncode",
        _meta: { title: "Negative Prompt" }
      },
      "5": {
        inputs: {
          width,
          height,
          length: frameCount,
          batch_size: 1
        },
        class_type: "EmptyLTXVLatentVideo",
        _meta: { title: "Empty LTX Video Latent" }
      },
      "6": {
        inputs: {
          positive: ["3", 0],
          negative: ["4", 0],
          frame_rate: 24
        },
        class_type: "LTXVConditioning",
        _meta: { title: "LTX Video Conditioning" }
      },
      "7": {
        inputs: {
          steps: 30,
          max_shift: 2.05,
          base_shift: 0.95,
          stretch: true,
          terminal: 0.1,
          latent: ["5", 0]
        },
        class_type: "LTXVScheduler",
        _meta: { title: "LTX Video Scheduler" }
      },
      "8": {
        inputs: { sampler_name: "euler" },
        class_type: "KSamplerSelect",
        _meta: { title: "LTX Sampler" }
      },
      "9": {
        inputs: {
          add_noise: true,
          noise_seed: seed,
          cfg: 3,
          sampler: ["8", 0],
          sigmas: ["7", 0],
          model: ["1", 0],
          positive: ["6", 0],
          negative: ["6", 1],
          latent_image: ["5", 0]
        },
        class_type: "SamplerCustom",
        _meta: { title: "LTX Video Sampler" }
      },
      "10": {
        inputs: {
          samples: ["9", 0],
          vae: ["1", 2]
        },
        class_type: "VAEDecode",
        _meta: { title: "VAE Decode (Frames)" }
      },
    };

    if (useNativeVideoExport) {
      graph["11"] = {
        inputs: { images: ["10", 0], fps: 24 },
        class_type: "CreateVideo",
        _meta: { title: "Create MP4 Video" }
      };
      graph["12"] = {
        inputs: {
          video: ["11", 0],
          filename_prefix: `story_studio_scene_${options.sceneNumber}_${Date.now()}`,
          format: "mp4",
          codec: "h264"
        },
        class_type: "SaveVideo",
        _meta: { title: "Save Video (MP4)" }
      };
    } else {
      graph["11"] = {
        inputs: {
          frame_rate: 24,
          loop_count: 0,
          filename_prefix: `story_studio_scene_${options.sceneNumber}_${Date.now()}`,
          format: "video/h264-mp4",
          pingpong: false,
          pix_fmt: "yuv420p",
          crf: 20,
          save_metadata: true,
          trim_to_audio: false,
          save_output: true,
          images: ["10", 0]
        },
        class_type: "VHS_VideoCombine",
        _meta: { title: "Save Video (MP4)" }
      }
    }

    return graph;
  }

  async queuePrompt(options: ComfyUIGenerateOptions): Promise<{ promptId: string }> {
    const objectInfo = await this.getObjectInfo();
    const hasNativeVideoExport = Boolean(objectInfo?.CreateVideo && objectInfo?.SaveVideo);
    const hasVideoHelperSuite = Boolean(objectInfo?.VHS_VideoCombine);
    if (objectInfo && !hasNativeVideoExport && !hasVideoHelperSuite) {
      throw new Error("Your ComfyUI has no video export nodes. Update ComfyUI Desktop, or install VideoHelperSuite from Extensions, then restart ComfyUI.");
    }

    const promptGraph = this.buildVideoPromptGraph(options, hasNativeVideoExport);
    await this.validateWorkflowPrerequisites(promptGraph, objectInfo);
    const clientId = `story-studio-${Date.now()}`;

    const res = await fetch(`${this.baseUrl}/prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: promptGraph,
        client_id: clientId
      })
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      const detail = errText || res.statusText;
      if (detail.includes("missing_node_type")) {
        let node = "an LTX video node";
        try {
          const parsed = JSON.parse(detail);
          node = parsed.error?.extra_info?.class_type || node;
        } catch {
          // Keep the generic node label when ComfyUI returns non-JSON error text.
        }
        throw new Error(`Your ComfyUI installation is missing ${node}. Update ComfyUI to the latest version, restart it, and try again. No paid service is needed.`);
      }
      if (detail.includes("CheckpointLoaderSimple") || detail.includes("t5xxl_fp16")) {
        throw new Error(`ComfyUI cannot find a required local model. Install ltx-video-2b-v0.9.5.safetensors in models/checkpoints and t5xxl_fp16.safetensors in models/text_encoders, then restart ComfyUI.`);
      }
      throw new Error(`ComfyUI rejected the video workflow (${res.status}): ${detail}`);
    }

    const data = await res.json();
    if (!data.prompt_id) {
      throw new Error("ComfyUI did not return a prompt_id");
    }

    return { promptId: data.prompt_id };
  }

  private async getObjectInfo(): Promise<Record<string, any> | undefined> {
    try {
      const res = await fetch(`${this.baseUrl}/object_info`);
      if (!res.ok) return undefined;
      return await res.json();
    } catch {
      // Use the VHS workflow if object_info cannot be read; /prompt returns details if needed.
    }
    return undefined;
  }

  private async validateWorkflowPrerequisites(graph: Record<string, any>, objectInfo?: Record<string, any>) {
    const info = objectInfo || await this.getObjectInfo();
    if (!info) return;

    const requiredNodeTypes = [...new Set(Object.values(graph).map((node: any) => node.class_type))];
    const missingNodes = requiredNodeTypes.filter((type) => !info[type]);
    if (missingNodes.length) {
      throw new Error(`ComfyUI is missing required nodes: ${missingNodes.join(", ")}. Update ComfyUI Desktop or install the missing custom nodes from Extensions, then restart ComfyUI.`);
    }

    const missingModels: string[] = [];
    const checkpointOptions = info.CheckpointLoaderSimple?.input?.required?.ckpt_name?.[0];
    if (Array.isArray(checkpointOptions) && !checkpointOptions.includes("ltx-video-2b-v0.9.5.safetensors")) {
      missingModels.push("ltx-video-2b-v0.9.5.safetensors in models/checkpoints");
    }
    const encoderOptions = info.CLIPLoader?.input?.required?.clip_name?.[0];
    if (Array.isArray(encoderOptions) && !encoderOptions.includes("t5xxl_fp16.safetensors")) {
      missingModels.push("t5xxl_fp16.safetensors in models/text_encoders");
    }
    if (missingModels.length) {
      throw new Error(`ComfyUI is running, but these local model files are not installed: ${missingModels.join("; ")}. Add them in ComfyUI Desktop and restart it.`);
    }
  }

  getViewUrl(file: { filename: string; subfolder?: string; type?: string }): string {
    return `${this.baseUrl}/view?filename=${encodeURIComponent(file.filename)}&subfolder=${encodeURIComponent(file.subfolder || "")}&type=${encodeURIComponent(file.type || "output")}`;
  }

  async pollHistory(promptId: string): Promise<ComfyUIPollResult> {
    const res = await fetch(`${this.baseUrl}/history/${promptId}`);
    if (!res.ok) {
      return { status: "processing" };
    }

    const data = await res.json();
    const promptRun = data[promptId];

    if (!promptRun) {
      return { status: "processing" };
    }

    if (promptRun.status && promptRun.status.status_str === "error") {
      const errorMsg = promptRun.status.messages
        ? JSON.stringify(promptRun.status.messages)
        : "ComfyUI generation failed";
      return { status: "failed", error: errorMsg };
    }

    // Look for video outputs
    const outputs = promptRun.outputs || {};
    let targetFile: { filename: string; subfolder: string; type: string } | null = null;

    for (const nodeId of Object.keys(outputs)) {
      const nodeOutput = outputs[nodeId];
      if (nodeOutput.gifs && nodeOutput.gifs.length > 0) {
        targetFile = nodeOutput.gifs[0];
        break;
      }
      if (nodeOutput.videos && nodeOutput.videos.length > 0) {
        targetFile = nodeOutput.videos[0];
        break;
      }
      if (nodeOutput.images && nodeOutput.images.length > 0) {
        targetFile = nodeOutput.images[0];
        break;
      }
    }

    if (!targetFile) {
      if (promptRun.status?.completed) {
        return { status: "completed" };
      }
      return { status: "processing" };
    }

    const viewUrl = this.getViewUrl(targetFile);

    return {
      status: "completed",
      videoUrl: viewUrl,
      localFilename: targetFile.filename,
      targetFile
    };
  }
}

export function synthesizeLocalVideoPrompt(scene: {
  sceneNumber: number;
  heading: string;
  visualDescription: string;
  cameraPacing: string;
  lightingAudio: string;
  scriptSnippet?: string;
  tone?: string;
}): string {
  const parts: string[] = [];

  parts.push("Cinematic short-form drama shot");
  if (scene.heading) {
    parts.push(`Setting: ${scene.heading}`);
  }
  if (scene.visualDescription) {
    parts.push(`Action: ${scene.visualDescription}`);
  }
  if (scene.cameraPacing) {
    parts.push(`Camera Movement: ${scene.cameraPacing}`);
  }
  if (scene.lightingAudio) {
    parts.push(`Lighting: ${scene.lightingAudio}`);
  }
  if (scene.tone) {
    parts.push(`Atmosphere: ${scene.tone}`);
  }

  parts.push("photorealistic, 8k resolution, highly detailed, film grain, steady motion");

  return parts.join(". ");
}
