export interface Character {
  name: string;
  role: string;
  motivation: string;
  secretOrFlaw: string;
}

export interface Scene {
  sceneNumber: number;
  heading: string;
  visualDescription: string;
  cameraPacing: string;
  lightingAudio: string;
  scriptSnippet: string;
}

export interface OpeningHook {
  description: string;
  visualAction: string;
  dialogueOrSFX: string;
  retentionReason: string;
}

export interface EmotionalTurningPoint {
  description: string;
  sceneReference: string;
  stakesShift: string;
}

export interface EndingCliffhanger {
  description: string;
  unresolvedQuestion: string;
  nextEpisodeHook: string;
}

export interface PromotionalReel {
  hookLine: string;
  caption: string;
  suggestedAudioVibe: string;
  hashtags: string[];
}

export interface MicroDramaPilot {
  id: string;
  createdAt: string;
  title: string;
  logline: string;
  synopsis: string;
  genre: string;
  targetAudience: string;
  sourceLanguage: string;
  episodeDuration: "1 min" | "3 min" | "5 min";
  tone: string;
  settingContext?: string;
  characters: Character[];
  openingHook: OpeningHook;
  emotionalTurningPoint: EmotionalTurningPoint;
  endingCliffhanger: EndingCliffhanger;
  fullScript: string;
  scenes: Scene[];
  promotionalReel: PromotionalReel;
}

export type ReviewFlagStatus = "pending" | "approved" | "edited";

export interface ReviewFlag {
  id: string;
  originalPhrase: string;
  adaptedPhrase: string;
  concernType: "idiom" | "cultural_sensitivity" | "register_formality" | "slang_ambiguity" | "pacing";
  explanation: string;
  suggestedAlternative: string;
  status: ReviewFlagStatus;
}

export interface LocalizationChoice {
  area: string;
  originalApproach: string;
  adaptedApproach: string;
  rationale: string;
}

export interface PreservationSummary {
  plotIntegrity: string;
  emotionalBeats: string;
  characterVoice: string;
  tonePreservation: string;
}

export interface StoryAdaptation {
  id: string;
  createdAt: string;
  sourceLanguage: string;
  targetLanguage: string;
  audienceRegion: string;
  adaptationStyle: "faithful" | "conversational" | "locally_adapted";
  adaptedTitle: string;
  adaptedLogline: string;
  adaptedScript: string;
  localizationChoices: LocalizationChoice[];
  reviewFlags: ReviewFlag[];
  preservationSummary: PreservationSummary;
}

export interface QAChecklist {
  hookVerified: boolean;
  dialoguePacingNatural: boolean;
  culturalSensitivityChecked: boolean;
  cliffhangerCompelling: boolean;
  sceneLabelsPreserved: boolean;
}

export interface WorkflowNotes {
  toolsUsed: string;
  promptRevisions: string;
  productionObservations: string;
  qaChecklist: QAChecklist;
}

export interface StoryProject {
  id: string;
  title: string;
  lastModified: string;
  pilot: MicroDramaPilot | null;
  adaptation: StoryAdaptation | null;
  workflowNotes: WorkflowNotes;
}

export interface PilotGenerationParams {
  premise: string;
  genre: string;
  targetAudience: string;
  sourceLanguage: string;
  episodeDuration: "1 min" | "3 min" | "5 min";
  tone: string;
  settingContext?: string;
}

export interface AdaptationParams {
  scriptToAdapt: string;
  storyTitle?: string;
  sourceLanguage: string;
  targetLanguage: string;
  audienceRegion?: string;
  adaptationStyle: "faithful" | "conversational" | "locally_adapted";
}
