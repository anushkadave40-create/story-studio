import { PilotGenerationParams, AdaptationParams } from "@/types/story";

export function buildPilotPrompt(params: PilotGenerationParams): string {
  return `You are an elite short-form micro-drama showrunner and Content AI production director.
Your specialty is high-retention vertical serials (1 to 5 minute episodes) that hook viewers in the first 3 seconds, build breathless tension, and close on an irresistible cliffhanger without relying on cheap or illogical twists.

PROJECT SPECIFICATIONS:
- Premise: ${params.premise}
- Genre: ${params.genre}
- Target Audience: ${params.targetAudience}
- Source Language: ${params.sourceLanguage}
- Target Duration: ${params.episodeDuration}
- Tone: ${params.tone}
${params.settingContext ? `- Setting & Cultural Context: ${params.settingContext}` : ""}

STRICT PRODUCTION RULES:
1. OPENING HOOK: The first 3-5 seconds MUST seize viewer attention immediately with high visual/sound conflict (breaking object, urgent ticking deadline, sudden confrontation).
2. SCRIPT FORMAT: Professional screenplay format with scene slugs (e.g. INT. / EXT. LOCATION - TIME), character cues in CAPITALS, concise parenthetical action beats, and razor-sharp, natural dialogue.
3. PACING: Calibrated for ${params.episodeDuration}.
   - 1 min: ~120-160 words script, high velocity.
   - 3 min: ~350-450 words script, layered power struggle.
   - 5 min: ~650-800 words script, rich suspense and revelation.
4. SCENE BREAKDOWN: Provide 2 to 4 distinct scenes with visual notes, camera/framing instructions, and lighting/audio SFX cues tailored for vertical/mobile screens.
5. TURNING POINT: A definitive mid-episode fulcrum where power or knowledge inverts.
6. CLIFFHANGER: An unresolved crisis or revelation that makes it impossible for the viewer to swipe away.
7. PROMOTIONAL ASSETS: Viral vertical hook line and short caption with relevant hashtags.

Return ONLY a valid JSON object matching this exact schema:
{
  "title": "Short punchy title",
  "logline": "One-line gripping logline",
  "synopsis": "Concise 3-4 sentence narrative synopsis",
  "genre": "${params.genre}",
  "targetAudience": "${params.targetAudience}",
  "sourceLanguage": "${params.sourceLanguage}",
  "episodeDuration": "${params.episodeDuration}",
  "tone": "${params.tone}",
  "settingContext": "${params.settingContext || ""}",
  "characters": [
    {
      "name": "CHARACTER NAME",
      "role": "Role in story",
      "motivation": "Core desire in this episode",
      "secretOrFlaw": "Hidden agenda or vulnerability"
    }
  ],
  "openingHook": {
    "description": "Why this hooks vertical viewers immediately",
    "visualAction": "Specific 0-3s visual action",
    "dialogueOrSFX": "First dialogue or audio impact",
    "retentionReason": "Psychological driver stopping user scroll"
  },
  "emotionalTurningPoint": {
    "description": "Moment of shift",
    "sceneReference": "Which scene this occurs in",
    "stakesShift": "How power/stakes change"
  },
  "endingCliffhanger": {
    "description": "The closing shock or question",
    "unresolvedQuestion": "Core suspense question",
    "nextEpisodeHook": "Final image / sound before cut to black"
  },
  "fullScript": "Complete screenplay text with scene headings, character names, and dialogue in ${params.sourceLanguage}",
  "scenes": [
    {
      "sceneNumber": 1,
      "heading": "INT. LOCATION - TIME",
      "visualDescription": "Detailed visual setup for camera",
      "cameraPacing": "Camera movement and editing rhythm",
      "lightingAudio": "Lighting tone and audio SFX",
      "scriptSnippet": "Key dialogue or action snippet"
    }
  ],
  "promotionalReel": {
    "hookLine": "Hook text for video overlay / TikTok text",
    "caption": "Social media post caption",
    "suggestedAudioVibe": "Audio style recommendation",
    "hashtags": ["MicroDrama", "DramaBox", "ShortFilm"]
  }
}`;
}

export function buildAdaptationPrompt(params: AdaptationParams): string {
  return `You are a Senior Localization Producer and Cultural Dramaturg for global entertainment platforms.
Your task is to adapt a micro-drama script into ${params.targetLanguage} (${params.audienceRegion || "General target territory"}).

ADAPTATION GUIDELINES:
- Source Language: ${params.sourceLanguage}
- Target Language: ${params.targetLanguage}
- Audience Region / Context: ${params.audienceRegion || "Standard global region"}
- Adaptation Style: ${params.adaptationStyle}
  * faithful: accurate to tone and cadence, polished syntax.
  * conversational: authentic spoken vernacular, natural contemporary idioms.
  * locally_adapted: deep cultural transposition of idioms, honorifics, corporate/social hierarchy, and references.

CRITICAL LOCALIZATION RULES:
1. NEVER do literal word-for-word machine translation. Capture the dramatic subtext, character intentions, emotional stakes, and comedic/dramatic rhythm.
2. PRESERVE all scene labels (e.g. INT. / EXT.) and character names, translating or adjusting only when culturally expected in that territory.
3. IDENTIFY 3-5 HUMAN REVIEW FLAGS: Phrases, idioms, honorific choices, or cultural references that human editors/localization QA should verify before final production.
4. DOCUMENT LOCALIZATION CHOICES: Explain 3-4 specific decisions (honorific shifts, idiom adaptations, register choices) with clear rationales.
5. SUMMARIZE PRESERVATION: Explicitly state how plot integrity, emotional beats, character voice, and tone were preserved.

SCRIPT TO ADAPT:
Title: ${params.storyTitle || "Untitled"}
"""
${params.scriptToAdapt}
"""

Return ONLY a valid JSON object matching this exact schema:
{
  "adaptedTitle": "Localized Title",
  "adaptedLogline": "Localized One-line Logline in target language",
  "adaptedScript": "Complete adapted screenplay in target language, preserving scene headings and character names",
  "localizationChoices": [
    {
      "area": "e.g. Honorifics & Formality / Slang & Idioms / Legal Nuance",
      "originalApproach": "How the source language handled it",
      "adaptedApproach": "How the adapted script handled it",
      "rationale": "Why this preserves cultural authenticity and dramatic weight"
    }
  ],
  "reviewFlags": [
    {
      "originalPhrase": "Exact phrase from source script",
      "adaptedPhrase": "Adapted version in target script",
      "concernType": "idiom | cultural_sensitivity | register_formality | slang_ambiguity | pacing",
      "explanation": "Why a human localization specialist should inspect this choice",
      "suggestedAlternative": "Alternative phrasing or conservative broadcast option"
    }
  ],
  "preservationSummary": {
    "plotIntegrity": "Detailed note on narrative structure retention",
    "emotionalBeats": "Detailed note on emotional trajectory and turning point preservation",
    "characterVoice": "Detailed note on character personality and power dynamic preservation",
    "tonePreservation": "Detailed note on dramatic genre and tension preservation"
  }
}`;
}
