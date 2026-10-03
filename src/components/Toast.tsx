"use client";

import React from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "success" | "error" | "info";
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "success", onDismiss }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-3 fade-in duration-200">
      <div
        onClick={onDismiss}
        className={`px-4 py-3 rounded-2xl flex items-center gap-3 text-xs font-medium shadow-2xl cursor-pointer border transition-all ${
          type === "success"
            ? "bg-slate-900/95 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10"
            : type === "error"
            ? "bg-slate-900/95 text-rose-300 border-rose-500/40 shadow-rose-500/10"
            : "bg-slate-900/95 text-indigo-300 border-indigo-500/40 shadow-indigo-500/10"
        }`}
      >
        {type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
        {type === "error" && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
        {type === "info" && <Info className="w-4 h-4 text-indigo-400 shrink-0" />}
        <span>{message}</span>
      </div>
    </div>
  );
};
