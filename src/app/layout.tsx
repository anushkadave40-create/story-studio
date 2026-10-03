import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Story Studio — AI Micro-Drama & Multilingual Story Suite",
  description:
    "An end-to-end AI-assisted creative production workspace for micro-drama screenplays, vertical video retention architecture, and human-in-the-loop multilingual story adaptation.",
  keywords: [
    "Micro-drama",
    "Screenplay",
    "Short-form video",
    "Content AI",
    "Storytelling",
    "Multilingual adaptation",
    "Localization QA",
    "Scriptwriting"
  ],
  authors: [{ name: "Story Studio Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100">{children}</body>
    </html>
  );
}
