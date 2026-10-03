import {
  MicroDramaPilot,
  StoryAdaptation,
  PilotGenerationParams,
  AdaptationParams
} from "@/types/story";

export interface AIProvider {
  name: string;
  isConfigured: boolean;
  generatePilot(params: PilotGenerationParams): Promise<MicroDramaPilot>;
  adaptScript(params: AdaptationParams): Promise<StoryAdaptation>;
}
