import { AIProvider } from "../types";
import {
  MicroDramaPilot,
  StoryAdaptation,
  PilotGenerationParams,
  AdaptationParams
} from "@/types/story";
import { validateAndCleanPilot, validateAndCleanAdaptation } from "../validator";

export class DemoAIProvider implements AIProvider {
  name = "Demo Studio Engine (Offline / Portfolio Mode)";
  isConfigured = true;

  async generatePilot(params: PilotGenerationParams): Promise<MicroDramaPilot> {
    // Simulate brief network latency for realistic UX feel (500ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    const durationBadge = params.episodeDuration || "3 min";
    const titleWords = params.premise
      .split(" ")
      .slice(0, 4)
      .map((w) => w.replace(/[^a-zA-Z]/g, ""))
      .filter(Boolean)
      .join(" ");

    const dynamicTitle = titleWords ? `The ${titleWords}` : "Midnight Reckoning";

    const mockData = {
      title: dynamicTitle,
      logline: `In this ${params.genre.toLowerCase()}, an unexpected revelation alters the balance of power just as time is about to expire.`,
      synopsis: `Facing insurmountable pressure, the protagonist confronts an old adversary to reclaim what was taken. What began as a routine showdown quickly spirals when a hidden token from the past reveals that the betrayal was engineered from the very beginning.`,
      genre: params.genre,
      targetAudience: params.targetAudience,
      sourceLanguage: params.sourceLanguage,
      episodeDuration: durationBadge,
      tone: params.tone,
      settingContext: params.settingContext || "A dimly lit penthouse boardroom overlooking a rain-swept metropolis at 2:00 AM.",
      characters: [
        {
          name: "MAYA LIN",
          role: "Protagonist / Tenacious Infiltrator",
          motivation: "Expose the illegal covert buyout and clear her family's name before dawn.",
          secretOrFlaw: "Blinded by emotional vendetta, she acts before verifying the final signatory."
        },
        {
          name: "VICTOR STERLING",
          role: "Antagonist / Shadow Investor",
          motivation: "Consolidate controlling equity and wipe out all traces of the original board.",
          secretOrFlaw: "Deeply arrogant; underestimates anyone he perceives as subordinate."
        },
        {
          name: "LEO RAMIREZ",
          role: "Deuteragonist / Systems Analyst",
          motivation: "Keep his job while covertly feeding critical logs to Maya.",
          secretOrFlaw: "Prone to panic under physical intimidation."
        }
      ],
      openingHook: {
        description: "First 3 seconds deliver an immediate visual shock and auditory ultimatum.",
        visualAction: "EXTREME CLOSE-UP: A champagne flute smashes against a marble floor in slow motion. Wine splashes across a classified ledger.",
        dialogueOrSFX: "MAYA (O.S.): 'Step away from the biometric console, Victor. The audit is live.'",
        retentionReason: "Physical destruction coupled with an immediate active conflict halts the vertical scroll thumb instantly."
      },
      emotionalTurningPoint: {
        description: "Victor produces an original wax-sealed document bearing Maya's father's signature, turning her moral certainty inside out.",
        sceneReference: "Scene 2 - The Ledger Revelation",
        stakesShift: "Maya shifts from self-righteous investigator to questioning the very foundation of her multi-year revenge quest."
      },
      endingCliffhanger: {
        description: "A sudden security siren begins flashing red as the vault doors seal shut, locking both rivals inside with only 60 seconds of auxiliary power.",
        unresolvedQuestion: "Did someone on the outside trigger the lockdown to eliminate both of them at once?",
        nextEpisodeHook: "A mechanical voice counts down: 'Depressurization sequence initiated in 59 seconds.' Cut to black."
      },
      fullScript: `INT. TOWER SUITE - NIGHT (02:00 AM)

Rain lashes the reinforced glass. Red warning lights from nearby communication towers slice through the gloom.

MAYA LIN (28, dark coat, damp hair, relentless intensity) stands before the open steel safe.

VICTOR STERLING (54, bespoke charcoal suit, silver signet ring) steps in from the shadows, glass of bourbon in hand.

VICTOR
You have your mother's stubbornness, Maya. And your father's tragic timing.

MAYA
(turning, keeping both hands visible)
The audit files are already mirrored to three international servers, Victor. The board votes at 8:00 AM. You are finished.

Victor chuckles softly. He sips his drink, unbothered.

VICTOR
Did Leo tell you that? Faithful, terrified Leo?

Maya's posture stiffens.

VICTOR (CONT'D)
Check server node four, my dear. 

Maya rapidly taps her wrist device. Her screen flashes AMBER: "ACCESS DENIED - AUTHORIZED BY M. LIN."

MAYA
(whisper)
That's impossible. I never authorized an override.

VICTOR
Not you. Your father. Twenty years ago, he didn't lose this company in a fire. He sold it to me to pay off his gambling debts in Macau.

Victor slides a yellowed contract across the glass desk. Maya's eyes fixate on the unmistakable signature at the bottom.

MAYA
No. He wouldn't...

Suddenly, a loud KLANG vibrates through the walls. Heavy titanium shutters slam shut over every window.

AUTOMATED VOICE (O.S.)
"SECURITY BREACH DETECTED. VAULT LOCKDOWN ENGAGED. AUXILIARY OXYGEN PURGE IN SIXTY SECONDS."

Victor's smile vanishes. For the first time, genuine fear flashes across his face.

VICTOR
Who authorized the lockdown?!

Maya looks at the door. Then slowly turns back to Victor.

MAYA
I think... someone wanted both of us in this room tonight.

FADE OUT.`,
      scenes: [
        {
          sceneNumber: 1,
          heading: "INT. TOWER SUITE - NIGHT",
          visualDescription: "Storm-lit penthouse with cold neon blue exterior reflections. Maya stands illuminated only by the faint green diode of the open safe.",
          cameraPacing: "Fast tracking dolly shot centering on Maya's sharp intake of breath as Victor's shadow enters the frame.",
          lightingAudio: "Muffled thunder rolling, rain on glass, sudden metallic click of safe door swinging shut.",
          scriptSnippet: "VICTOR: 'You have your mother's stubbornness, Maya. And your father's tragic timing.'"
        },
        {
          sceneNumber: 2,
          heading: "INT. TOWER SUITE - CONTINUOUS",
          visualDescription: "Victor slides the yellowed document under the single halogen desk lamp. Extreme macro shot of the ink signature.",
          cameraPacing: "Slow-motion push-in on Maya's eyes widening in horrified recognition.",
          lightingAudio: "Low synthesizer drone crescendo; ambient rain audio fades into vacuum-like silence.",
          scriptSnippet: "VICTOR: 'Twenty years ago, he didn't lose this company in a fire. He sold it to me.'"
        },
        {
          sceneNumber: 3,
          heading: "INT. TOWER SUITE - MOMENTS LATER",
          visualDescription: "Massive titanium blast doors drop down. The room is instantly drenched in pulsing crimson emergency beacon light.",
          cameraPacing: "Handheld Dutch angle shaking with the shudder of the lockdown mechanisms.",
          lightingAudio: "Heavy metallic hydraulic slam, echoing klaxon alarm, synthesized computerized countdown.",
          scriptSnippet: "AUTOMATED VOICE: 'SECURITY BREACH DETECTED. AUXILIARY OXYGEN PURGE IN SIXTY SECONDS.'"
        }
      ],
      promotionalReel: {
        hookLine: "She broke into the vault to avenge her father... only to find HIS signature on the hit contract 😱💥",
        caption: "Never assume you know the whole story until the safe opens. Catch Episode 1 of THE VAULT BETRAYAL now! #MicroDrama #RevengeDrama #ShortsSeries #TikTokDramas",
        suggestedAudioVibe: "Dark industrial thriller pulse with heart-racing synth riser",
        hashtags: ["MicroDrama", "ShortSeries", "RevengePlot", "TikTokThriller", "DramaBox"]
      }
    };

    return validateAndCleanPilot(mockData, params);
  }

