"use client";

import React, { useState } from "react";
import {
  Globe,
  Languages,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FileCheck,
  ClipboardPaste
} from "lucide-react";
import { AdaptationParams } from "@/types/story";
import { LANGUAGE_OPTIONS, ADAPTATION_STYLES } from "@/data/presets";

interface AdaptationFormProps {
  onAdapt: (params: AdaptationParams) => Promise<void>;
  isLoading: boolean;
  defaultScript: string;
  defaultTitle: string;
  defaultSourceLang: string;
}

export const AdaptationForm: React.FC<AdaptationFormProps> = ({
  onAdapt,
  isLoading,
  defaultScript,
  defaultTitle,
  defaultSourceLang
}) => {
  const [scriptToAdapt, setScriptToAdapt] = useState(defaultScript);
  const [storyTitle, setStoryTitle] = useState(defaultTitle || "The Glass Boardroom");
  const [sourceLanguage, setSourceLanguage] = useState(defaultSourceLang || "English");
  const [targetLanguage, setTargetLanguage] = useState("Spanish (Latin America)");
  const [audienceRegion, setAudienceRegion] = useState("Latin American OTT & Vertical Short-Form (Mexico / Colombia)");
  const [adaptationStyle, setAdaptationStyle] = useState<"faithful" | "conversational" | "locally_adapted">(
    "locally_adapted"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptToAdapt.trim() || isLoading) return;

    onAdapt({
      scriptToAdapt: scriptToAdapt.trim(),
      storyTitle: storyTitle.trim(),
      sourceLanguage,
      targetLanguage,
      audienceRegion: audienceRegion.trim() || undefined,
      adaptationStyle
    });
  };

  const handleUseCurrentScript = () => {
    if (defaultScript) {
      setScriptToAdapt(defaultScript);
      if (defaultTitle) setStoryTitle(defaultTitle);
      if (defaultSourceLang) setSourceLanguage(defaultSourceLang);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Languages className="w-5 h-5 text-indigo-400" />
            <span>Multilingual Cultural Adaptation</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Transcode your micro-drama into global territories without literal machine translation. Preserves dramatic subtext, character stakes, and flags uncertain idioms for human review.
          </p>
        </div>

        {defaultScript && (
          <button
            type="button"
            onClick={handleUseCurrentScript}
            className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            title="Load latest script from your active pilot"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            <span>Sync from Active Pilot</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Story Title & Script Source */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="storyTitle" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Story / Project Title
            </label>
            <input
              type="text"
              id="storyTitle"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="e.g. The Glass Boardroom"
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
            />
          </div>

          <div>
            <label htmlFor="sourceLang" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Source Language
            </label>
            <select
              id="sourceLang"
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

          <div>
            <label htmlFor="targetLang" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Target Language
            </label>
            <select
              id="targetLang"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
            >
              {LANGUAGE_OPTIONS.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Audience Region / Cultural Context */}
        <div>
          <label htmlFor="audienceRegion" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Target Audience Region & Cultural Context
          </label>
          <input
            type="text"
            id="audienceRegion"
            value={audienceRegion}
            onChange={(e) => setAudienceRegion(e.target.value)}
            placeholder="e.g. Latin American OTT & Vertical Short-Form (Mexico / Colombia / US Hispanic)"
            className="w-full rounded-xl bg-slate-900/90 border border-slate-700 focus:border-indigo-500 text-white p-3 text-sm transition-all"
          />
        </div>

        {/* Adaptation Style Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
            Adaptation Strategy
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ADAPTATION_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => setAdaptationStyle(style.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  adaptationStyle === style.id
                    ? "bg-indigo-600/20 border-indigo-500 shadow-md shadow-indigo-600/20"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white text-xs">
                    {style.label}
                  </span>
                  {adaptationStyle === style.id && (
                    <FileCheck className="w-4 h-4 text-indigo-400" />
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {style.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Script Content to Adapt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="scriptText" className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>Script to Adapt</span>
              <span className="text-rose-400">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              Preserves scene numbers, characters & emotional inflection
            </span>
          </div>

          <textarea
            id="scriptText"
            rows={10}
            value={scriptToAdapt}
            onChange={(e) => setScriptToAdapt(e.target.value)}
            placeholder="Paste your screenplay script here, or click 'Sync from Active Pilot' above..."
            className="w-full font-screenplay text-xs text-slate-200 bg-slate-950/90 border border-slate-700 focus:border-indigo-500 p-4 rounded-xl leading-relaxed resize-y focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!scriptToAdapt.trim() || isLoading}
            className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              !scriptToAdapt.trim() || isLoading
                ? "bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50 cursor-pointer"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Localizing Dialogue & Generating Review Flags...</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-purple-300" />
                <span>Perform Multilingual Adaptation & Review Generation</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
