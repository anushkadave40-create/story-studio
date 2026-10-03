"use client";

import React from "react";
import { WorkflowNotes, QAChecklist } from "@/types/story";
import { ClipboardList, CheckSquare, Square, Wrench, GitFork, Video, ShieldCheck } from "lucide-react";

interface WorkflowNotesPanelProps {
  notes: WorkflowNotes;
  onUpdateNotes: (updated: WorkflowNotes) => void;
  onNotify: (msg: string) => void;
}

export const WorkflowNotesPanel: React.FC<WorkflowNotesPanelProps> = ({
  notes,
  onUpdateNotes,
  onNotify
}) => {
  const handleTextChange = (field: keyof Omit<WorkflowNotes, "qaChecklist">, value: string) => {
    onUpdateNotes({ ...notes, [field]: value });
  };

  const handleToggleChecklist = (key: keyof QAChecklist) => {
    const updatedChecklist = {
      ...notes.qaChecklist,
      [key]: !notes.qaChecklist[key]
    };
    onUpdateNotes({ ...notes, qaChecklist: updatedChecklist });
    onNotify(`QA Item updated`);
  };

  const checklistItems: { key: keyof QAChecklist; label: string; desc: string }[] = [
    {
      key: "hookVerified",
      label: "Opening Hook Pacing (0-3s)",
      desc: "Instant physical/auditory conflict verified to prevent swipe-away on vertical feeds."
    },
    {
      key: "dialoguePacingNatural",
      label: "Dialogue Velocity & Vernacular",
      desc: "Sentences calibrated for fast short-form cadence and natural native delivery."
    },
    {
      key: "culturalSensitivityChecked",
      label: "Cultural Sensitivities & Idiom Flags Cleared",
      desc: "All review flags checked for target territory norms and legal/broadcast requirements."
    },
    {
      key: "cliffhangerCompelling",
      label: "Compelling Ending Cliffhanger",
      desc: "Closes on an urgent unresolved question without unmotivated or arbitrary twists."
    },
    {
      key: "sceneLabelsPreserved",
      label: "Scene & Character Consistency",
      desc: "Scene headings, sluglines, and character identifiers match across source and adaptation."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
            <ClipboardList className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Content AI Workflow & Production Audit</span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                QA & Trainee Portfolio
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Document your AI tooling stack, prompt engineering iterations, and production observations for cross-functional creative and editorial teams.
            </p>
          </div>
        </div>

        {/* QA Checklist */}
        <div className="mb-8 p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production Quality Assurance Gate</span>
            </span>
            <span className="text-xs text-slate-400">
              {Object.values(notes.qaChecklist).filter(Boolean).length} of {checklistItems.length} passed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {checklistItems.map((item) => {
              const isChecked = notes.qaChecklist[item.key];
              return (
                <div
                  key={item.key}
                  onClick={() => handleToggleChecklist(item.key)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-300"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <button type="button" className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </button>
                  <div className="text-xs">
                    <span className={`font-semibold block ${isChecked ? "text-white" : "text-slate-300"}`}>
                      {item.label}
                    </span>
                    <span className="text-[11px] text-slate-400 leading-snug mt-0.5 block">
                      {item.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notes Textareas */}
        <div className="space-y-6">
          {/* Tools Used */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wrench className="w-4 h-4 text-indigo-400" />
              <label htmlFor="toolsUsed" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                AI Tooling & Models Used
              </label>
            </div>
            <textarea
              id="toolsUsed"
              rows={3}
              value={notes.toolsUsed}
              onChange={(e) => handleTextChange("toolsUsed", e.target.value)}
              placeholder="e.g. Gemini 2.5 Flash for rapid scene breakdown; Custom prompt templates with JSON-mode enforcement; DeepL Benchmarking."
              className="w-full text-xs text-slate-200 bg-slate-950/90 border border-slate-700 focus:border-indigo-500 p-3.5 rounded-xl leading-relaxed resize-y focus:outline-none"
            />
          </div>

          {/* Prompt Revisions */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GitFork className="w-4 h-4 text-purple-400" />
              <label htmlFor="promptRevisions" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Prompt Engineering & Version History
              </label>
            </div>
            <textarea
              id="promptRevisions"
              rows={4}
              value={notes.promptRevisions}
              onChange={(e) => handleTextChange("promptRevisions", e.target.value)}
              placeholder="e.g. v1 generated excessive dialogue without action. v2 injected strict in media res constraint within first 3 seconds. v3 mandated non-literal idiom adaptation."
              className="w-full text-xs text-slate-200 bg-slate-950/90 border border-slate-700 focus:border-indigo-500 p-3.5 rounded-xl leading-relaxed resize-y focus:outline-none font-mono"
            />
          </div>

          {/* Production Observations */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Video className="w-4 h-4 text-rose-400" />
              <label htmlFor="prodObs" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Production, Framing & Executive Observations
              </label>
            </div>
            <textarea
              id="prodObs"
              rows={4}
              value={notes.productionObservations}
              onChange={(e) => handleTextChange("productionObservations", e.target.value)}
              placeholder="e.g. For vertical 9:16 mobile capture, prioritize tight macro shots of physical props. Ensure actor dialogue cadence does not exceed 130 words per minute to preserve subtitle clarity."
              className="w-full text-xs text-slate-200 bg-slate-950/90 border border-slate-700 focus:border-indigo-500 p-3.5 rounded-xl leading-relaxed resize-y focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
