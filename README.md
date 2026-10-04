# Story Studio

**A local-first AI micro-drama and Hindi–English story adaptation studio.**

Story Studio turns a premise into a short-form drama pilot and scene breakdown, helps adapt a screenplay between Hindi and English, and can render a selected scene as a local video clip. It is designed as a content workflow prototype: generate, review, adapt, and export.

> This is a portfolio project, not a hosted service. Script and video generation connect to software running on the same computer. The demo mode works without an AI model and labels its sample output clearly.

## What it demonstrates

- **Micro-drama development:** premise, genre, tone, hooks, screenplay, and scene breakdowns.
- **Hindi ↔ English adaptation:** adaptation styles and human-review cues for idioms and cultural context.
- **Local model workflow:** Ollama for script generation, with an explicit offline sample mode when Ollama is unavailable.
- **Scene-to-video workflow:** send a selected scene to local ComfyUI and preview or save the resulting clip.
- **Production handoff:** workflow notes, quality checklist, and Markdown/JSON export.

## Technology

Next.js 16 · React · TypeScript · Tailwind CSS · Ollama · ComfyUI

## Run Story Studio

Requirements: Node.js 20 or later and npm.

```bash
git clone https://github.com/YOUR_USERNAME/story-studio.git
cd story-studio
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Replace `YOUR_USERNAME` with your GitHub username after creating the repository.

### Generate scripts with Ollama (optional)

Install [Ollama](https://ollama.com), then run a local model:

```bash
ollama run llama3.2
```

The app uses `http://127.0.0.1:11434` and `llama3.2` by default. Change `OLLAMA_BASE_URL` or `OLLAMA_MODEL` in `.env.local` if needed. If Ollama is not running, Story Studio uses its clearly labelled offline demo mode.

### Generate video with ComfyUI (optional)

Video generation requires [ComfyUI](https://www.comfy.org/download) running locally at `http://127.0.0.1:8188`. ComfyUI Desktop manages its own instances and model storage; install the required models into the storage directory for the instance connected to Story Studio.

For the included LTX workflow, install:

- [LTX-Video checkpoint](https://huggingface.co/Lightricks/LTX-Video/blob/main/ltx-video-2b-v0.9.5.safetensors) in `models/checkpoints/` (about 6.34 GB).
- [T5 text encoder](https://huggingface.co/comfyanonymous/flux_text_encoders/blob/main/t5xxl_fp16.safetensors) in `models/text_encoders/` (about 9.79 GB).

The two model files require about **16.1 GB** of disk space. ComfyUI Desktop can use its built-in video export when available. If it is unavailable, install VideoHelperSuite from ComfyUI Desktop’s Extensions panel. Restart ComfyUI after installing models or extensions, then use **Test Connection** in Story Studio.

The model weights are not included in this repository. Keep them out of GitHub; their usage terms are separate from this project's MIT license. Video rendering speed and feasibility depend on your computer.

## Privacy and deployment

When run locally, Story Studio sends prompts to the local Ollama and ComfyUI services configured for that machine; it does not require hosted AI API keys. The app stores the active project in the browser's local storage and saves rendered clips under `public/outputs/` locally.

The source repo is suitable for a GitHub portfolio link. A public deployment is not included: a hosted server cannot access your computer's `127.0.0.1` services, so online generation would need a different backend setup.

## License

Story Studio source code is licensed under the [MIT License](LICENSE). Model weights and third-party tools have their own licenses and are not covered by the project's license.
