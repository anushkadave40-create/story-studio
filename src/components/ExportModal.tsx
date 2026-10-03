"use client";

import React, { useState } from "react";
import { StoryProject } from "@/types/story";
import { generateMarkdownExport, generateJsonExport, downloadFile } from "@/lib/exportUtils";
import {
  X,
  Download,
  Copy,
  Check,
  FileCode,
  FileText,
  Sparkles,
  Package
} from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: StoryProject;
  onNotify: (msg: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
  onNotify
}) => {
  const [format, setFormat] = useState<"markdown" | "json">("markdown");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = generateMarkdownExport(project);
  const jsonContent = generateJsonExport(project);
  const previewContent = format === "markdown" ? markdownContent : jsonContent;

  const sanitizeFilename = (name: string) => {
    return (name || "story-studio")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleDownload = () => {
    const baseName = sanitizeFilename(project.title || "story-studio-project");
    if (format === "markdown") {
      downloadFile(markdownContent, `${baseName}-production-package.md`, "text/markdown");
      onNotify("Markdown production package downloaded!");
    } else {
      downloadFile(jsonContent, `${baseName}-project.json`, "application/json");
      onNotify("JSON project file downloaded!");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewContent);
    setCopied(true);
    onNotify(`Copied ${format.toUpperCase()} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-4xl max-h-[90vh] rounded-3xl flex flex-col border border-white/20 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-rose-500 flex items-center justify-center text-white shadow-lg">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Export Production Deliverables</h3>
              <p className="text-xs text-slate-400">
                Industry-standard screenplay package with metadata, scene breakdown, and localization review logs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls: Format Selector & Actions */}
        <div className="px-6 py-3.5 bg-slate-950/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat("markdown")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                format === "markdown"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>

            <button
              onClick={() => setFormat("json")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                format === "json"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-rose-600 hover:from-indigo-500 hover:to-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {format.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Modal Body: Code / Markdown Preview */}
        <div className="p-6 flex-1 overflow-y-auto">
          <pre className="font-screenplay text-xs text-slate-300 bg-slate-950 p-5 rounded-2xl border border-slate-800 whitespace-pre-wrap leading-relaxed select-all">
            {previewContent}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Ready for production handoff to writers, directors, and localization QA.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
