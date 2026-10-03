"use client";

import React, { useState, useEffect } from "react";
import {
  StoryProject,
  MicroDramaPilot,
  StoryAdaptation,
  WorkflowNotes,
  PilotGenerationParams,
  AdaptationParams
} from "@/types/story";
import { SAMPLE_PROJECT } from "@/data/sampleProject";
import { Header } from "@/components/Header";
import { PilotForm } from "@/components/PilotForm";
import { PilotEditor } from "@/components/PilotEditor";
import { AdaptationForm } from "@/components/AdaptationForm";
import { AdaptationEditor } from "@/components/AdaptationEditor";
import { WorkflowNotesPanel } from "@/components/WorkflowNotesPanel";
import { ExportModal } from "@/components/ExportModal";
import { Toast } from "@/components/Toast";
import {
  Clapperboard,
  Globe,
  FileText,
  ClipboardList,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Film,
  Layers,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const STORAGE_KEY = "story_studio_project_v1";

const createInitialProject = (): StoryProject => ({
  id: `proj-${Date.now()}`,
  title: "Untitled Micro-Drama",
  lastModified: new Date().toISOString(),
  pilot: null,
  adaptation: null,
  workflowNotes: {
    toolsUsed: "Story Studio Engine v1.0",
    promptRevisions: "Initial pilot draft.",
    productionObservations: "Calibrated for 9:16 vertical short-form retention.",
    qaChecklist: {
      hookVerified: false,
      dialoguePacingNatural: false,
      culturalSensitivityChecked: false,
      cliffhangerCompelling: false,
      sceneLabelsPreserved: false
    }
  }
});

export default function StoryStudioApp() {
  const [project, setProject] = useState<StoryProject>(createInitialProject);
  const [activeTab, setActiveTab] = useState<"pilot" | "adapt" | "notes" | "export">("pilot");
  const [isGeneratingPilot, setIsGeneratingPilot] = useState(false);
  const [isAdapting, setIsAdapting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("success");
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [providerInfo, setProviderInfo] = useState<{
    mode: "gemini" | "openai" | "demo";
    providerName: string;
    isLive: boolean;
  }>({
    mode: "demo",
    providerName: "Demo Studio Engine",
    isLive: false
  });

  // Check provider status on mount
  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setProviderInfo({
            mode: data.mode,
            providerName: data.providerName,
            isLive: data.isLive
          });
        }
      })
      .catch((err) => console.warn("Status check failed:", err));
  }, []);

  // Restore project from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object" && parsed.id) {
          setProject(parsed);
          setLastSavedTime(new Date(parsed.lastModified || Date.now()).toLocaleTimeString());
        }
      } else {
        // First time visitor: pre-load the rich sample project
        setProject(SAMPLE_PROJECT);
        setLastSavedTime(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error("Failed to restore from localStorage:", e);
    }
  }, []);

  // Auto-save project whenever it changes
  const saveProject = (updated: StoryProject) => {
    setProject(updated);
    const timeStr = new Date().toLocaleTimeString();
    setLastSavedTime(timeStr);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...updated, lastModified: new Date().toISOString() })
      );
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  };

  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Pilot Generation Handler
  const handleGeneratePilot = async (params: PilotGenerationParams) => {
    setIsGeneratingPilot(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate pilot");
      }

      const updatedProject: StoryProject = {
        ...project,
        title: data.pilot.title || project.title,
        pilot: data.pilot,
        lastModified: new Date().toISOString()
      };

      saveProject(updatedProject);
      showToast(`Generated pilot "${data.pilot.title}"!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error generating pilot";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setIsGeneratingPilot(false);
    }
  };

  // Multilingual Adaptation Handler
  const handleAdaptStory = async (params: AdaptationParams) => {
    setIsAdapting(true);
    setError(null);

    try {
      const res = await fetch("/api/adapt-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to adapt story");
      }

      const updatedProject: StoryProject = {
        ...project,
        adaptation: data.adaptation,
        lastModified: new Date().toISOString()
      };

      saveProject(updatedProject);
      showToast(`Story adapted into ${params.targetLanguage}!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error adapting story";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setIsAdapting(false);
    }
  };

  // Load Sample Project
  const handleLoadSample = () => {
    saveProject(SAMPLE_PROJECT);
    showToast("Loaded sample micro-drama: 'The Glass Boardroom'");
  };

  // Reset Project
  const handleResetProject = () => {
    if (confirm("Reset and start a fresh project? Current unsaved edits will be replaced.")) {
      const fresh = createInitialProject();
      saveProject(fresh);
      showToast("Started fresh project");
    }
  };

  // Direct Handoff from Pilot to Adaptation
  const handleSendToAdaptation = (script: string, title: string, sourceLang: string) => {
    setActiveTab("adapt");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Carried "${title}" into Adaptation Studio`);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        projectTitle={project.title}
        onUpdateTitle={(title) => saveProject({ ...project, title })}
        onLoadSample={handleLoadSample}
        onResetProject={handleResetProject}
        onOpenExport={() => setIsExportOpen(true)}
        lastSavedTime={lastSavedTime}
        providerInfo={providerInfo}
      />

      {/* Main Studio Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Banner Alert for Errors if any */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start justify-between gap-3 text-rose-300 text-xs animate-in fade-in">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold block text-sm mb-0.5">Generation Error:</strong>
                <span>{error}</span>
              </div>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-rose-400 hover:text-white text-xs font-semibold px-2 py-1 rounded"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Studio Workflow Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-1.5 rounded-2xl glass-panel-subtle border border-white/10">
            {/* Step 1: Pilot */}
            <button
              onClick={() => setActiveTab("pilot")}
              className={`p-3 rounded-xl flex items-center justify-center sm:justify-start gap-2.5 transition-all text-xs font-semibold ${
                activeTab === "pilot"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <div className="relative shrink-0">
                <Clapperboard className="w-4 h-4" />
                {project.pilot && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block leading-none">1. Micro-Drama Pilot</span>
                <span className="text-[10px] text-slate-400/90 font-normal">
                  {project.pilot ? "Pilot Ready" : "Generate"}
                </span>
              </div>
            </button>

            {/* Step 2: Adaptation */}
            <button
              onClick={() => setActiveTab("adapt")}
              className={`p-3 rounded-xl flex items-center justify-center sm:justify-start gap-2.5 transition-all text-xs font-semibold ${
                activeTab === "adapt"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <div className="relative shrink-0">
                <Globe className="w-4 h-4" />
                {project.adaptation && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block leading-none">2. Multilingual Adapt</span>
                <span className="text-[10px] text-slate-400/90 font-normal">
                  {project.adaptation ? "Localized" : "Translate & QA"}
                </span>
              </div>
            </button>

            {/* Step 3: Export */}
            <button
              onClick={() => setIsExportOpen(true)}
              className="p-3 rounded-xl flex items-center justify-center sm:justify-start gap-2.5 transition-all text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <div className="text-left hidden sm:block">
                <span className="block leading-none">3. Export Package</span>
                <span className="text-[10px] text-slate-400 font-normal">Markdown / JSON</span>
              </div>
            </button>

            {/* Step 4: Notes */}
            <button
              onClick={() => setActiveTab("notes")}
              className={`p-3 rounded-xl flex items-center justify-center sm:justify-start gap-2.5 transition-all text-xs font-semibold ${
                activeTab === "notes"
                  ? "bg-slate-800 text-white shadow-lg border border-slate-700"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <ClipboardList className="w-4 h-4 text-amber-400" />
              <div className="text-left hidden sm:block">
                <span className="block leading-none">4. Workflow Notes</span>
                <span className="text-[10px] text-slate-400 font-normal">QA & History</span>
              </div>
            </button>
          </div>
        </div>

        {/* WORKFLOW TAB 1: MICRO-DRAMA PILOT */}
        {activeTab === "pilot" && (
          <div className="space-y-8">
            <PilotForm
              onGenerate={handleGeneratePilot}
              isLoading={isGeneratingPilot}
              initialParams={
                project.pilot
                  ? {
                      premise: project.pilot.synopsis,
                      genre: project.pilot.genre,
                      targetAudience: project.pilot.targetAudience,
                      sourceLanguage: project.pilot.sourceLanguage,
                      episodeDuration: project.pilot.episodeDuration,
                      tone: project.pilot.tone,
                      settingContext: project.pilot.settingContext
                    }
                  : undefined
              }
            />

            {project.pilot ? (
              <PilotEditor
                pilot={project.pilot}
                onUpdatePilot={(updated) => saveProject({ ...project, pilot: updated })}
                onSendToAdaptation={handleSendToAdaptation}
                onNotify={showToast}
              />
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl p-8 bg-slate-950/40">
                <Clapperboard className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-300">No Pilot Generated Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                  Enter your story premise above or click &ldquo;Premise Inspirations&rdquo; to draft a full micro-drama pilot with scene directions and cliffhangers.
                </p>
                <button
                  onClick={handleLoadSample}
                  className="px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore With Sample Project</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* WORKFLOW TAB 2: MULTILINGUAL ADAPTATION */}
        {activeTab === "adapt" && (
          <div className="space-y-8">
            <AdaptationForm
              onAdapt={handleAdaptStory}
              isLoading={isAdapting}
              defaultScript={project.pilot?.fullScript || ""}
              defaultTitle={project.pilot?.title || project.title}
              defaultSourceLang={project.pilot?.sourceLanguage || "English"}
            />

            {project.adaptation ? (
              <AdaptationEditor
                adaptation={project.adaptation}
                onUpdateAdaptation={(updated) => saveProject({ ...project, adaptation: updated })}
                onNotify={showToast}
              />
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl p-8 bg-slate-950/40">
                <Globe className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-slate-300">No Adaptation Generated Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
                  Configure your target territory above to localize dialogue, preserve dramatic intent, and flag cultural idioms for human review.
                </p>
                {project.pilot && (
                  <button
                    onClick={() =>
                      handleAdaptStory({
                        scriptToAdapt: project.pilot!.fullScript,
                        storyTitle: project.pilot!.title,
                        sourceLanguage: project.pilot!.sourceLanguage,
                        targetLanguage: "Spanish (Latin America)",
                        audienceRegion: "Latin American OTT & Vertical Short-Form (Mexico / Colombia)",
                        adaptationStyle: "locally_adapted"
                      })
                    }
                    disabled={isAdapting}
                    className="px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Quick Adapt Pilot to Spanish</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* WORKFLOW TAB 4: WORKFLOW & QA NOTES */}
        {activeTab === "notes" && (
          <WorkflowNotesPanel
            notes={project.workflowNotes}
            onUpdateNotes={(updated) => saveProject({ ...project, workflowNotes: updated })}
            onNotify={showToast}
          />
        )}
      </main>

      {/* Production Disclaimer Footer */}
      <footer className="mt-16 border-t border-white/10 bg-slate-950/90 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <p className="text-slate-400 font-medium">Story Studio — Content AI Creative Suite</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Produces screenplays, scene breakdowns, retention architecture, and human-in-the-loop localization reviews.
            </p>
            <p className="text-[10px] text-slate-600 mt-1">
              Note: This application generates production-ready creative scripts and text assets; it does not synthesize video or voiceover.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Export Deliverables
            </button>
            <span>•</span>
            <button
              onClick={handleLoadSample}
              className="hover:text-slate-300 transition-colors"
            >
              Load Demo Project
            </button>
          </div>
        </div>
      </footer>

      {/* Export Deliverables Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        project={project}
        onNotify={showToast}
      />

      {/* Floating Feedback Toast */}
      <Toast
        message={toastMessage}
        type={toastType}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}
