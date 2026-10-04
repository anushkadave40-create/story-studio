"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MicroDramaPilot,
  Scene,
  VideoGenerationJob,
  VideoPromptSettings
} from "@/types/story";
import { synthesizeLocalVideoPrompt, ComfyUIStatus } from "@/lib/ai/comfyui";
import {
  Video,
  Play,
  Download,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Film,
  Camera,
  Sliders,
  Sparkles,
  Info,
  Clock,
  Layers,
  HelpCircle,
  Eye,
  Server,
  Terminal,
  Cpu,
  FolderCheck,
  ExternalLink
} from "lucide-react";

interface VideoStudioProps {
  pilot: MicroDramaPilot | null;
  videoJobs: VideoGenerationJob[];
  onUpdateVideoJobs: (jobs: VideoGenerationJob[]) => void;
  onNotify: (msg: string, type?: "success" | "error" | "info") => void;
}

export const VideoStudio: React.FC<VideoStudioProps> = ({
  pilot,
  videoJobs,
  onUpdateVideoJobs,
  onNotify
}) => {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<"9:16" | "16:9">("9:16");
  const [durationSeconds, setDurationSeconds] = useState<4 | 8>(4);
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingComfy, setIsCheckingComfy] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  const [comfyStatus, setComfyStatus] = useState<ComfyUIStatus>({
    available: false,
    baseUrl: "http://127.0.0.1:8188",
    recommendedModels: [],
    setupInstructions: {
      title: "Local ComfyUI Setup",
      steps: [],
      commands: []
    }
  });

  const activeScene: Scene | undefined = pilot?.scenes?.[selectedSceneIndex];

  // Fetch ComfyUI status
  const checkComfyConnection = useCallback(async (notifyOnSuccess = false) => {
    setIsCheckingComfy(true);
    try {
      const res = await fetch("/api/video/status");
      const data = await res.json();
      setComfyStatus({
        available: data.available,
        baseUrl: data.baseUrl || "http://127.0.0.1:8188",
        error: data.error,
        recommendedModels: data.recommendedModels || [],
        setupInstructions: data.setupInstructions || { title: "", steps: [], commands: [] }
      });

      if (data.available) {
        if (notifyOnSuccess) onNotify("Connected to local ComfyUI successfully!", "success");
      } else {
        if (notifyOnSuccess) onNotify("ComfyUI is offline at " + (data.baseUrl || "http://127.0.0.1:8188"), "error");
      }
    } catch {
      setComfyStatus((prev) => ({ ...prev, available: false }));
      if (notifyOnSuccess) onNotify("Could not reach ComfyUI backend.", "error");
    } finally {
      setIsCheckingComfy(false);
    }
  }, [onNotify]);

  useEffect(() => {
    checkComfyConnection(false);
  }, [checkComfyConnection]);

  // Update prompt whenever active scene changes
  useEffect(() => {
    if (activeScene) {
      const synPrompt = synthesizeLocalVideoPrompt({
        sceneNumber: activeScene.sceneNumber,
        heading: activeScene.heading,
        visualDescription: activeScene.visualDescription,
        cameraPacing: activeScene.cameraPacing,
        lightingAudio: activeScene.lightingAudio,
        scriptSnippet: activeScene.scriptSnippet,
        tone: pilot?.tone
      });
      setPrompt(synPrompt);
    }
  }, [activeScene, pilot?.tone]);

  // Polling for active ComfyUI generation job
  const pollActiveJob = useCallback(
    async (job: VideoGenerationJob) => {
      if (!job.promptId || job.status !== "processing") return;

      try {
        const res = await fetch(`/api/video/poll?promptId=${encodeURIComponent(job.promptId)}`);
        const data = await res.json();

        if (data.status === "completed" && data.videoUrl) {
          const updated = videoJobs.map((j) =>
            j.id === job.id
              ? {
                  ...j,
                  status: "completed" as const,
                  videoUrl: data.videoUrl,
                  localFilename: data.localFilename,
                  completedAt: new Date().toISOString()
                }
              : j
          );
          onUpdateVideoJobs(updated);
          setActiveJobId(null);
          onNotify(`Local video generation for Scene ${job.sceneNumber} finished!`, "success");
        } else if (data.status === "failed") {
          const updated = videoJobs.map((j) =>
            j.id === job.id
              ? {
                  ...j,
                  status: "failed" as const,
                  error: data.error || "ComfyUI generation failed."
                }
              : j
          );
          onUpdateVideoJobs(updated);
          setActiveJobId(null);
          onNotify(`ComfyUI generation failed: ${data.error || "Unknown error"}`, "error");
        }
      } catch (err) {
        console.warn("Polling error for ComfyUI job:", err);
      }
    },
    [videoJobs, onUpdateVideoJobs, onNotify]
  );

  // Poll processing jobs every 3 seconds
  useEffect(() => {
    const processingJob = videoJobs.find((j) => j.status === "processing");
    if (!processingJob) return;

    const interval = setInterval(() => {
      pollActiveJob(processingJob);
    }, 3000);

    return () => clearInterval(interval);
  }, [videoJobs, pollActiveJob]);

  // Launch Local Video Generation
  const handleStartGeneration = async () => {
    if (!pilot || !activeScene) {
      onNotify("No active screenplay or scene breakdown available.", "error");
      return;
    }

    if (!comfyStatus.available) {
      onNotify("Local ComfyUI backend is offline. Start ComfyUI at http://127.0.0.1:8188 to generate video.", "error");
      setShowSetupGuide(true);
      return;
    }

    if (!prompt.trim()) {
      onNotify("Please enter a video prompt description.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/video/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sceneNumber: activeScene.sceneNumber,
          sceneHeading: activeScene.heading,
          prompt: prompt.trim(),
          aspectRatio,
          durationSeconds
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to start local ComfyUI generation.");
      }

      const newJob: VideoGenerationJob = {
        id: data.jobId,
        promptId: data.promptId,
        sceneNumber: activeScene.sceneNumber,
        sceneHeading: activeScene.heading,
        prompt: prompt.trim(),
        aspectRatio,
        durationSeconds,
        resolution: "720p",
        status: "processing",
        backend: "comfyui",
        workflowName: "LTX-Video / Open-Source Video",
        createdAt: new Date().toISOString()
      };

      const updated = [newJob, ...videoJobs];
      onUpdateVideoJobs(updated);
      setActiveJobId(newJob.id);
      onNotify(`Queued Scene ${activeScene.sceneNumber} in local ComfyUI!`, "success");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error starting video generation";
      onNotify(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRunningJob = videoJobs.find((j) => j.status === "processing");
  const completedJobs = videoJobs.filter((j) => j.status === "completed" && j.videoUrl);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Local ComfyUI Backend Status */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          comfyStatus.available
            ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
            : "bg-amber-950/20 border-amber-500/30 text-amber-200"
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                comfyStatus.available
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
              }`}
            >
              <Server className="w-5 h-5" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {comfyStatus.available
                    ? "Local ComfyUI Backend Connected"
                    : "Local ComfyUI Video Backend Offline"}
                </span>
                <span
                  className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full ${
                    comfyStatus.available
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {comfyStatus.available ? "Ready (100% Free)" : "Not Detected"}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {comfyStatus.available
                  ? `Active on ${comfyStatus.baseUrl}. Video clips will be generated entirely on your local machine using open-source models with zero API charges.`
                  : `Story Studio does not use any hosted or paid video APIs. Video generation runs locally via ComfyUI (${comfyStatus.baseUrl}). Start ComfyUI locally to enable real open-source video rendering.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center shrink-0">
            <button
              onClick={() => checkComfyConnection(true)}
              disabled={isCheckingComfy}
              className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
              title="Test connection to local ComfyUI"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingComfy ? "animate-spin text-amber-400" : ""}`} />
              <span>{isCheckingComfy ? "Checking..." : "Test Connection"}</span>
            </button>

            {!comfyStatus.available && (
              <button
                onClick={() => setShowSetupGuide(!showSetupGuide)}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{showSetupGuide ? "Hide Setup Guide" : "Setup Instructions"}</span>
              </button>
            )}
          </div>
        </div>

        {/* Expandable Setup Instructions Guide */}
        {(!comfyStatus.available || showSetupGuide) && (
          <div className="mt-4 pt-4 border-t border-amber-500/20 space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>How to start the free local ComfyUI video backend:</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="font-semibold text-indigo-300 block">Step-by-step setup:</span>
                <ol className="list-decimal list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
                  <li>Keep ComfyUI Desktop open; Story Studio connects to its local server at <code className="text-slate-400 font-mono">127.0.0.1:8188</code>.</li>
                  <li>Install <code className="text-slate-400 font-mono">ltx-video-2b-v0.9.5.safetensors</code> in <code className="text-slate-400 font-mono">models/checkpoints/</code>.</li>
                  <li>Install <code className="text-slate-400 font-mono">t5xxl_fp16.safetensors</code> in <code className="text-slate-400 font-mono">models/text_encoders/</code>.</li>
                  <li>Story Studio will use built-in video export if available; if not, install <strong>VideoHelperSuite</strong> from ComfyUI Desktop &gt; Extensions and restart.</li>
                  <li>Return here, click <strong>Test Connection</strong>, select a scene, and generate its video.</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span className="font-semibold text-purple-300 block">Recommended Open-Source Video Models:</span>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span><strong>LTX-Video (LightTricks 2B):</strong> Fast, consumer-friendly video foundation model (8-12GB VRAM or Apple Silicon Mac).</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Wan2.1:</strong> State-of-the-art open-source text-to-video diffusion model.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>AnimateDiff-Evolved:</strong> Lightweight community motion module.</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Keep ComfyUI Desktop running, then click &ldquo;Test Connection&rdquo; above. Story Studio will check the required nodes and model files before queuing a video.
            </p>
          </div>
        )}
      </div>

      {/* Main Studio Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scene Picker & Local Video Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Local Video Generation Studio</h3>
                  <span className="text-xs text-slate-400">
                    Open-source video synthesis from screenplay scene directions.
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                100% Free & Local
              </span>
            </div>

            {/* 1. Scene Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                1. Select Scene to Visualize:
              </label>

              {pilot && pilot.scenes && pilot.scenes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {pilot.scenes.map((scene, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSceneIndex(idx)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        selectedSceneIndex === idx
                          ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                          Scene {scene.sceneNumber}
                        </span>
                        {selectedSceneIndex === idx && (
                          <span className="w-2 h-2 rounded-full bg-indigo-400" />
                        )}
                      </div>
                      <p className="text-xs font-medium truncate">{scene.heading}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 text-center">
                  No screenplay scenes available yet. Generate or load a pilot in Tab 1 first.
                </div>
              )}
            </div>

            {/* Active Scene Preview Context */}
            {activeScene && (
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="font-semibold text-slate-300">Screenplay Direction:</span>
                  <span>{activeScene.heading}</span>
                </div>
                <p className="text-slate-300 leading-relaxed italic">
                  &ldquo;{activeScene.visualDescription}&rdquo;
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-slate-900">
                  <span><strong>Camera:</strong> {activeScene.cameraPacing}</span>
                  <span><strong>Lighting:</strong> {activeScene.lightingAudio}</span>
                </div>
              </div>
            )}

            {/* 2. Format & Duration Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aspect Ratio */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  2. Aspect Ratio:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAspectRatio("9:16")}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      aspectRatio === "9:16"
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">9:16 Portrait</span>
                    <span className="text-[10px] text-slate-400">Reels / Shorts / TikTok</span>
                  </button>

                  <button
                    onClick={() => setAspectRatio("16:9")}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      aspectRatio === "16:9"
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">16:9 Landscape</span>
                    <span className="text-[10px] text-slate-400">Widescreen / Web</span>
                  </button>
                </div>
              </div>

              {/* Clip Duration */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  3. Clip Duration:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDurationSeconds(4)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      durationSeconds === 4
                        ? "bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-600/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">4 Seconds</span>
                    <span className="text-[10px] text-slate-400">Quick Hook (~33 frames)</span>
                  </button>

                  <button
                    onClick={() => setDurationSeconds(8)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      durationSeconds === 8
                        ? "bg-purple-600/20 border-purple-500 text-white shadow-md shadow-purple-600/20"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="text-xs font-bold">8 Seconds</span>
                    <span className="text-[10px] text-slate-400">Scene Beat (~65 frames)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Editable Video Prompt */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  4. Synthesized Video Prompt (Editable):
                </label>
                <span className="text-[10px] text-slate-500">Auto-assembled from scene action & lighting</span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full text-xs text-slate-200 bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 leading-relaxed focus:border-indigo-500 focus:outline-none resize-none font-mono"
                placeholder="Describe cinematic camera movement, lighting, visual action..."
              />
            </div>

            {/* 4. Generation Button */}
            <div className="pt-2">
              <button
                onClick={handleStartGeneration}
                disabled={isSubmitting || !comfyStatus.available || !pilot}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  comfyStatus.available && pilot
                    ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/25 cursor-pointer"
                    : "bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Queuing Prompt in Local ComfyUI...</span>
                  </>
                ) : comfyStatus.available ? (
                  <>
                    <Film className="w-4 h-4 text-indigo-300" />
                    <span>Generate Video with Local ComfyUI (Free)</span>
                  </>
                ) : (
                  <>
                    <Server className="w-4 h-4 text-slate-500" />
                    <span>Start Local ComfyUI to Generate Video</span>
                  </>
                )}
              </button>

              {!comfyStatus.available && (
                <p className="text-[11px] text-amber-300/90 text-center mt-2">
                  ⚠️ ComfyUI is not running on {comfyStatus.baseUrl}. Video is generated only through a local open-source backend.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Local Video Preview & Outputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Job Progress Tracker if processing */}
          {activeRunningJob && (
            <div className="glass-panel rounded-3xl p-5 border border-indigo-500/40 bg-indigo-950/20 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                  Generating Scene {activeRunningJob.sceneNumber} in ComfyUI
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {activeRunningJob.promptId?.substring(0, 8)}...
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="text-[11px] text-slate-400 truncate">
                  Prompt: {activeRunningJob.prompt}
                </p>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse w-3/4" />
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  Rendering frames on your local GPU/CPU. Story Studio is polling your ComfyUI history...
                </p>
              </div>
            </div>
          )}

          {/* Generated Video Player or Status Placeholder */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-400" />
                <span>Local Video Output</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">
                {completedJobs.length} generated clip{completedJobs.length === 1 ? "" : "s"}
              </span>
            </div>

            {completedJobs.length > 0 ? (
              <div className="space-y-4">
                {/* Most recent completed video */}
                {completedJobs.slice(0, 1).map((job) => (
                  <div key={job.id} className="space-y-3">
                    <div
                      className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 mx-auto flex items-center justify-center ${
                        job.aspectRatio === "9:16" ? "max-w-[260px] aspect-[9/16]" : "w-full aspect-[16/9]"
                      }`}
                    >
                      <video
                        src={job.videoUrl}
                        controls
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata & Actions */}
                    <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">Scene {job.sceneNumber}: {job.sceneHeading}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                          COMPLETED
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>Format: {job.aspectRatio}</span>
                        <span>•</span>
                        <span>Duration: {job.durationSeconds}s</span>
                        <span>•</span>
                        <span>Backend: Local ComfyUI</span>
                      </div>

                      {job.localFilename && (
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-slate-950/60 p-1.5 rounded border border-slate-800">
                          <FolderCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">Saved locally: public/outputs/{job.localFilename}</span>
                        </div>
                      )}

                      <div className="pt-2 flex items-center gap-2">
                        <a
                          href={job.videoUrl}
                          download={`scene-${job.sceneNumber}-${job.localFilename || "video.mp4"}`}
                          className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download MP4</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 border border-dashed border-white/10 rounded-2xl bg-slate-950/40 space-y-3">
                <Film className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-xs font-bold text-slate-300">No Generated Video Yet</h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  {comfyStatus.available
                    ? "Select a scene on the left and click 'Generate Video with Local ComfyUI' to create your first open-source video clip."
                    : "Video generation is completely free and runs locally via ComfyUI. Connect your local ComfyUI server to generate video clips."}
                </p>
                <div className="text-[10px] text-slate-600 pt-1">
                  Note: Story Studio does not show fabricated sample videos. Clips are synthesized only when your local backend generates them.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
