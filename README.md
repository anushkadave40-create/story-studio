# 🎬 Story Studio

> **An End-to-End AI-Assisted Micro-Drama & Multilingual Story Workflow Suite**  
> *A portfolio project built for a Content AI Management Trainee role.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

**Story Studio** is a creative production tool engineered to bridge generative AI capabilities with professional vertical short-form drama production. Unlike generic chatbots, Story Studio operates as a specialized workflow workstation for Content AI managers, showrunners, and localization teams producing 1-to-5-minute serials for mobile-first platforms (e.g., ReelShort, DramaBox, TikTok, YouTube Shorts).

The application demonstrates two interconnected pipelines:
1. **Micro-Drama Pilot Creation:** Engineering high-retention screenplays with strict narrative architecture (0–3 second opening hooks, turning points, pacing calibration, and episode-ending cliffhangers).
2. **Multilingual Story Adaptation:** Transcoding scripts into target territories with cultural idiom localization, formality adjustments, and automated **Human Review Flags** for sensitive or ambiguous expressions.

---

## 📸 Application Interface & Workflow

<!-- Place screenshots or GIFs here -->
```
┌──────────────────────────────────────────────────────────────────────────┐
│  🎬 Story Studio   [Live AI: Gemini / Demo Mode]  [Sample] [Export]      │
├──────────────────────────────────────────────────────────────────────────┤
│  [ 1. Micro-Drama Pilot ] [ 2. Multilingual Adapt ] [ 3. Export ] [ 4. QA]│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Premise Form ───► Full Screenplay ───► Scene Breakdown ───► Hooks & Promo│
│                          │                                               │
│                          ▼                                               │
│             Target Territory & Style Selector                            │
│                          │                                               │
│                          ▼                                               │
│       Localized Screenplay + Human Review Flags (Idioms / QA)            │
│                          │                                               │
│                          ▼                                               │
│       Markdown / JSON Deliverables + Workflow Audit Trail                │
└──────────────────────────────────────────────────────────────────────────┘
```

> **UI Screenshot Preview:**  
> *(Add application screenshots here showing the Screenplay Editor, Scene Cards, Human Review Flags, and Export modal)*

---

## ✨ Core Features

### 1. Micro-Drama Pilot Studio
- **Configurable Creative Parameters:** Story premise, genre selection (Corporate Revenge, Psychological Thriller, Sci-Fi Time-Loop, etc.), target audience demographic, source language, tone, and physical setting context.
- **Duration & Pacing Calibration:**
  - `1 min` (~140 words, hyper-accelerated conflict)
  - `3 min` (~400 words, balanced 3-beat structure)
  - `5 min` (~750 words, extended dramatic tension)
- **High-Retention Dramatic Architecture:**
  - **Opening Hook (First 3–5 seconds):** In media res visual shock and audio ultimatum engineered to prevent swipe-away on vertical feeds.
  - **Emotional Turning Point:** Mid-episode fulcrum reversing power dynamics between protagonist and antagonist.
  - **Ending Cliffhanger:** Critical unresolved question forcing continuous viewing into the subsequent episode.
- **Production Breakdown:** Scene-by-scene visual descriptions, vertical camera pacing (macro close-ups, Dutch angles), and lighting/audio SFX notes.
- **Promotional Reel Hook:** Social video text hook, caption, audio recommendation, and hashtags.

### 2. Multilingual Story Adaptation & Localization QA
- **Script Flexibility:** Adapt the active generated pilot or paste any external screenplay.
- **Cultural Adaptation Strategies:**
  - *Faithful & Nuanced:* Preserves direct cadence and dramatic meaning.
  - *Conversational Vernacular:* Natural spoken modern idioms and contemporary slang.
  - *Deep Cultural Localization:* Re-anchors honorifics, corporate hierarchies, and territory conventions.
- **Human-in-the-Loop Review Flags:** Automatically identifies and tags phrases requiring verification by regional editors (idioms, register formality, cultural sensitivities, slang ambiguities).
- **Localization Rationale Table:** Documents specific cultural choices with editorial justifications.
- **Preservation Summary:** Audits the retention of plot integrity, emotional beats, character voices, and dramatic tone.

### 3. Production Package Export
- **Markdown Export (`.md`):** Formatted industry screenplay package containing metadata, character dossiers, scene breakdown cards, localization audit tables, review flags, and QA sign-offs.
- **Structured JSON Export (`.json`):** Complete project state for ingestion into content management systems or automated production pipelines.
- **One-Click Clipboard Copying:** Direct copy for screenplays, scene lists, and markdown packages.

### 4. Content AI Workflow Notes & QA Gate
- **Tooling Stack Documentation:** Track language models, temperature settings, and benchmarking tools used.
- **Prompt Revision History:** Version log capturing system prompt iterations and constraints.
- **Production & Camera Notes:** Record framing observations for 9:16 mobile capture.
- **Interactive QA Checklist:** 5-point quality gate verifying hooks, dialogue velocity, sensitivity flags, and cliffhangers before publishing.

### 5. Local Storage & Sample Project
- **Browser Persistence:** Active projects auto-save locally so page refreshes never erase work.
- **1-Click Sample Project:** Pre-loads *"The Glass Boardroom"* (English pilot + Latin American Spanish adaptation) so reviewers can test the entire workflow instantly without configuration.

