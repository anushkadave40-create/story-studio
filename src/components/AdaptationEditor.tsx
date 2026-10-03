"use client";

import React, { useState } from "react";
import {
  StoryAdaptation,
  ReviewFlag,
  LocalizationChoice,
  ReviewFlagStatus
} from "@/types/story";
import {
  Languages,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Bookmark,
  ShieldCheck,
  Copy,
  Check,
  Edit3,
  SlidersHorizontal,
  ChevronDown,
  Info
} from "lucide-react";

interface AdaptationEditorProps {
  adaptation: StoryAdaptation;
  onUpdateAdaptation: (updated: StoryAdaptation) => void;
  onNotify: (msg: string) => void;
}

export const AdaptationEditor: React.FC<AdaptationEditorProps> = ({
  adaptation,
  onUpdateAdaptation,
  onNotify
}) => {
  const [activeTab, setActiveTab] = useState<"script" | "flags" | "choices" | "preservation">("flags");
  const [copiedScript, setCopiedScript] = useState(false);
  const [editingFlagId, setEditingFlagId] = useState<string | null>(null);
  const [editedPhraseValue, setEditedPhraseValue] = useState("");

  const handleScriptChange = (text: string) => {
    onUpdateAdaptation({ ...adaptation, adaptedScript: text });
  };

  const handleTitleChange = (title: string) => {
    onUpdateAdaptation({ ...adaptation, adaptedTitle: title });
  };

  const handleLoglineChange = (logline: string) => {
    onUpdateAdaptation({ ...adaptation, adaptedLogline: logline });
  };

  const handleFlagStatusChange = (flagId: string, newStatus: ReviewFlagStatus) => {
    const updatedFlags = adaptation.reviewFlags.map((flag) => {
      if (flag.id === flagId) {
        return { ...flag, status: newStatus };
      }
      return flag;
    });
    onUpdateAdaptation({ ...adaptation, reviewFlags: updatedFlags });
    onNotify(`Flag marked as ${newStatus}`);
  };

  const handleSaveEditedFlag = (flagId: string) => {
    const updatedFlags = adaptation.reviewFlags.map((flag) => {
      if (flag.id === flagId) {
        return {
          ...flag,
          adaptedPhrase: editedPhraseValue.trim() || flag.adaptedPhrase,
          status: "edited" as ReviewFlagStatus
        };
      }
      return flag;
    });
    onUpdateAdaptation({ ...adaptation, reviewFlags: updatedFlags });
    setEditingFlagId(null);
    onNotify("Flag phrasing updated!");
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(adaptation.adaptedScript);
    setCopiedScript(true);
    onNotify("Adapted screenplay copied to clipboard!");
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const pendingFlagsCount = adaptation.reviewFlags.filter((f) => f.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Adaptation Metadata Card */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border-purple-500/20">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                🌐 {adaptation.targetLanguage}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Region: {adaptation.audienceRegion}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">
                Style: {adaptation.adaptationStyle.replace("_", " ")}
              </span>

              {pendingFlagsCount > 0 ? (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  {pendingFlagsCount} Flags For Human Review
                </span>
              ) : (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  All Flags Cleared
                </span>
              )}
            </div>

            <div className="pt-1">
              <input
                type="text"
                value={adaptation.adaptedTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full text-2xl font-black text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-purple-500 focus:outline-none"
                placeholder="Localized Title"
              />
              <textarea
                value={adaptation.adaptedLogline}
                onChange={(e) => handleLoglineChange(e.target.value)}
                rows={2}
                className="w-full text-sm font-medium text-slate-300 italic bg-transparent border-b border-transparent hover:border-slate-700 focus:border-purple-500 focus:outline-none mt-1 resize-none"
                placeholder="Localized Logline"
              />
            </div>
          </div>

          <button
            onClick={handleCopyScript}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 shrink-0 transition-all shadow-sm"
          >
            {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedScript ? "Copied Adapted Script!" : "Copy Adapted Script"}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 border-b border-white/10 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("flags")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "flags"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
          <span>Human Review Flags ({adaptation.reviewFlags.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("script")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "script"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Adapted Screenplay</span>
        </button>

        <button
          onClick={() => setActiveTab("choices")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "choices"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Localization Rationale ({adaptation.localizationChoices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("preservation")}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === "preservation"
              ? "bg-purple-600 text-white shadow-md shadow-purple-600/25"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Preservation Assessment</span>
        </button>
      </div>

      {/* Sub-Tab 1: Human Review Flags (CRITICAL FEATURE) */}
      {activeTab === "flags" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Human-in-the-Loop Localization QA:</strong> These phrases contain nuanced idioms, cultural sensitivities, or register shifts that should not be published without verification from a target-market editor. Review the rationale and suggested alternatives below.
            </p>
          </div>

          <div className="space-y-3">
            {adaptation.reviewFlags.map((flag) => {
              const isEditing = editingFlagId === flag.id;

              return (
                <div
                  key={flag.id}
                  className={`glass-panel rounded-2xl p-5 border transition-all ${
                    flag.status === "approved"
                      ? "border-emerald-500/30 bg-emerald-950/20"
                      : flag.status === "edited"
                      ? "border-indigo-500/30 bg-indigo-950/20"
                      : "border-amber-500/30 bg-slate-900/80"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                          flag.concernType === "cultural_sensitivity"
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                            : flag.concernType === "idiom"
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                            : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                        }`}
                      >
                        {flag.concernType.replace("_", " ")}
                      </span>

                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          flag.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : flag.status === "edited"
                            ? "bg-indigo-500/20 text-indigo-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        Status: {flag.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5 self-end sm:self-auto">
                      {flag.status !== "approved" && (
                        <button
                          onClick={() => handleFlagStatusChange(flag.id, "approved")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1 transition-colors"
                          title="Accept phrasing as suitable"
                        >
                          <Check className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                      )}

                      {!isEditing ? (
                        <button
                          onClick={() => {
                            setEditingFlagId(flag.id);
                            setEditedPhraseValue(flag.adaptedPhrase);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                          title="Customize phrase"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSaveEditedFlag(flag.id)}
                            className="px-2 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingFlagId(null)}
                            className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Original vs Adapted Comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">
                        Source Phrase:
                      </span>
                      <p className="text-slate-300 font-screenplay">&ldquo;{flag.originalPhrase}&rdquo;</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <span className="text-[10px] font-semibold uppercase text-purple-400 block mb-1">
                        Adapted Phrasing:
                      </span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedPhraseValue}
                          onChange={(e) => setEditedPhraseValue(e.target.value)}
                          className="w-full bg-slate-900 text-white border border-indigo-500 p-1.5 rounded text-xs font-screenplay focus:outline-none"
                        />
                      ) : (
                        <p className="text-white font-screenplay font-semibold">
                          &ldquo;{flag.adaptedPhrase}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Explanation & Suggestion */}
                  <div className="space-y-1.5 text-xs text-slate-400 bg-slate-900/50 p-3 rounded-xl border border-slate-800/60">
                    <p className="leading-relaxed">
                      <strong className="text-slate-300">Localization Rationale:</strong> {flag.explanation}
                    </p>
                    <p className="leading-relaxed text-indigo-300">
                      <strong className="text-indigo-200">Recommended Alternative:</strong> &ldquo;{flag.suggestedAlternative}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Screenplay View / Edit */}
      {activeTab === "script" && (
        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Adapted Screenplay ({adaptation.targetLanguage})
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Preserves scene sluglines, character names, and formatting. Editable directly.
              </p>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              {adaptation.adaptedScript.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            value={adaptation.adaptedScript}
            onChange={(e) => handleScriptChange(e.target.value)}
            rows={22}
            className="w-full font-screenplay text-sm text-slate-200 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 leading-relaxed focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-all shadow-inner"
            placeholder="Type or edit adapted screenplay..."
          />
        </div>
      )}

      {/* Sub-Tab 3: Localization Choices Table */}
      {activeTab === "choices" && (
        <div className="space-y-3">
          {adaptation.localizationChoices.map((choice, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-5 border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/30">
                  {choice.area}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">
                    Source Form:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{choice.originalApproach}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-semibold uppercase text-purple-400 block mb-1">
                    Adapted Solution:
                  </span>
                  <p className="text-white leading-relaxed">{choice.adaptedApproach}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-400">
                <strong className="text-slate-300">Dramatic & Cultural Rationale: </strong>
                {choice.rationale}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Sub-Tab 4: Preservation Assessment */}
      {activeTab === "preservation" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel rounded-2xl p-5 border-indigo-500/20 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <span>Plot & Structural Integrity</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              {adaptation.preservationSummary.plotIntegrity}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-rose-500/20 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <span>Emotional Beats & Turning Points</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              {adaptation.preservationSummary.emotionalBeats}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-purple-500/20 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <span>Character Voice & Hierarchies</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              {adaptation.preservationSummary.characterVoice}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-amber-500/20 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>Tone & Genre Calibration</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800">
              {adaptation.preservationSummary.tonePreservation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
