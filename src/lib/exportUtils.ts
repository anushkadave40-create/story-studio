import { StoryProject } from "@/types/story";

export function generateMarkdownExport(project: StoryProject): string {
  const p = project.pilot;
  const a = project.adaptation;
  const w = project.workflowNotes;

  let md = `# ${project.title || "Story Studio Production Package"}
*Generated & Managed via Story Studio — AI Micro-Drama & Multilingual Workflow*
*Exported at: ${new Date().toLocaleString()}*

---

## 1. PROJECT METADATA & CREATIVE SPECIFICATION
`;

  if (p) {
    md += `
- **Original Title:** ${p.title}
- **Logline:** ${p.logline}
- **Genre:** ${p.genre}
- **Target Audience:** ${p.targetAudience}
- **Source Language:** ${p.sourceLanguage}
- **Episode Duration:** ${p.episodeDuration}
- **Dramatic Tone:** ${p.tone}
${p.settingContext ? `- **Setting & Cultural Context:** ${p.settingContext}\n` : ""}

### Synopsis
${p.synopsis}

---

## 2. CHARACTER DOSSIER & MOTIVATIONS
`;

    p.characters.forEach((char, i) => {
      md += `
### ${i + 1}. ${char.name} (${char.role})
- **Core Motivation:** ${char.motivation}
- **Secret / Narrative Flaw:** ${char.secretOrFlaw}
`;
    });

    md += `
---

## 3. RETENTION & DRAMATIC ARCHITECTURE

### 🪝 Opening Hook (First 3-5 Seconds)
- **Visual Action:** ${p.openingHook.visualAction}
- **Dialogue / SFX:** ${p.openingHook.dialogueOrSFX}
- **Retention Strategy:** ${p.openingHook.description}
- **Why It Stops The Scroll:** ${p.openingHook.retentionReason}

### ⚡ Emotional Turning Point
- **Scene Reference:** ${p.emotionalTurningPoint.sceneReference}
- **Shift Description:** ${p.emotionalTurningPoint.description}
- **Stakes Inversion:** ${p.emotionalTurningPoint.stakesShift}

### 🧗 Ending Cliffhanger
- **Suspense Action:** ${p.endingCliffhanger.description}
- **Unresolved Question:** ${p.endingCliffhanger.unresolvedQuestion}
- **Next Episode Hook:** ${p.endingCliffhanger.nextEpisodeHook}

---

## 4. ORIGINAL PRODUCTION SCREENPLAY (${p.sourceLanguage.toUpperCase()})

\`\`\`screenplay
${p.fullScript}
\`\`\`

---

## 5. SCENE-BY-SCENE PRODUCTION BREAKDOWN
`;

    p.scenes.forEach((scene) => {
      md += `
### Scene ${scene.sceneNumber}: ${scene.heading}
- **Visual Setup:** ${scene.visualDescription}
- **Camera Movement & Pacing:** ${scene.cameraPacing}
- **Lighting & Audio SFX:** ${scene.lightingAudio}
- **Key Dialogue Snippet:** "${scene.scriptSnippet}"
`;
    });

    md += `
---

## 6. PROMOTIONAL REEL & SOCIAL HOOKS
- **Viral Reel Hook:** ${p.promotionalReel.hookLine}
- **Caption:** ${p.promotionalReel.caption}
- **Suggested Audio Vibe:** ${p.promotionalReel.suggestedAudioVibe}
- **Hashtags:** ${p.promotionalReel.hashtags.map((h) => `#${h.replace(/^#/, "")}`).join(" ")}
`;
  } else {
    md += `\n*No original pilot generated yet.*\n`;
  }

  if (a) {
    md += `
---

## 7. MULTILINGUAL ADAPTATION (${a.targetLanguage.toUpperCase()})

- **Target Language:** ${a.targetLanguage}
- **Audience Region / Territory:** ${a.audienceRegion}
- **Adaptation Strategy:** ${a.adaptationStyle.replace("_", " ").toUpperCase()}
- **Localized Title:** ${a.adaptedTitle}
- **Localized Logline:** ${a.adaptedLogline}

### Localized Screenplay
\`\`\`screenplay
${a.adaptedScript}
\`\`\`

### Localization Rationale & Decisions
| Domain | Source Approach | Adapted Approach | Dramatic Rationale |
| :--- | :--- | :--- | :--- |
${a.localizationChoices
  .map(
    (c) =>
      `| **${c.area}** | ${c.originalApproach.replace(/\|/g, "/")} | ${c.adaptedApproach.replace(/\|/g, "/")} | ${c.rationale.replace(/\|/g, "/")} |`
  )
  .join("\n")}

### ⚠️ Human Localization Review Flags
*Flagged phrases requiring verification by regional editors or cultural dramaturgs prior to production:*

| Original Phrase | Adapted Phrasing | Concern Type | QA Explanation | Suggested Alternative | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
${a.reviewFlags
  .map(
    (f) =>
      `| "${f.originalPhrase.replace(/\|/g, "/")}" | "${f.adaptedPhrase.replace(/\|/g, "/")}" | \`${f.concernType}\` | ${f.explanation.replace(/\|/g, "/")} | "${f.suggestedAlternative.replace(/\|/g, "/")}" | **${f.status.toUpperCase()}** |`
  )
  .join("\n")}

### Preservation Assessment
- **Plot Integrity:** ${a.preservationSummary.plotIntegrity}
- **Emotional Beats:** ${a.preservationSummary.emotionalBeats}
- **Character Voice:** ${a.preservationSummary.characterVoice}
- **Tone & Genre Preservation:** ${a.preservationSummary.tonePreservation}
`;
  }

  if (w) {
    md += `
---

## 8. CONTENT AI WORKFLOW & PRODUCTION NOTES

- **Tools & Models Utilized:** ${w.toolsUsed || "Story Studio AI Engine"}
- **Prompt Engineering & Iteration History:**
${w.promptRevisions || "Initial production prompt."}

- **Production & Framing Observations:**
${w.productionObservations || "Optimized for 9:16 mobile display."}

### Quality Assurance Checklist
- [${w.qaChecklist.hookVerified ? "x" : " "}] Opening hook verified within first 3-5 seconds
- [${w.qaChecklist.dialoguePacingNatural ? "x" : " "}] Dialogue calibrated for short-form mobile delivery
- [${w.qaChecklist.culturalSensitivityChecked ? "x" : " "}] Idiom review flags and cultural sensitivities verified
- [${w.qaChecklist.cliffhangerCompelling ? "x" : " "}] Ending cliffhanger verified without unmotivated twists
- [${w.qaChecklist.sceneLabelsPreserved ? "x" : " "}] Scene labels and character names preserved across adaptations
`;
  }

  md += `
---
*Produced with Story Studio — AI Micro-Drama Creative Suite*
`;

  return md;
}

export function generateJsonExport(project: StoryProject): string {
  return JSON.stringify(project, null, 2);
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