  async adaptScript(params: AdaptationParams): Promise<StoryAdaptation> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Determine target language cues
    const isSpanish = params.targetLanguage.toLowerCase().includes("spanish");
    const isChinese = params.targetLanguage.toLowerCase().includes("chinese") || params.targetLanguage.toLowerCase().includes("mandarin");
    const isHindi = params.targetLanguage.toLowerCase().includes("hindi");

    let adaptedTitle = `${params.storyTitle || "Drama"} (${params.targetLanguage})`;
    let adaptedLogline = `Una adaptación dramática diseñada para la audiencia de ${params.audienceRegion || params.targetLanguage}.`;
    let sampleScript = params.scriptToAdapt;

    if (isSpanish) {
      adaptedTitle = "La Traición del Piso 54";
      adaptedLogline = "A las 2 AM durante una auditoría clandestina, una investigadora descubre que el enemigo al que persiguió durante años tiene en su poder el contrato firmado por su propio padre.";
      sampleScript = params.scriptToAdapt
        .replace(/MAYA LIN/g, "MAYA LIN")
        .replace(/VICTOR STERLING/g, "VÍCTOR STERLING")
        .replace(/INT\. TOWER SUITE - NIGHT/g, "INT. SUITE DE LA TORRE - NOCHE")
        .replace(/Rain lashes the reinforced glass/g, "La lluvia azota los cristales blindados")
        .replace(/Step away from the biometric console/g, "Aléjate de la consola biométrica, Víctor")
        .replace(/You have your mother's stubbornness/g, "Tienes la misma terquedad de tu madre, Maya. Y el pésimo sentido de la oportunidad de tu padre.")
        .replace(/The audit files are already mirrored/g, "Los archivos de la auditoría ya están respaldados en tres servidores internacionales. La junta vota a las ocho.")
        .replace(/Who authorized the lockdown/g, "¡¿Quién autorizó el protocolo de aislamiento?!");
    } else if (isChinese) {
      adaptedTitle = "绝境反转：五十四层的秘密";
      adaptedLogline = "凌晨两点，复仇者潜入宿敌的秘密金库，却意外发现了生父二十年前亲手签下的绝密让渡书。";
    } else if (isHindi) {
      adaptedTitle = "आधी रात का धोखा: 54वीं मंजिल";
      adaptedLogline = "रात के दो बजे अपने पिता के अपमान का बदला लेने आई माया को पता चलता है कि असली मुजरिम कोई और नहीं, खुद उसके अपने थे।";
    }

    const mockAdaptation = {
      adaptedTitle,
      adaptedLogline,
      adaptedScript: sampleScript,
      localizationChoices: [
        {
          area: "Honorifics & Social Hierarchy",
          originalApproach: "Direct first-name confrontation.",
          adaptedApproach: `Tailored power address reflecting ${params.audienceRegion || params.targetLanguage} corporate and dramatic conventions.`,
          rationale: "Ensures the adversarial tension feels culturally organic rather than dubbed, accentuating the condescending age gap between the characters."
        },
        {
          area: "Idiomatic & Vernacular Adaptation",
          originalApproach: "Colloquial American thriller metaphors ('traded his life's work', 'blinded by vendetta').",
          adaptedApproach: "Replaced with regional dramatic idioms that convey bitter family betrayal without sounding artificial.",
          rationale: "Preserves the gut-punch emotional delivery for fast-scrolling mobile drama consumers."
        },
        {
          area: "Pacing & Sentence Cadence",
          originalApproach: "Medium-length English compound sentences.",
          adaptedApproach: "Tightened dialogue beats into staccato, rapid-fire rhythmic deliveries.",
          rationale: "Crucial for short-form video subtitles and vertical viewing where dialogue read speed is under 1.5 seconds per line."
        }
      ],
      reviewFlags: [
        {
          originalPhrase: "You have your mother's stubbornness, Maya.",
          adaptedPhrase: isSpanish
            ? "Tienes la misma terquedad de tu madre, Maya."
            : "Original line localized with regional familial nuance.",
          concernType: "register_formality",
          explanation: "Confirm whether the antagonist should use formal or informal address. Familiarity highlights personal betrayal, whereas formal address magnifies corporate coldness.",
          suggestedAlternative: isSpanish
            ? "Usted heredó la terquedad de su madre, señorita Lin."
            : "Consider formal pronoun shift if higher executive distance is preferred.",
          status: "pending"
        },
        {
          originalPhrase: "Check server node four, my dear.",
          adaptedPhrase: isSpanish ? "Revisa el nodo cuatro del servidor, corazón." : "Localized patronizing term.",
          concernType: "cultural_sensitivity",
          explanation: "Patronizing term of endearment must sting without violating localized platform community guidelines for workplace harassment.",
          suggestedAlternative: isSpanish ? "Revisa el nodo cuatro, querida." : "Neutral cold alternative.",
          status: "pending"
        },
        {
          originalPhrase: "Sold it to me to pay off his gambling debts in Macau.",
          adaptedPhrase: isSpanish
            ? "Me la vendió para pagar sus deudas de juego en Macao."
            : "Gambling debt reference adapted.",
          concernType: "idiom",
          explanation: "Verify regional sensitivity regarding overseas gambling references in broadcast jurisdictions with strict gaming depiction guidelines.",
          suggestedAlternative: "Replace with 'deudas financieras no declaradas' (unreported financial liabilities) if regulatory compliance is strict.",
          status: "pending"
        }
      ],
      preservationSummary: {
        plotIntegrity: "The exact 3-scene beat sheet is maintained: the safe break-in, the discovery of the father's contract, and the sudden third-party vault lockdown.",
        emotionalBeats: "The shock of filial disillusionment and the panic of the ticking-clock cliffhanger are preserved with heightened emotional stakes.",
        characterVoice: "Maya's relentless tenacity and Victor's silky menace have been preserved with dialogue tailored to natural cadence.",
        tonePreservation: "The atmospheric, high-stakes suspense remains calibrated for high-retention vertical short-form serials."
      }
    };

    return validateAndCleanAdaptation(mockAdaptation, params);
  }
}
