"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Clapperboard,
  Clock,
  Globe,
  Sliders,
  Flame,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { PilotGenerationParams } from "@/types/story";
import {
  GENRE_PRESETS,
  TONE_PRESETS,
  DURATION_OPTIONS,
  LANGUAGE_OPTIONS,
  PREMISE_INSPIRATIONS
} from "@/data/presets";

interface PilotFormProps {
  onGenerate: (params: PilotGenerationParams) => Promise<void>;
  isLoading: boolean;
  initialParams?: Partial<PilotGenerationParams>;
}

export const PilotForm: React.FC<PilotFormProps> = ({
  onGenerate,
  isLoading,
  initialParams
}) => {
  const [premise, setPremise] = useState(initialParams?.premise || "");
  const [genre, setGenre] = useState(initialParams?.genre || GENRE_PRESETS[0].label);
  const [targetAudience, setTargetAudience] = useState(
    initialParams?.targetAudience || "Young urban professionals & vertical micro-drama viewers (Ages 20-35)"
  );
  const [sourceLanguage, setSourceLanguage] = useState(initialParams?.sourceLanguage || "English");
  const [episodeDuration, setEpisodeDuration] = useState<"1 min" | "3 min" | "5 min">(
    initialParams?.episodeDuration || "3 min"
  );
  const [tone, setTone] = useState(initialParams?.tone || TONE_PRESETS[0]);
  const [settingContext, setSettingContext] = useState(initialParams?.settingContext || "");
  const [showInspirations, setShowInspirations] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!premise.trim() || isLoading) return;

    onGenerate({
      premise: premise.trim(),
      genre,
      targetAudience,
      sourceLanguage,
      episodeDuration,
      tone,
      settingContext: settingContext.trim() || undefined
    });
  };

  const applyInspiration = (insp: typeof PREMISE_INSPIRATIONS[0]) => {
    setPremise(insp.premise);
    setGenre(insp.genre);
    setEpisodeDuration(insp.duration);
    setTone(insp.tone);
    setSettingContext(insp.context);
    setShowInspirations(false);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Clapperboard className="w-5 h-5 text-indigo-400" />
            <span>Generate Micro-Drama Pilot</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Produce a high-retention short-form episode with 3-second opening hook, full screenplay, scene breakdown, and cliffhanger.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowInspirations(!showInspirations)}
          className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Premise Inspirations</span>
        </button>
      </div>

      {showInspirations && (
        <div className="mb-6 p-4 rounded-xl bg-slate-900/90 border border-indigo-500/20 grid grid-cols-1 md:grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {PREMISE_INSPIRATIONS.map((insp, idx) => (
            <div
              key={idx}
              onClick={() => applyInspiration(insp)}
              className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-white text-xs group-hover:text-indigo-300 transition-colors">
                  {insp.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">
                  {insp.genre}
                </span>
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {insp.premise}
              </p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Story Premise */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="premise" className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Story Premise</span>
              <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              High-stakes conflict, secret agenda, or ticking clock
            </span>
          </div>

          <textarea
            id="premise"
            rows={3}
            value={premise}
            onChange={(e) => setPremise(e.target.value)}
            placeholder="e.g. During a midnight board meeting to announce a hostile takeover, the newly appointed CEO discovers the anonymous whistleblower who destroyed her father is sitting across the table with the voting proxy..."
            className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 p-3.5 text-sm transition-all resize-y"
            required
          />
        </div>

        {/* Row: Genre & Tone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Genre
            </label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
            >
              {GENRE_PRESETS.map((g) => (
                <option key={g.label} value={g.label}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label htmlFor="tone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Tone & Cadence
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
            >
              {TONE_PRESETS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Row: Duration, Source Language, Target Audience */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Episode Duration */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Episode Duration
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {DURATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setEpisodeDuration(opt.value)}
                  className={`py-2 px-1 text-center rounded-lg text-xs font-medium border transition-all ${
                    episodeDuration === opt.value
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/25"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  }`}
                  title={opt.description}
                >
                  {opt.value}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5">
              {episodeDuration === "1 min" && "~140 words • Hyper-fast hook"}
              {episodeDuration === "3 min" && "~400 words • Balanced 3-scene beat"}
              {episodeDuration === "5 min" && "~750 words • Extended drama arc"}
            </p>
          </div>

          {/* Source Language */}
          <div>
            <label htmlFor="sourceLanguage" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Source Language
            </label>
            <select
              id="sourceLanguage"
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
            >
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Target Audience */}
          <div>
            <label htmlFor="targetAudience" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Target Audience
            </label>
            <input
              type="text"
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="e.g. Gen Z vertical drama fans, Young professionals"
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
            />
          </div>
        </div>

        {/* Optional Setting / Cultural Context */}
        <div>
          <label htmlFor="settingContext" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Optional Setting or Cultural Context
          </label>
          <input
            type="text"
            id="settingContext"
            value={settingContext}
            onChange={(e) => setSettingContext(e.target.value)}
            placeholder="e.g. A rain-lashed 54th-floor penthouse boardroom in Manhattan at 2 AM; high-contrast chiaroscuro lighting."
            className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!premise.trim() || isLoading}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              !premise.trim() || isLoading
                ? "bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Crafting Production Screenplay & Scenes...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Pilot Script & Scene Breakdown</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