---

## 🤖 AI Implementation & Provider Abstraction

Story Studio uses a **clean server-side provider abstraction** (`src/lib/ai/`):
- API keys are **never** exposed to the client or browser bundle.
- Prompts use structured JSON schemas with server-side validation and fallback repairs (`src/lib/ai/validator.ts`).
- Supports changing AI providers without modifying the UI layer.

### Provider Matrix

| Mode | Provider | Key Environment Variable | Default Model | Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **Live AI (Recommended)** | Google Gemini | `GEMINI_API_KEY` | `gemini-2.5-flash` | Automatic schema repair |
| **Live AI (Alternative)** | OpenAI | `OPENAI_API_KEY` | `gpt-4o-mini` | JSON Object mode |
| **Demo Mode (Default)** | Studio Engine | *(None required)* | Offline Generator | 100% Free / Ready Out-of-the-Box |

### Live AI vs. Demo Mode

- **Demo Mode:** If no API key is detected in the environment, Story Studio runs in **Demo Mode**. It generates dynamic, realistic, production-ready micro-dramas and multilingual adaptations tailored to user inputs using curated dramaturgical models. No external network request or paid account is required.
- **Live AI Mode:** When `GEMINI_API_KEY` or `OPENAI_API_KEY` is set, the server dispatches live prompts to the respective LLM endpoint using structured JSON schemas.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.18+` or `20+` (tested on Node v24.21.0)
- npm, pnpm, or yarn

### 1. Clone & Install
```bash
git clone https://github.com/your-username/story-studio.git
cd story-studio
npm install
```

### 2. Configure Environment (Optional)
Copy the example environment template:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your preferred AI provider key:
```env
# Google Gemini
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# OR OpenAI
# OPENAI_API_KEY=your_actual_openai_key_here
# OPENAI_MODEL=gpt-4o-mini
```

*(If you skip this step, the app immediately functions in Demo Mode).*

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Type Check
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

Story Studio is configured for zero-config deployment on Vercel:

1. Push your repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com/new).
3. **Environment Variables:**
   - For **Demo Mode (Free):** Leave environment variables blank. Vercel will build and serve the app with full functionality.
   - For **Live AI:** Add `GEMINI_API_KEY` (or `OPENAI_API_KEY`) under *Project Settings > Environment Variables*.
4. Click **Deploy**.

---

## 📁 Repository Structure

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── adapt-story/route.ts    # Server-side multilingual adaptation endpoint
│   │   │   ├── generate-pilot/route.ts # Server-side micro-drama generation endpoint
│   │   │   └── status/route.ts         # Health & active provider inspection
│   │   ├── globals.css                 # Dark cinema theme, glassmorphism & typography
│   │   ├── layout.tsx                  # Root layout with SEO metadata & viewport
│   │   └── page.tsx                    # Main studio workstation interface
│   ├── components/
│   │   ├── AdaptationEditor.tsx        # Screenplay editor & Human Review Flags
│   │   ├── AdaptationForm.tsx          # Localization style & territory selector
│   │   ├── ExportModal.tsx             # Markdown / JSON download & copy modal
│   │   ├── Header.tsx                  # Project title, provider indicator & actions
│   │   ├── PilotEditor.tsx             # Screenplay, scene cards & retention hooks
│   │   ├── PilotForm.tsx               # Pilot premise, duration & tone form
│   │   ├── Toast.tsx                   # Floating feedback notifications
│   │   └── WorkflowNotesPanel.tsx      # Content AI audit notes & QA checklist
│   ├── data/
│   │   ├── presets.ts                  # Genres, durations, languages & inspirations
│   │   └── sampleProject.ts            # "The Glass Boardroom" ready-to-test project
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── providers/
│   │   │   │   ├── demo.ts             # Built-in offline dynamic generator
│   │   │   │   ├── gemini.ts           # Gemini 2.5 Flash implementation
│   │   │   │   └── openai.ts           # OpenAI gpt-4o-mini implementation
│   │   │   ├── index.ts                # Provider factory & config detector
│   │   │   ├── prompts.ts              # Structured JSON system instructions
│   │   │   ├── types.ts                # AI Provider interface
│   │   │   └── validator.ts            # Robust JSON validation & sanitization
│   │   └── exportUtils.ts              # Markdown & JSON export generators
│   └── types/
│       └── story.ts                    # Complete TypeScript definitions
├── .env.example                        # Template for API keys
├── .gitignore                          # Clean gitignore excluding secrets & build files
├── package.json
└── tsconfig.json
```

---

## 🔒 Scope & Disclaimers

- **Creative Asset Focus:** Story Studio produces production-ready screenplays, scene breakdowns, retention architecture, and human-in-the-loop localization reviews. It does **not** synthesize finished video files or audio voiceovers.
- **Privacy & Security:** API keys are never stored on client devices or exposed in network traffic. No user story content is sent to third parties when running in Demo Mode.
- **Human-in-the-Loop Philosophy:** Generative AI accelerates script drafting, but cultural drama nuances and sensitive expressions are intentionally routed through Human Review Flags for editorial verification.

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
