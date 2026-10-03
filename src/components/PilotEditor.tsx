"use client";

import React, { useState } from "react";
import {
  MicroDramaPilot,
  Character,
  Scene
} from "@/types/story";
import {
  FileText,
  Clapperboard,
  Zap,
  Users,
  Share2,
  Copy,
  Check,
  Edit3,
  ArrowRight,
  Sparkles,
  Camera,
  Music,
  Eye,
  Sliders,
  Flame
} from "lucide-react";

interface PilotEditorProps {
  pilot: MicroDramaPilot;
  onUpdatePilot: (updated: MicroDramaPilot) => void;
  onSendToAdaptation: (script: string, title: string, sourceLang: string) => void;
  onNotify: (msg: string) => void;
}

export const PilotEditor: React.FC<PilotEditorProps> = ({
  pilot,
  onUpdatePilot,
  onSendToAdaptation,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<"screenplay" | "scenes" | "hooks" | "characters" | "promo">("screenplay");
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  // Field change helpers
  const handleScriptChange = (text: string) => {
    onUpdatePilot({ ...pilot, fullScript: text });
  };

  const handleMetadataChange = (key: keyof MicroDramaPilot, value: string) => {
    onUpdatePilot({ ...pilot, [key]: value });
  };

  const handleCharacterChange = (index: number, field: keyof Character, value: string) => {
    const updatedChars = [...pilot.characters];
    updatedChars[index] = { ...updatedChars[index], [field]: value };
    onUpdatePilot({ ...pilot, characters: updatedChars });
  };

  const handleSceneChange = (index: number, field: keyof Scene, value: string | number) => {
    const updatedScenes = [...pilot.scenes];
    updatedScenes[index] = { ...updatedScenes[index], [field]: value };
    onUpdatePilot({ ...pilot, scenes: updatedScenes });
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(pilot.fullScript);
    setCopiedScript(true);
    onNotify("Screenplay copied to clipboard!");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Title & Metadata Card */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                {pilot.genre}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                ⏱️ {pilot.episodeDuration}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                🌐 {pilot.sourceLanguage}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                🔥 {pilot.tone}
              </span>
            </div>

            {isEditingMetadata ? (
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  value={pilot.title}
                  onChange={(e) => handleMetadataChange("title", e.target.value)}
                  className="w-full text-xl font-bold bg-slate-900 text-white rounded-lg p-2 border border-indigo-500 focus:outline-none"
                  placeholder="Episode Title"
                />
                <textarea
                  value={pilot.logline}
                  onChange={(e) => handleMetadataChange("logline", e.target.value)}
                  className="w-full text-sm bg-slate-900 text-slate-300 rounded-lg p-2 border border-slate-700 focus:outline-none"
                  rows={2}
                  placeholder="One-line logline"
                />
                <textarea
                  value={pilot.synopsis}
                  onChange={(e) => handleMetadataChange("synopsis", e.target.value)}
                  className="w-full text-xs bg-slate-900 text-slate-400 rounded-lg p-2 border border-slate-700 focus:outline-none"
                  rows={3}
                  placeholder="Synopsis"
                />
                <button
                  onClick={() => setIsEditingMetadata(false)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium"
                >
                  Done Editing Metadata
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white tracking-tight">{pilot.title}</h1>
                  <button
                    onClick={() => setIsEditingMetadata(true)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Edit Title and Logline"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-sm font-medium text-slate-200 mt-1 italic leading-relaxed">
                  &ldquo;{pilot.logline}&rdquo;
                </p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-3xl">
                  {pilot.synopsis}
                </p>
              </div>
            )}
          </div>

          {/* Direct Workflow Hand-off Button */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              onClick={() => onSendToAdaptation(pilot.fullScript, pilot.title, pilot.sourceLanguage)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 transition-all"
            >
              <span>Adapt to Another Language</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleCopyScript}
              className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? "Copied Script!" : "Copy Full Script"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("screenplay")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "screenplay"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Screenplay Script</span>
        </button>

        <button
          onClick={() => setActiveTab("scenes")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "scenes"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Scene Breakdown ({pilot.scenes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("hooks")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "hooks"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span>Retention & Hooks</span>
        </button>

        <button
          onClick={() => setActiveTab("characters")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "characters"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Characters ({pilot.characters.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("promo")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "promo"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Promo Reel Hook</span>
        </button>
      </div>

      {/* Sub-Tab 1: Screenplay View / Edit */}
      {activeTab === "screenplay" && (
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Episode Screenplay ({pilot.sourceLanguage})
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Formatted in standard screenplay notation. Click inside to edit any action line or dialogue directly.
              </p>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              {pilot.fullScript.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={pilot.fullScript}
            onChange={(e) => handleScriptChange(e.target.value)}
            rows={22}
            className="w-full font-screenplay text-sm text-slate-200 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 leading-relaxed focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all shadow-inner"
            placeholder="Type or edit screenplay..."
          />
        </div>
      )}

      {/* Sub-Tab 2: Scene Breakdown */}
      {activeTab === "scenes" && (
        <div className="space-y-4">
          {pilot.scenes.map((scene, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-indigo-500/20 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/30">
                    {scene.sceneNumber}
                  </span>
                  <input
                    type="text"
                    value={scene.heading}
                    onChange={(e) => handleSceneChange(idx, "heading", e.target.value)}
                    className="font-bold text-white text-sm bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                {/* Visual */}
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Visual Description</span>
                  </div>
                  <textarea
                    value={scene.visualDescription}
                    onChange={(e) => handleSceneChange(idx, "visualDescription", e.target.value)}
                    rows={3}
                    className="w-full bg-transparent text-slate-300 focus:outline-none resize-none"
                  />
                </div>

                {/* Camera / Pacing */}
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Camera & Pacing</span>
                  </div>
                  <textarea
                    value={scene.cameraPacing}
                    onChange={(e) => handleSceneChange(idx, "cameraPacing", e.target.value)}
                    rows={3}
                    className="w-full bg-transparent text-slate-300 focus:outline-none resize-none"
                  />
                </div>

                {/* Lighting / Audio */}
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold">
                    <Music className="w-3.5 h-3.5" />
                    <span>Lighting & Audio SFX</span>
                  </div>
                  <textarea
                    value={scene.lightingAudio}
                    onChange={(e) => handleSceneChange(idx, "lightingAudio", e.target.value)}
                    rows={3}
                    className="w-full bg-transparent text-slate-300 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {scene.scriptSnippet && (
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 font-screenplay text-xs text-slate-300">
                  <span className="text-slate-500 select-none">KEY LINE: </span>
                  {scene.scriptSnippet}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Sub-Tab 3: Retention & Hooks */}
      {activeTab === "hooks" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Opening Hook */}
          <div className="glass-panel rounded-2xl p-5 border-amber-500/20 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Opening Hook</h3>
                <span className="text-[10px] text-amber-300 font-medium">First 3-5 Seconds Retention</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Visual Action:</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  {pilot.openingHook.visualAction}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Dialogue / SFX:</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 font-screenplay">
                  {pilot.openingHook.dialogueOrSFX}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Retention Driver:</span>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  {pilot.openingHook.retentionReason}
                </p>
              </div>
            </div>
          </div>

          {/* Emotional Turning Point */}
          <div className="glass-panel rounded-2xl p-5 border-indigo-500/20 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Turning Point</h3>
                <span className="text-[10px] text-indigo-300 font-medium">Mid-Episode Fulcrum</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Scene Placement:</span>
                <p className="text-indigo-300 font-semibold mt-0.5">
                  {pilot.emotionalTurningPoint.sceneReference}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">The Pivot:</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  {pilot.emotionalTurningPoint.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Stakes Inversion:</span>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  {pilot.emotionalTurningPoint.stakesShift}
                </p>
              </div>
            </div>
          </div>

          {/* Ending Cliffhanger */}
          <div className="glass-panel rounded-2xl p-5 border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ending Cliffhanger</h3>
                <span className="text-[10px] text-rose-300 font-medium">Next-Episode Binge Driver</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Closing Shock:</span>
                <p className="text-slate-200 mt-0.5 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  {pilot.endingCliffhanger.description}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Unresolved Suspense Question:</span>
                <p className="text-amber-300 font-medium mt-0.5 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  {pilot.endingCliffhanger.unresolvedQuestion}
                </p>
              </div>

              <div>
                <span className="text-slate-400 font-medium">Final Cue Before Black:</span>
                <p className="text-slate-400 mt-0.5 leading-relaxed">
                  {pilot.endingCliffhanger.nextEpisodeHook}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Tab 4: Characters */}
      {activeTab === "characters" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pilot.characters.map((char, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-5 border-slate-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <input
                    type="text"
                    value={char.name}
                    onChange={(e) => handleCharacterChange(idx, "name", e.target.value)}
                    className="font-bold text-white text-base bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={char.role}
                    onChange={(e) => handleCharacterChange(idx, "role", e.target.value)}
                    className="text-xs text-indigo-400 bg-transparent border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none block mt-0.5"
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs pt-1">
                <div>
                  <span className="text-slate-400 font-medium">Core Motivation:</span>
                  <textarea
                    value={char.motivation}
                    onChange={(e) => handleCharacterChange(idx, "motivation", e.target.value)}
                    rows={2}
                    className="w-full text-slate-200 mt-1 bg-slate-900/70 p-2 rounded-lg border border-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <span className="text-slate-400 font-medium">Secret / Narrative Flaw:</span>
                  <textarea
                    value={char.secretOrFlaw}
                    onChange={(e) => handleCharacterChange(idx, "secretOrFlaw", e.target.value)}
                    rows={2}
                    className="w-full text-slate-200 mt-1 bg-slate-900/70 p-2 rounded-lg border border-slate-800 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-Tab 5: Promotional Reel */}
      {activeTab === "promo" && (
        <div className="glass-panel rounded-2xl p-6 border-indigo-500/20 max-w-3xl space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Social Reel Hook & Caption</h3>
              <p className="text-xs text-slate-400">Ready-to-post short-form video hooks for TikTok, Shorts, and Reels.</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block mb-1">Viral Video Text Hook:</span>
              <p className="text-white text-sm font-bold bg-slate-900/90 p-3.5 rounded-xl border border-rose-500/30 text-rose-300">
                {pilot.promotionalReel.hookLine}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-1">Post Caption:</span>
              <p className="text-slate-200 bg-slate-900/90 p-3 rounded-xl border border-slate-800 leading-relaxed">
                {pilot.promotionalReel.caption}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-1">Suggested Audio Vibe:</span>
              <p className="text-indigo-300 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                🎵 {pilot.promotionalReel.suggestedAudioVibe}
              </p>
            </div>

            <div>
              <span className="text-slate-400 font-semibold block mb-1">Hashtags:</span>
              <div className="flex flex-wrap gap-1.5">
                {pilot.promotionalReel.hashtags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono">
                    #{tag.replace(/^#/, "")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
