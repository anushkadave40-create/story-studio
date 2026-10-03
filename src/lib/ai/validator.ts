import {
  MicroDramaPilot,
  StoryAdaptation,
  PilotGenerationParams,
  AdaptationParams,
  ReviewFlag
} from "@/types/story";

export function validateAndCleanPilot(
  data: unknown,
  params: PilotGenerationParams
): MicroDramaPilot {
  const d = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;

  const characters = Array.isArray(d.characters) && d.characters.length > 0
    ? d.characters.map((c: unknown) => {
        const char = (c && typeof c === "object" ? c : {}) as Record<string, unknown>;
        return {
          name: String(char.name || "CHARACTER"),
          role: String(char.role || "Lead Role"),
          motivation: String(char.motivation || "Driven by hidden stakes"),
          secretOrFlaw: String(char.secretOrFlaw || "Unresolved conflict")
        };
      })
    : [
        {
          name: "PROTAGONIST",
          role: "Lead",
          motivation: "Achieve justice against impossible odds",
          secretOrFlaw: "Vulnerable to past betrayal"
        },
        {
          name: "ANTAGONIST",
          role: "Opposition",
          motivation: "Maintain absolute control",
          secretOrFlaw: "Arrogant overconfidence"
        }
      ];

  const scenes = Array.isArray(d.scenes) && d.scenes.length > 0
    ? d.scenes.map((s: unknown, index: number) => {
        const sc = (s && typeof s === "object" ? s : {}) as Record<string, unknown>;
        return {
          sceneNumber: typeof sc.sceneNumber === "number" ? sc.sceneNumber : index + 1,
          heading: String(sc.heading || `SCENE ${index + 1}`),
          visualDescription: String(sc.visualDescription || "Dramatic visual composition with tight focal framing."),
          cameraPacing: String(sc.cameraPacing || "Handheld push-in to capture emotional realization."),
          lightingAudio: String(sc.lightingAudio || "Atmospheric key light with tense ambient score."),
          scriptSnippet: String(sc.scriptSnippet || "")
        };
      })
    : [
        {
          sceneNumber: 1,
          heading: "INT. PRIMARY LOCATION - NIGHT",
          visualDescription: "Tight focus on central conflict under dramatic lighting.",
          cameraPacing: "Fast-paced vertical tracking shot.",
          lightingAudio: "High contrast lighting with mounting audio tension.",
          scriptSnippet: String(d.fullScript || "").slice(0, 100)
        }
      ];

  const openingHookObj = (d.openingHook && typeof d.openingHook === "object" ? d.openingHook : {}) as Record<string, unknown>;
  const turningPointObj = (d.emotionalTurningPoint && typeof d.emotionalTurningPoint === "object" ? d.emotionalTurningPoint : {}) as Record<string, unknown>;
  const cliffhangerObj = (d.endingCliffhanger && typeof d.endingCliffhanger === "object" ? d.endingCliffhanger : {}) as Record<string, unknown>;
  const promoReelObj = (d.promotionalReel && typeof d.promotionalReel === "object" ? d.promotionalReel : {}) as Record<string, unknown>;

  return {
    id: `pilot-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    title: String(d.title || "Untitled Micro-Drama"),
    logline: String(d.logline || "A high-stakes confrontation turns the tables when an unexpected secret comes to light."),
    synopsis: String(d.synopsis || params.premise),
    genre: String(d.genre || params.genre),
    targetAudience: String(d.targetAudience || params.targetAudience),
    sourceLanguage: String(d.sourceLanguage || params.sourceLanguage),
    episodeDuration: params.episodeDuration,
    tone: String(d.tone || params.tone),
    settingContext: params.settingContext || String(d.settingContext || ""),
    characters,
    openingHook: {
      description: String(openingHookObj.description || "Grabs viewer instantly with high stakes conflict in first 3 seconds."),
      visualAction: String(openingHookObj.visualAction || "Extreme close-up on shattering glass or sudden movement."),
      dialogueOrSFX: String(openingHookObj.dialogueOrSFX || "A sharp ultimatum spoken over heavy ambient silence."),
      retentionReason: String(openingHookObj.retentionReason || "Prevents swipe-away by starting in media res.")
    },
    emotionalTurningPoint: {
      description: String(turningPointObj.description || "The power dynamic reverses as a concealed truth is exposed."),
      sceneReference: String(turningPointObj.sceneReference || "Scene 2 - The Pivot"),
      stakesShift: String(turningPointObj.stakesShift || "Control flips from one party to the other.")
    },
    endingCliffhanger: {
      description: String(cliffhangerObj.description || "An unexpected revelation cuts the scene right at peak tension."),
      unresolvedQuestion: String(cliffhangerObj.unresolvedQuestion || "What is the true identity or consequence awaiting next episode?"),
      nextEpisodeHook: String(cliffhangerObj.nextEpisodeHook || "A sudden notification alert or approaching footsteps before cut to black.")
    },
    fullScript: String(d.fullScript || "// SCRIPT CONTENT UNAVAILABLE"),
    scenes,
    promotionalReel: {
      hookLine: String(promoReelObj.hookLine || "You will not believe what was hiding in this room... 😱"),
      caption: String(promoReelObj.caption || "When betrayal strikes at 2 AM. Watch Episode 1 now! #MicroDrama #ShortSeries"),
      suggestedAudioVibe: String(promoReelObj.suggestedAudioVibe || "Tense bass pulse with sudden melodic cutoff"),
      hashtags: Array.isArray(promoReelObj.hashtags)
        ? promoReelObj.hashtags.map(String)
        : ["MicroDrama", "DramaBox", "ShortFilm", "Trending"]
    }
  };
}

export function validateAndCleanAdaptation(
  data: unknown,
  params: AdaptationParams
): StoryAdaptation {
  const d = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;

  const localizationChoices = Array.isArray(d.localizationChoices) && d.localizationChoices.length > 0
    ? d.localizationChoices.map((c: unknown) => {
        const ch = (c && typeof c === "object" ? c : {}) as Record<string, unknown>;
        return {
          area: String(ch.area || "Formality & Tone"),
          originalApproach: String(ch.originalApproach || "Literal phrasing"),
          adaptedApproach: String(ch.adaptedApproach || "Colloquial cultural adaptation"),
          rationale: String(ch.rationale || "Maintains authentic dramatic weight for target audience.")
        };
      })
    : [
        {
          area: "Honorifics & Social Register",
          originalApproach: "Direct source address",
          adaptedApproach: "Culturally naturalized hierarchical address",
          rationale: "Aligns with target region entertainment conventions."
        }
      ];

  const reviewFlags: ReviewFlag[] = Array.isArray(d.reviewFlags) && d.reviewFlags.length > 0
    ? d.reviewFlags.map((f: unknown, index: number) => {
        const fl = (f && typeof f === "object" ? f : {}) as Record<string, unknown>;
        const validConcernTypes = ["idiom", "cultural_sensitivity", "register_formality", "slang_ambiguity", "pacing"];
        const concernType = validConcernTypes.includes(String(fl.concernType))
          ? (String(fl.concernType) as ReviewFlag["concernType"])
          : "idiom";

        return {
          id: `flag-${Date.now()}-${index}`,
          originalPhrase: String(fl.originalPhrase || "Source phrase"),
          adaptedPhrase: String(fl.adaptedPhrase || "Adapted phrase"),
          concernType,
          explanation: String(fl.explanation || "Requires human localization check for nuance."),
          suggestedAlternative: String(fl.suggestedAlternative || "Consider neutral dubbing phrasing."),
          status: "pending" as const
        };
      })
    : [];

  const presObj = (d.preservationSummary && typeof d.preservationSummary === "object" ? d.preservationSummary : {}) as Record<string, unknown>;

  return {
    id: `adaptation-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    sourceLanguage: params.sourceLanguage,
    targetLanguage: params.targetLanguage,
    audienceRegion: params.audienceRegion || "General Region",
    adaptationStyle: params.adaptationStyle,
    adaptedTitle: String(d.adaptedTitle || params.storyTitle || "Adapted Story"),
    adaptedLogline: String(d.adaptedLogline || "A localized adaptation retaining core stakes and character conflict."),
    adaptedScript: String(d.adaptedScript || params.scriptToAdapt),
    localizationChoices,
    reviewFlags,
    preservationSummary: {
      plotIntegrity: String(presObj.plotIntegrity || "Full narrative timeline and key revelations preserved."),
      emotionalBeats: String(presObj.emotionalBeats || "Turning points and character emotional arcs mirrored faithfully."),
      characterVoice: String(presObj.characterVoice || "Individual character temperaments adapted to target vernacular."),
      tonePreservation: String(presObj.tonePreservation || "Dramatic genre tension and pacing maintained.")
    }
  };
}
