"use client";

import React, { useState } from "react";
import { Film, Sparkles, FolderDown, RotateCcw, Check, Clock, Bot, HelpCircle } from "lucide-react";

interface HeaderProps {
  projectTitle: string;
  onUpdateTitle: (title: string) => void;
  onLoadSample: () => void;
  onResetProject: () => void;
  onOpenExport: () => void;
  lastSavedTime: string | null;
  providerInfo: {
    mode: "ollama" | "demo";
    providerName: string;
    isLive: boolean;
    model?: string;
    comfyAvailable?: boolean;
  };
}

export const Header: React.FC<HeaderProps> = ({
  projectTitle,
  onUpdateTitle,
  onLoadSample,
  onResetProject,
  onOpenExport,
  lastSavedTime,
  providerInfo
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(projectTitle);
  const [showDemoInfo, setShowDemoInfo] = useState(false);

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      onUpdateTitle(titleInput.trim());
    } else {
      setTitleInput(projectTitle);
    }
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    } else if (e.key === "Escape") {
      setTitleInput(projectTitle);
      setIsEditingTitle(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Branding & Project Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
            <Film className="w-5 h-5 text-white" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-base">Story Studio</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Free & Local
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  onBlur={handleTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  autoFocus
                  className="bg-slate-900 text-white px-1.5 py-0.5 rounded border border-indigo-500/50 text-xs focus:outline-none"
                />
              ) : (
                <button
                  onClick={() => {
                    setTitleInput(projectTitle);
                    setIsEditingTitle(true);
                  }}
                  className="hover:text-white transition-colors truncate text-slate-300 font-medium text-xs flex items-center gap-1 group text-left"
                  title="Click to rename project"
                >
                  <span className="truncate">{projectTitle || "Untitled Project"}</span>
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-400">✏️</span>
                </button>
              )}

              {lastSavedTime && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500 pl-1 border-l border-slate-700/60">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Saved {lastSavedTime}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Mode Indicator */}
        <div className="relative hidden md:flex items-center">
          <button
            onClick={() => setShowDemoInfo(!showDemoInfo)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border transition-all ${
              providerInfo.isLive
                ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                : "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                providerInfo.isLive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span>{providerInfo.isLive ? `Local Ollama: ${providerInfo.model || "Connected"}` : "Offline Demo (Sample Mode)"}</span>
            <HelpCircle className="w-3.5 h-3.5 opacity-60" />
          </button>

          {showDemoInfo && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-88 p-4 rounded-xl bg-slate-900 border border-slate-700 text-xs shadow-2xl z-50 space-y-2.5">
              <div>
                <p className="font-semibold text-white mb-0.5">
                  {providerInfo.isLive ? "Local Ollama Active" : "Offline Demo Mode (Sample)"}
                </p>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {providerInfo.isLive
                    ? `Connected to Ollama on http://127.0.0.1:11434 with model '${providerInfo.model}'. Script generation runs on your local machine with zero external API calls.`
                    : "Ollama is not running. Story Studio is operating in offline demo mode. Run 'ollama run llama3.2' to generate novel scripts locally with full AI."}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                <span className="font-semibold text-indigo-300 block">Local Video Backend (ComfyUI):</span>
                <p className="text-slate-400">
                  Video synthesis connects to your local ComfyUI server (<code className="text-amber-300">http://127.0.0.1:8188</code>). Completely free with no hosted APIs or credit cards.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onLoadSample}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
            title="Load ready-to-inspect micro-drama with English pilot & Hindi (Devanagari) adaptation"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Load Sample Project</span>
            <span className="sm:hidden">Sample</span>
          </button>

          <button
            onClick={onResetProject}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-slate-400 hover:text-slate-200 transition-colors"
            title="Start new project (clears current work)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenExport}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-medium flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
            title="Export project as Markdown or JSON"
          >
            <FolderDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
