import { StoryProject } from "@/types/story";

export const SAMPLE_PROJECT: StoryProject = {
  id: "sample-project-the-glass-boardroom",
  title: "The Glass Boardroom",
  lastModified: new Date().toISOString(),
  pilot: {
    id: "pilot-sample-01",
    createdAt: new Date().toISOString(),
    title: "The Glass Boardroom",
    logline: "At 2 AM during a hostile corporate takeover, an uncompromising new CEO discovers the anonymous whistleblower who destroyed her father is sitting across the mahogany table — holding the voting proxy.",
    synopsis: "Elena Vance has spent six grueling years clawing her way to the executive suite of Vanguard Global to avenge her father's ruined reputation. During an emergency midnight vote to finalize a predatory buyout, senior board member Julian Cross casually slides an antique fountain pen across the table. Recognizing the engraved crest that once belonged to her father's private vault, Elena realizes Julian wasn't just a competitor — he was the architect of their downfall, and the board resolution she is about to sign transfers total ownership to his shadow firm.",
    genre: "Corporate Revenge Melodrama",
    targetAudience: "Young urban professionals & vertical micro-drama viewers (Ages 20-35)",
    sourceLanguage: "English",
    episodeDuration: "3 min",
    tone: "High Tension & Razor-Sharp Betrayal",
    settingContext: "A rain-lashed 54th-floor penthouse boardroom in Manhattan, 2:15 AM. Dim ambient lighting with city skyline reflections.",
    characters: [
      {
        name: "ELENA VANCE",
        role: "Protagonist / Incoming Managing Director",
        motivation: "Restore her father's name and consolidate control over Vanguard Global before sunrise.",
        secretOrFlaw: "Blinded by vengeance, she overlooks hidden riders in corporate bylaws."
      },
      {
        name: "JULIAN CROSS",
        role: "Antagonist / Senior Board Trustee",
        motivation: "Liquidate Vanguard Global's intellectual property into an offshore shell company.",
        secretOrFlaw: "Narcissistic sadism — can't resist toying with Elena before executing the trap."
      },
      {
        name: "KAI CHEN",
        role: "Deuteragonist / General Legal Counsel",
        motivation: "Protect the firm from SEC violations while remaining secretly loyal to Elena's family.",
        secretOrFlaw: "Hesitant under intimidation; requires hard leverage to take a stand."
      }
    ],
    openingHook: {
      description: "First 4 seconds grab the audience with an immediate visual countdown and high-stakes physical conflict.",
      visualAction: "EXTREME CLOSE-UP on a heavy glass tumbler shattering on a dark mahogany conference table. Whiskey splashes across a 90-page legal contract.",
      dialogueOrSFX: "ELENA (O.S.): 'One minute until the exchange opens in Tokyo. Sign it, Julian, or watch your empire turn to ash.'",
      retentionReason: "Starts in media res at the peak of conflict; the shattering glass and urgent deadline compel vertical viewers not to scroll away."
    },
    emotionalTurningPoint: {
      description: "Julian flips Elena's psychological leverage by revealing an artifact only her father possessed.",
      sceneReference: "Scene 2 - The Fountain Pen Reveal",
      stakesShift: "Elena shifts from confident predator to trapped prey as she realizes Julian anticipated her vendetta six years before she began."
    },
    endingCliffhanger: {
      description: "A biometric tablet chimes with an irreversible electronic transaction that Elena did not authorize.",
      unresolvedQuestion: "Did Julian just seize voting control using Elena's stolen biometric key, or has Kai flipped sides?",
      nextEpisodeHook: "Elena reaches for the security phone as all boardroom lights plunge into pitch-black emergency strobe."
    },
    fullScript: `INT. VANGUARD BOARDROOM - NIGHT (02:14 AM)

A storm hammers against floor-to-ceiling glass. The Manhattan skyline flickers through heavy rain.

ELENA VANCE (29, tailored charcoal blazer, cold calculation in her eyes) stands at the head of the table. 

Sitting opposite is JULIAN CROSS (52, silver hair, silver tongue, bespoke Italian silk). 

Between them sits KAI CHEN (31), laptop open, screen pulsing with real-time stock ticker graphs.

ELENA
Tokyo opens in forty seconds, Julian. The proxy votes are locked. You're out.

Julian doesn't flinch. He swirls the amber liquid in his crystal glass, amused.

JULIAN
Bold speech, Elena. Your father used to give the exact same preamble before he surrendered his life's work.

ELENA
(voice steady, razor-edged)
My father trusted a viper. I brought anti-venom. Kai, execute the share recall.

Kai hesitates, fingers hovering above the enter key. His eyes dart toward Julian.

JULIAN
Go ahead, Kai. Tell our new Managing Director what Article 14, Subsection C actually specifies.

Elena's brow twitches. A split-second crack in her armor.

KAI
(clearing throat, trembling)
Elena... any unannounced shareholder vote called after midnight requires unanimous consent from the founder's trust.

ELENA
I hold the founder's trust!

JULIAN
Did you check the safe-deposit box at Midtown Trust this morning?

Julian reaches inside his coat pocket. He places a tarnished gold fountain pen onto the glossy mahogany surface.

An eagle crest is etched into the cap. Elena's breath catches in her throat.

ELENA
Where did you get that? That was in my father's study the night he died.

JULIAN
(leaning in, whispering cold)
He didn't die of a broken heart, Elena. He sold me that trust for three million dollars in unbacked bonds... and he laughed while doing it.

A sudden BEEP echoes from Elena's tablet. 

ON TABLET SCREEN: "BIOMETRIC OVERRIDE CONFIRMED. VOTING SHARES TRANSFERRED TO APEX HOLDINGS."

Elena stares down in horror. 

JULIAN (CONT'D)
Thank you for the signature, sweetheart.

The boardroom LIGHTS SNAP OFF. 

Only the red EMERGENCY STROBE pulses across their faces.

FADE OUT.`,
    scenes: [
      {
        sceneNumber: 1,
        heading: "INT. VANGUARD BOARDROOM - NIGHT",
        visualDescription: "Thunder illuminates the rain-soaked skyscraper windows. Dramatic high-contrast chiaroscuro lighting framing Elena against the dark skyline.",
        cameraPacing: "Fast tracking shot along the conference table landing on Elena's locked gaze; cuts abruptly to Julian's calm smile.",
        lightingAudio: "Muffled thunder rolls, continuous rain patter, sharp rhythmic clicking of mechanical keyboard.",
        scriptSnippet: "ELENA: 'Tokyo opens in forty seconds, Julian. The proxy votes are locked. You're out.'"
      },
      {
        sceneNumber: 2,
        heading: "INT. VANGUARD BOARDROOM - MOMENTS LATER",
        visualDescription: "Julian reveals the vintage gold fountain pen. Extreme macro shot of the eagle crest catching the overhead spot beam.",
        cameraPacing: "Slow-motion push-in on the sliding pen, matched with Elena's pupils dilating in shock.",
        lightingAudio: "Deep sub-bass drone building tension; room audio drops to near-silence as the pen clicks on wood.",
        scriptSnippet: "JULIAN: 'He didn't die of a broken heart, Elena. He sold me that trust... and he laughed while doing it.'"
      },
      {
        sceneNumber: 3,
        heading: "INT. VANGUARD BOARDROOM - CONTINUOUS",
        visualDescription: "Tablet screen illuminates Elena's face in cold blue. The room abruptly plunges into emergency red strobe light as alarms sound.",
        cameraPacing: "Dutch angle handheld camera tracking Elena's hand reaching for the tablet as the lights die.",
        lightingAudio: "Digital chime alert, sharp mechanical relay click, followed by high-pitch warning siren.",
        scriptSnippet: "ON TABLET SCREEN: 'BIOMETRIC OVERRIDE CONFIRMED.' Lights snap off. Red emergency strobe."
      }
    ],
    promotionalReel: {
      hookLine: "She thought she avenged her father... until the murderer slid this onto the boardroom table 🖊️😱",
      caption: "Rule #1 of corporate revenge: Never sign the contract until you check whose pen you're holding. Episode 1 of THE GLASS BOARDROOM is out now! #MicroDrama #RevengeSeries #CEOdrama #ShortFormFilm",
      suggestedAudioVibe: "Dark cinematic suspense cello with building 808 heartbeat bass drop",
      hashtags: ["MicroDrama", "ShortFormSeries", "RevengeDrama", "CorporateThriller", "TikTokDrama"]
    }
  },
  adaptation: {
    id: "adaptation-sample-01",
    createdAt: new Date().toISOString(),
    sourceLanguage: "English",
    targetLanguage: "Spanish (Latin America)",
    audienceRegion: "Latin American OTT & Vertical Short-Form Drama (Mexico / Colombia / US Hispanic)",
    adaptationStyle: "locally_adapted",
    adaptedTitle: "El Directorio de Cristal",
    adaptedLogline: "A las dos de la madrugada durante una adquisición hostil, una implacable nueva directora descubre que el testaferro anónimo que arruinó a su padre preside la mesa — con el poder fiduciario en la mano.",
    adaptedScript: `INT. SALA DE JUNTAS DE VANGUARD - NOCHE (02:14 AM)

Una tormenta azota los ventanales de piso a techo. Las luces de la metrópoli parpadean bajo el aguacero.

ELENA VANCE (29 años, blazer gris carbón a la medida, mirada gélida y calculadora) domina la cabecera de la mesa.

Frente a ella está JULIAN CROSS (52 años, cabello cano pulido, traje italiano impecable, sonriendo con desdén).

Entre ambos se encuentra KAI CHEN (31 años), con la laptop abierta; la pantalla refleja gráficas bursátiles en tiempo real.

ELENA
La bolsa de Tokio abre en cuarenta segundos, Julián. Las acciones fiduciarias están blindadas. Estás fuera.

Julián ni pestañea. Hace girar el licor ámbar en su vaso de cristal cortado, divertido.

JULIÁN
Un discurso muy apasionado, Elena. Tu padre usaba exactamente el mismo prólogo antes de entregar el patrimonio de su vida.

ELENA
(con voz firme, cortante)
Mi padre confió en una serpiente. Yo traje el antídoto. Kai, ejecuta la revocación de acciones ahora mismo.

Kai titubea, con los dedos temblorosos suspendidos sobre el teclado. Mira de reojo a Julián.

JULIÁN
Adelante, licenciado Chen. Explíquele a nuestra flamante Directora General lo que estipula el Artículo 14, inciso C.

El semblante de Elena se tensa. Una grieta microscópica en su coraza.

KAI
(aclarándose la garganta, con voz trémula)
Elena... cualquier votación extraordinaria convocada después de medianoche exige consentimiento unánime del fideicomiso fundador.

ELENA
¡El fideicomiso fundador está bajo mi firma!

JULIÁN
¿Revisaste la caja de seguridad de Midtown Trust esta mañana?

Julián mete la mano con parsimonia en el bolsillo interior de su saco. Desliza una pluma fuente de oro envejecido sobre la caoba pulida.

Un blasón con un águila imperial destaca en la tapa. A Elena se le corta la respiración.

ELENA
¿De dónde sacaste eso? Esa pluma estaba en el despacho de mi papá la noche que murió.

JULIÁN
(inclinándose, con un susurro venenoso)
Tu padre no murió de un infarto por la quiebra, Elena. Me vendió ese fideicomiso por tres millones en bonos basura... y se despidió riéndose en mi cara.

Un BEEP estridente retumba desde la tableta de Elena.

EN LA PANTALLA: "ANULACIÓN BIOMÉTRICA AUTORIZADA. ACCIONES TRANSFERIDAS A APEX HOLDINGS."

Elena se congela de terror.

JULIÁN (CONT.)
Muchas gracias por tu firma, corazón.

Las luces de la sala SE APAGAN DE GOLPE.

Solo la LUZ ROJA DE EMERGENCIA estroboscópica parpadea contra sus rostros.

CORTE A NEGRO.`,
    localizationChoices: [
      {
        area: "Honorifics & Social Distance",
        originalApproach: "Informal first-name dynamic with corporate legal title references.",
        adaptedApproach: "Employed the respectful professional title 'licenciado Chen' when Julian addresses legal counsel Kai, reflecting Latin American corporate boardroom hierarchy where formal titles indicate dominance.",
        rationale: "In LATAM executive culture, shifting between formal deference and cold familiarity ('Elena' vs 'licenciado Chen') intensifies Julian's patronizing authority."
      },
      {
        area: "Legal & Corporate Terminology",
        originalApproach: "'Proxy votes are locked' and 'founder's trust'.",
        adaptedApproach: "Adapted to 'Las acciones fiduciarias están blindadas' (shielded trust shares) and 'fideicomiso fundador'.",
        rationale: "'Blindadas' resonates strongly in Mexican and Colombian business media as legal protection against hostile takeovers, providing stronger visceral weight than a literal 'bloqueadas'."
      },
      {
        area: "Emotional Antagonist Slang",
        originalApproach: "Julian's condescending sign-off: 'Thank you for the signature, sweetheart.'",
        adaptedApproach: "Adapted to: 'Muchas gracias por tu firma, corazón.' with icy, velvety delivery.",
        rationale: "Delivers the chilling paternalistic insult without sounding artificial or translated."
      }
    ],
    reviewFlags: [
      {
        id: "flag-01",
        originalPhrase: "Tokyo opens in forty seconds, Julian. The proxy votes are locked.",
        adaptedPhrase: "La bolsa de Tokio abre en cuarenta segundos, Julián. Las acciones fiduciarias están blindadas.",
        concernType: "register_formality",
        explanation: "Check whether Julian and Elena should maintain 'tú' (familiar) or 'usted' (formal distance). We chose 'tú' because Julian has known her family for decades, highlighting personal betrayal.",
        suggestedAlternative: "If higher legal distance is desired by the director: 'Tokio abre en cuarenta segundos, señor Cross. Sus votos fiduciarios han sido revocados.'",
        status: "pending"
      },
      {
        id: "flag-02",
        originalPhrase: "He sold me that trust for three million dollars in unbacked bonds",
        adaptedPhrase: "Me vendió ese fideicomiso por tres millones en bonos basura",
        concernType: "idiom",
        explanation: "'Bonos basura' (junk bonds) is widely understood across Mexican/Argentine/Spanish finance, but 'bonos sin respaldo' would be technically more literal.",
        suggestedAlternative: "Use 'bonos sin garantía' if local legal compliance guidelines prohibit informal financial colloquialisms.",
        status: "pending"
      },
      {
        id: "flag-03",
        originalPhrase: "Thank you for the signature, sweetheart.",
        adaptedPhrase: "Muchas gracias por tu firma, corazón.",
        concernType: "cultural_sensitivity",
        explanation: "'Corazón' delivers the patronizing venom of 'sweetheart'. Depending on regional broadcast standards, alternative colloquial diminutives like 'mi reina' or 'preciosa' could tilt into regional slang.",
        suggestedAlternative: "'Muchas gracias por firmar, querida.' for a more conservative neutral-Spanish broadcast dub.",
        status: "pending"
      }
    ],
    preservationSummary: {
      plotIntegrity: "100% of the three-beat narrative structure is preserved: the immediate Tokyo market deadline, the reveal of the father's antique pen, and the emergency blackout biometric theft.",
      emotionalBeats: "The power inversion (Elena dominant -> shocked discovery -> trapped helpless) is fully mirrored in Spanish cadence, with sharper rhythmic interruptions.",
      characterVoice: "Elena's razor-sharp precision, Julian's venomous aristocratic calm, and Kai's nervous stutter are fully maintained in colloquial Latin American corporate dialogue.",
      tonePreservation: "Retains high-tension, high-stakes melodrama optimized for 9:16 vertical short-form video retention."
    }
  },
  workflowNotes: {
    toolsUsed: "Story Studio Engine v1.4, Gemini 2.5 Flash / Demo Provider, Claude Screenplay Formatter, DeepL Localization Benchmarks.",
    promptRevisions: "v1: Initial prompt produced standard 3-act film pacing with too slow of an opening. v2: Revised system instructions to mandate in media res action within first 4 seconds for vertical micro-drama retention (breaking glass, instant ultimatum). v3: Added strict rule prohibiting literal idiom translation in favor of target-market boardroom culture.",
    productionObservations: "For vertical 9:16 framing, ensure the camera notes emphasize close-up macro details (the eagle crest on the pen, the glowing biometric tablet) rather than wide room pans. The cliffhanger blackout creates an ideal episode cut point to boost binge-completion rates.",
    qaChecklist: {
      hookVerified: true,
      dialoguePacingNatural: true,
      culturalSensitivityChecked: true,
      cliffhangerCompelling: true,
      sceneLabelsPreserved: true
    }
  }
};
