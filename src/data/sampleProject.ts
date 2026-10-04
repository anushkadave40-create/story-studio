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
    targetLanguage: "Hindi",
    audienceRegion: "Indian OTT & Vertical Short-Form Drama (Tier-1 / Tier-2 Streaming)",
    adaptationStyle: "locally_adapted",
    adaptedTitle: "कांच का बोर्डरूम (The Glass Boardroom)",
    adaptedLogline: "रात के दो बजे, एक बहुराष्ट्रीय कंपनी के जबरन अधिग्रहण के दौरान, एक नई मैनेजिंग डायरेक्टर को पता चलता है कि जिस अनाम व्हिसलब्लोअर ने उसके पिता को बर्बाद किया था, वह मेज के उस पार बैठा है—वोटिंग अधिकार अपने हाथ में लिए।",
    adaptedScript: `INT. VANGUARD BOARDROOM - NIGHT (02:14 AM)

कांच की ऊंची दीवारों से मूसलाधार बारिश टकरा रही है। बाहर महानगर की धुंधली रोशनी चमक रही है।

ELENA VANCE (29 वर्ष, चारकोल ब्लेज़र, आंखों में ठंडा हिसाब-किताब) मेज के सिरे पर खड़ी है।

सामने बैठा है JULIAN CROSS (52 वर्ष, चांदी जैसे बाल, रेशमी सूट, होंठों पर व्यंग्यात्मक मुस्कान)।

दोनों के बीच बैठा है कानूनी सलाहकार KAI CHEN (31 वर्ष), जिसकी उंगलियां कांपते हुए लैपटॉप पर टिकी हैं।

ELENA
टोक्यो का शेयर बाजार चालीस सेकंड में खुलने वाला है, जूलियन। सारे वोटिंग अधिकार मेरे पास सुरक्षित हैं। तुम्हारा खेल खत्म।

जूलियन ने पलक तक नहीं झपकाई। वह अपने हाथ में थामे कट-ग्लास के गिलास को धीरे से घुमाता है।

JULIAN
बहुत जोशीला भाषण, एलेना। तुम्हारे पिता भी अपनी जिंदगी की मेहनत सौंपने से पहले ठीक यही डायलॉग बोलते थे।

ELENA
(धीमी, धारदार आवाज में)
मेरे पिता ने एक आस्तीन के सांप पर भरोसा किया था। मैं उसका जहर काटने का इंतजाम करके आई हूं। काई, शेयर जब्ती का आदेश लागू करो।

काई हिचकिचाता है, उसकी उंगलियां एंटर की पर कांप रही हैं। वह घबराकर जूलियन की ओर देखता है।

JULIAN
शाबाश काई, डरने की जरूरत नहीं। हमारी नई साहिबा को जरा धारा 14, उप-धारा 'ग' पढ़कर सुनाओ।

एलेना के चेहरे पर हल्की सी शिकन आती है। उसके आत्मविश्वास में एक दरार।

KAI
(गला साफ करते हुए, थरथराती आवाज)
एलेना... आधी रात के बाद बुलाई गई किसी भी आपात बैठक में, संस्थापक ट्रस्ट की शत-प्रतिशत सहमति अनिवार्य है।

ELENA
संस्थापक ट्रस्ट मेरे नाम पर है!

JULIAN
क्या तुमने आज सुबह बैंक का सेफ-डिपॉजिट लॉकर चेक किया था?

जूलियन अपने कोट की भीतरी जेब में हाथ डालता है। वह महोगनी की मेज पर सोने का एक पुराना फाउंटेन पेन सरका देता है।

पेन के ढक्कन पर गरुड़ का शाही निशान तराशा हुआ है। एलेना की सांस गले में ही अटक जाती है।

ELENA
यह तुम्हारे पास कहां से आया? यह पेन उस रात मेरे पिता की मेज पर था, जिस रात उनकी जान गई थी...

JULIAN
(आगे झुकते हुए, जहर बुझी फुसफुसाहट में)
तुम्हारे पिता सदमे से नहीं मरे थे, एलेना। उन्होंने वो ट्रस्ट मुझे तीन करोड़ के रद्दी बॉन्ड्स के बदले बेचा था... और हंसते हुए विदा हुए थे।

अचानक एलेना के टैबलेट से एक तीखी बीप गूंज उठती है।

स्क्रीन पर चमकता है: "बायोमेट्रिक प्रमाणीकरण स्वीकृत। शेयर मालिकाना हक एपेक्स होल्डिंग्स को हस्तांतरित।"

एलेना का चेहरा खौफ से पीला पड़ जाता है।

JULIAN (CONT'D)
दस्तखत के लिए बहुत-बहुत शुक्रिया, मेरी बच्ची।

बोर्डरूम की बत्तियां अचानक गुल हो जाती हैं।

सिर्फ लाल रंग की इमरजेंसी लाइट उनके चेहरों पर धड़कने लगती है।

कट टू ब्लैक।`,
    localizationChoices: [
      {
        area: "Honorifics & Power Inversion (साहिबा / मेरी बच्ची / आप vs तुम)",
        originalApproach: "Direct first-name confrontation with American corporate slang.",
        adaptedApproach: "Employed the sarcastic address 'हमारी नई साहिबा' when Julian speaks to Kai, and the chilling patriarchal sign-off 'मेरी बच्ची' to Elena, alternating between predatory warmth and razor-sharp disrespect.",
        rationale: "In Indian dramatic convention, shifting into sarcastic traditional honorifics intensifies the emotional humiliation and personal betrayal."
      },
      {
        area: "Legal & Corporate Terminology",
        originalApproach: "'Proxy votes are locked' and 'unbacked bonds'.",
        adaptedApproach: "Adapted to 'सारे वोटिंग अधिकार मेरे पास सुरक्षित हैं' (all voting rights secured) and 'रद्दी बॉन्ड्स' (junk/worthless bonds).",
        rationale: "'रद्दी बॉन्ड्स' carries immediate visceral comprehension for Indian viewers, conveying total financial deception far better than technical legal jargon."
      },
      {
        area: "Dramatic Metaphors",
        originalApproach: "'My father trusted a viper. I brought anti-venom.'",
        adaptedApproach: "Adapted to: 'मेरे पिता ने एक आस्तीन के सांप पर भरोसा किया था। मैं उसका जहर काटने का इंतजाम करके आई हूं।'",
        rationale: "Translates the English 'viper' metaphor into the culturally resonant Hindi idiom 'आस्तीन का सांप' (the traitor within)."
      }
    ],
    reviewFlags: [
      {
        id: "flag-01",
        originalPhrase: "Bold speech, Elena. Your father used to give the exact same preamble",
        adaptedPhrase: "बहुत जोशीला भाषण, एलेना। तुम्हारे पिता भी अपनी जिंदगी की मेहनत सौंपने से पहले ठीक यही डायलॉग बोलते थे।",
        concernType: "register_formality",
        explanation: "Check whether Julian should address Elena with 'तुम' (familiar) or 'आप' (formal). We selected 'तुम' because Julian has known her family for decades, highlighting deep personal treachery.",
        suggestedAlternative: "If corporate board formality is preferred: 'बहुत ही प्रभावशाली भाषण, मिस वेंस। आपके पिता भी अपनी कंपनी सौंपने से पहले यही शब्द दोहराते थे।'",
        status: "pending"
      },
      {
        id: "flag-02",
        originalPhrase: "He sold me that trust for three million dollars in unbacked bonds",
        adaptedPhrase: "उन्होंने वो ट्रस्ट मुझे तीन करोड़ के रद्दी बॉन्ड्स के बदले बेचा था",
        concernType: "idiom",
        explanation: "'रद्दी बॉन्ड्स' conveys the fraudulent worthlessness of junk bonds in colloquial Hindi. If regulatory compliance demands literal financial terms, alternative phrasing is recommended.",
        suggestedAlternative: "'बिना किसी वित्तीय गारंटी वाले बॉन्ड्स' (strictly literal non-guaranteed bonds).",
        status: "pending"
      },
      {
        id: "flag-03",
        originalPhrase: "Thank you for the signature, sweetheart.",
        adaptedPhrase: "दस्तखत के लिए बहुत-बहुत शुक्रिया, मेरी बच्ची।",
        concernType: "cultural_sensitivity",
        explanation: "'मेरी बच्ची' delivers the condescending elder-to-younger venom without sounding like an unnatural literal translation of 'sweetheart'. Depending on regional platform standards, verify if the director wants an even colder delivery.",
        suggestedAlternative: "'हस्ताक्षर के लिए धन्यवाद, बिटिया।' for classic North Indian dramatic cadence.",
        status: "pending"
      }
    ],
    preservationSummary: {
      plotIntegrity: "The complete 3-beat structure is retained: the immediate Tokyo market countdown, the reveal of the father's antique pen, and the emergency blackout biometric theft.",
      emotionalBeats: "The power inversion (Elena dominant -> shocked discovery -> trapped helpless) is fully mirrored in Devanagari Hindi cadence with authentic dramatic weight.",
      characterVoice: "Elena's calculated precision, Julian's icy condescension, and Kai's nervous stammer are preserved in contemporary Indian corporate streaming vernacular.",
      tonePreservation: "Retains high-tension melodrama tailored for vertical mobile drama viewer retention."
    }
  },
  workflowNotes: {
    toolsUsed: "Story Studio Engine v1.4, Gemini 2.5 Flash / Demo Provider, Devanagari Screenplay Formatter.",
    promptRevisions: "v1: English screenplay drafted. v2: Localized into Devanagari Hindi ensuring scene sluglines and character cues remain intact. v3: Formality shifts calibrated to reflect Indian boardroom hierarchies ('आस्तीन का सांप', 'मेरी बच्ची').",
    productionObservations: "For vertical 9:16 framing, ensure the camera notes emphasize close-up macro details (the eagle crest on the pen, the glowing biometric tablet). Subtitle lines in Devanagari should remain under 38 characters for rapid mobile readability.",
    qaChecklist: {
      hookVerified: true,
      dialoguePacingNatural: true,
      culturalSensitivityChecked: true,
      cliffhangerCompelling: true,
      sceneLabelsPreserved: true
    }
  }
};
