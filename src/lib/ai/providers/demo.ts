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
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isHindi = params.sourceLanguage === "Hindi";
    const durationBadge = params.episodeDuration || "3 min";

    if (isHindi) {
      const mockHindiPilot = {
        title: "आधी रात का धोखा: 54वीं मंजिल",
        logline: "रात के दो बजे अपने पिता के अपमान का बदला लेने आई माया को पता चलता है कि असली मुजरिम कोई और नहीं, खुद उसके अपने थे।",
        synopsis: "गंभीर दबाव का सामना करते हुए, माया अपने पिता का नाम साफ करने के लिए एक पुराने प्रतिद्वंद्वी से मुकाबला करती है। लेकिन तिजोरी से मिले एक गुप्त दस्तावेज से पता चलता है कि यह धोखा सालों पहले उसके अपने परिवार ने ही रचा था।",
        genre: params.genre,
        targetAudience: params.targetAudience,
        sourceLanguage: "Hindi",
        episodeDuration: durationBadge,
        tone: params.tone,
        settingContext: params.settingContext || "बारिश में भीगे मुंबई के नरीमन पॉइंट स्थित 54वीं मंजिल का कॉर्पोरेट पेंटहाउस; धीमी एम्बिएंट लाइटिंग।",
        characters: [
          {
            name: "MAYA LIN",
            role: "नायक / निर्भीक जांचकर्ता",
            motivation: "सूरज उगने से पहले अवैध अधिग्रहण को उजागर करना और अपने पिता की बेगुनाही साबित करना।",
            secretOrFlaw: "बदले की अंधी आग में बिना अंतिम हस्ताक्षरकर्ता की पुष्टि किए कदम उठाना।"
          },
          {
            name: "VICTOR STERLING",
            role: "प्रतिद्वंद्वी / छायादार निवेशक",
            motivation: "कंपनी पर पूर्ण मालिकाना हक हासिल करना और पुराने बोर्ड के सभी सबूत मिटाना।",
            secretOrFlaw: "अहंकारी अति-आत्मविश्वास; दूसरों को कमजोर समझना।"
          },
          {
            name: "LEO RAMIREZ",
            role: "सहयोगी / सिस्टम विश्लेषक",
            motivation: "अपनी नौकरी बचाते हुए गुप्त रूप से माया को महत्वपूर्ण सर्वर लॉग्स उपलब्ध कराना।",
            secretOrFlaw: "दबाव और धमकी में घबरा जाना।"
          }
        ],
        openingHook: {
          description: "शुरुआती 3 सेकंड में कांच टूटने और तीखी चेतावनी से दर्शक का ध्यान तुरंत खींचता है।",
          visualAction: "एक्सट्रीम क्लोज़-अप: संगमरमर के फर्श पर शैम्पेन का गिलास धीमे मोशन में टूटकर बिखरता है। शराब एक गुप्त समझौते पर फैल जाती है।",
          dialogueOrSFX: "माया (O.S.): 'बायोमेट्रिक कंसोल से दूर हट जाओ, विक्टर। ऑडिट अब लाइव है।'",
          retentionReason: "अचानक भौतिक टकराव और तत्काल डेडलाइन मोबाइल स्क्रीन पर स्क्रॉल को रोक देती है।"
        },
        emotionalTurningPoint: {
          description: "विक्टर एक पुराना मोहरबंद दस्तावेज दिखाता है जिस पर माया के पिता के हस्ताक्षर हैं, जिससे उसकी वर्षों की नफरत की बुनियाद हिल जाती है।",
          sceneReference: "दृश्य 2 - समझौते का रहस्योद्घाटन",
          stakesShift: "माया का नैतिक आत्मविश्वास टूट जाता है और उसे अहसास होता है कि सच्चाई कुछ और ही थी।"
        },
        endingCliffhanger: {
          description: "अचानक अलार्म बज उठता है और तिजोरी के दरवाजे हमेशा के लिए बंद हो जाते हैं; केवल 60 सेकंड की इमरजेंसी ऑक्सीजन बचती है।",
          unresolvedQuestion: "क्या किसी तीसरे व्यक्ति ने दोनों को एक साथ खत्म करने के लिए यह लॉकडाउन शुरू किया है?",
          nextEpisodeHook: "कम्प्यूटरीकृत आवाज: 'ऑक्सीजन निकासी 59 सेकंड में शुरू।' कट टू ब्लैक।"
        },
        fullScript: `INT. TOWER SUITE - NIGHT (02:00 AM)

कांच की ऊंची खिड़कियों पर मूसलाधार बारिश टकरा रही है। बाहर महानगर की लाल चेतावनी बत्तियां अंधेरे को चीर रही हैं।

MAYA LIN (28 वर्ष, गीले बाल, आंखों में बदला लेने का पक्का इरादा) खुली तिजोरी के सामने खड़ी है।

VICTOR STERLING (54 वर्ष, चारकोल सूट, हाथ में व्हिस्की का गिलास) अंधेरे से मुस्कुराते हुए सामने आता है।

VICTOR
तुम्हारे अंदर तुम्हारी मां की वही जिद्द है, माया। और तुम्हारे पिता का वही दुर्भाग्यपूर्ण समय।

MAYA
(मुड़ते हुए, दोनों हाथ सामने रखते हुए)
ऑडिट फाइलें अंतरराष्ट्रीय सर्वर पर अपलोड हो चुकी हैं, विक्टर। सुबह आठ बजे बोर्ड की बैठक है। तुम्हारा खेल खत्म।

विक्टर धीरे से हंसता है और अपने गिलास की चुस्की लेता है।

VICTOR
क्या यह बात तुम्हें उस डरपोक लियो ने बताई है?

माया का शरीर अकड़ जाता है।

VICTOR (CONT'D)
जरा सर्वर नोड चार की जांच करो, मेरी बच्ची।

माया तेजी से अपनी कलाई पर बंधी घड़ी पर टैप करती है। स्क्रीन पर पीला संदेश चमकता है: "प्रवेश अस्वीकृत - अधिकृत: एम. लिन।"

MAYA
(फुसफुसाते हुए)
यह नामुमकिन है। मैंने कभी कोई अनुमति नहीं दी।

VICTOR
तुमने नहीं। तुम्हारे पिता ने। बीस साल पहले यह कंपनी किसी आग में नहीं जली थी, माया। उन्होंने अपने जुए के कर्ज चुकाने के लिए यह कंपनी मुझे बेची थी।

विक्टर कांच की मेज पर एक पीला पड़ चुका कागज सरका देता है। नीचे बने हस्ताक्षर देखकर माया के होश उड़ जाते हैं।

MAYA
नहीं... वो ऐसा कभी नहीं कर सकते...

तभी दीवारों में एक भारी धातु की गड़गड़ाहट गूंजती है। हर खिड़की पर टाइटेनियम के भारी शटर गिर जाते हैं।

AUTOMATED VOICE (O.S.)
"सुरक्षा उल्लंघन दर्ज। वॉल्ट लॉकडाउन सक्रिय। साठ सेकंड में ऑक्सीजन निकासी शुरू।"

विक्टर के चेहरे की मुस्कान गायब हो जाती है। पहली बार उसकी आंखों में सच्चा डर दिखाई देता है।

VICTOR
यह लॉकडाउन किसने शुरू किया?!

माया दरवाजे की ओर देखती है। फिर धीरे से विक्टर की तरफ मुड़ती है।

MAYA
मुझे लगता है... कोई हम दोनों को आज रात इस कमरे में बंद देखना चाहता था।

कट टू ब्लैक।`,
        scenes: [
          {
            sceneNumber: 1,
            heading: "INT. TOWER SUITE - NIGHT",
            visualDescription: "बारिश में भीगा पेंटहाउस। माया तिजोरी के faint green इंडिकेटर के सामने तनाव में खड़ी है।",
            cameraPacing: "माया के चेहरे पर फास्ट ट्रैकिंग शॉट, जो विक्टर के साए के आते ही स्थिर हो जाता है।",
            lightingAudio: "गड़गड़ाहट की धीमी आवाज, खिड़की पर बारिश की बूंदें, तिजोरी का भारी धात्विक क्लिक।",
            scriptSnippet: "VICTOR: 'तुम्हारे अंदर तुम्हारी मां की वही जिद्द है, माया।'"
          },
          {
            sceneNumber: 2,
            heading: "INT. TOWER SUITE - CONTINUOUS",
            visualDescription: "विक्टर पीला पड़ चुका कानूनी अनुबंध डेस्क लैंप के नीचे रखता है। पिता के हस्ताक्षरों पर मैक्रो शॉट।",
            cameraPacing: "माया की फैलती पुतलियों पर स्लो-मोशन पुश-इन शॉट।",
            lightingAudio: "सिंथेसाइज़र का गहरा सस्पेंस टोन; कमरे का वातावरण बिल्कुल शांत हो जाता है।",
            scriptSnippet: "VICTOR: 'बीस साल पहले उन्होंने यह कंपनी मुझे बेची थी।'"
          },
          {
            sceneNumber: 3,
            heading: "INT. TOWER SUITE - MOMENTS LATER",
            visualDescription: "टाइटेनियम के शटर धड़ाम से गिरते हैं। कमरा लाल इमरजेंसी लाइट में डूब जाता है।",
            cameraPacing: "हाथ से पकड़ा हुआ डच एंगल कैमरा, जो झटके के साथ कांपता है।",
            lightingAudio: "भारी हाइड्रोलिक शटर की आवाज, गूंजता सायरन, उलटी गिनती की आवाज।",
            scriptSnippet: "AUTOMATED VOICE: 'सुरक्षा उल्लंघन दर्ज। साठ सेकंड में ऑक्सीजन निकासी शुरू।'"
          }
        ],
        promotionalReel: {
          hookLine: "वह अपने पिता का बदला लेने तिजोरी में घुसी थी... लेकिन समझौते पर खुद उसके पिता के दस्तखत थे! 😱💥",
          caption: "कॉर्पोरेट धोखे की सबसे बड़ी दास्तान। देखिए पहला एपिसोड अब! #MicroDrama #HindiDrama #RevengeSeries #ShortForm",
          suggestedAudioVibe: "डार्क सिनेमैटिक थ्रिलर वायलिन और तेज 808 बीट",
          hashtags: ["MicroDrama", "HindiSeries", "RevengeDrama", "ShortFilm"]
        }
      };

      const pilot = validateAndCleanPilot(mockHindiPilot, params);
      pilot.isDemoSample = true;
      pilot.generatorModel = "Offline Demo Engine (Sample)";
      return pilot;
    }

    // Default English Pilot Generation
    const titleWords = params.premise
      .split(" ")
      .slice(0, 4)
      .map((w) => w.replace(/[^a-zA-Z]/g, ""))
      .filter(Boolean)
      .join(" ");

    const dynamicTitle = titleWords ? `The ${titleWords}` : "Midnight Reckoning";

    const mockEnglishPilot = {
      title: dynamicTitle,
      logline: `In this ${params.genre.toLowerCase()}, an unexpected revelation alters the balance of power just as time is about to expire.`,
      synopsis: `Facing insurmountable pressure, the protagonist confronts an old adversary to reclaim what was taken. What began as a routine showdown quickly spirals when a hidden token from the past reveals that the betrayal was engineered from the very beginning.`,
      genre: params.genre,
      targetAudience: params.targetAudience,
      sourceLanguage: "English",
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

    const pilot = validateAndCleanPilot(mockEnglishPilot, params);
    pilot.isDemoSample = true;
    pilot.generatorModel = "Offline Demo Engine (Sample)";
    return pilot;
  }

  async adaptScript(params: AdaptationParams): Promise<StoryAdaptation> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const isTargetHindi = params.targetLanguage === "Hindi";

    if (isTargetHindi) {
      // English → Hindi (Devanagari)
      const mockHindiAdaptation = {
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

एलेना के चेहरे पर हल्की सी शिकन आती है।

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
            originalApproach: "Direct first-name corporate confrontation.",
            adaptedApproach: "Employed sarcastic honorific 'हमारी नई साहिबा' and the chilling patriarchal sign-off 'मेरी बच्ची' to create dramatic authority.",
            rationale: "In Indian dramatic convention, patriarchal familiarity intensifies Julian's personal betrayal of Elena's deceased father."
          },
          {
            area: "Financial Terminology Adaptation",
            originalApproach: "'Proxy votes are locked' and 'unbacked bonds'.",
            adaptedApproach: "Adapted to 'सारे वोटिंग अधिकार मेरे पास सुरक्षित हैं' and 'रद्दी बॉन्ड्स'.",
            rationale: "'रद्दी बॉन्ड्स' conveys the visceral emotion of fraudulent bonds without requiring complex legal footnotes."
          },
          {
            area: "Idiomatic Localization",
            originalApproach: "'My father trusted a viper.'",
            adaptedApproach: "Adapted to 'मेरे पिता ने एक आस्तीन के सांप पर भरोसा किया था।'",
            rationale: "Translates the English 'viper' into the culturally resonant Hindi idiom 'आस्तीन का सांप'."
          }
        ],
        reviewFlags: [
          {
            id: "flag-01",
            originalPhrase: "Bold speech, Elena. Your father used to give the exact same preamble",
            adaptedPhrase: "बहुत जोशीला भाषण, एलेना। तुम्हारे पिता भी अपनी जिंदगी की मेहनत सौंपने से पहले ठीक यही डायलॉग बोलते थे।",
            concernType: "register_formality",
            explanation: "Verify whether Julian should address Elena with 'तुम' (familiar) or 'आप' (formal). Using 'तुम' highlights his decades of family proximity and personal deceit.",
            suggestedAlternative: "If corporate boardroom distance is preferred: 'बहुत ही प्रभावशाली भाषण, मिस वेंस।' (using formal 'आप').",
            status: "pending"
          },
          {
            id: "flag-02",
            originalPhrase: "He sold me that trust for three million dollars in unbacked bonds",
            adaptedPhrase: "उन्होंने वो ट्रस्ट मुझे तीन करोड़ के रद्दी बॉन्ड्स के बदले बेचा था",
            concernType: "idiom",
            explanation: "'रद्दी बॉन्ड्स' captures the emotional fraud of worthless securities in colloquial Hindi.",
            suggestedAlternative: "'बिना किसी वित्तीय गारंटी वाले बॉन्ड्स' if literal financial regulatory phrasing is required.",
            status: "pending"
          },
          {
            id: "flag-03",
            originalPhrase: "Thank you for the signature, sweetheart.",
            adaptedPhrase: "दस्तखत के लिए बहुत-बहुत शुक्रिया, मेरी बच्ची।",
            concernType: "cultural_sensitivity",
            explanation: "'मेरी बच्ची' delivers condescending elder-to-younger venom without sounding like an unnatural literal translation of 'sweetheart'.",
            suggestedAlternative: "'हस्ताक्षर के लिए धन्यवाद, बिटिया।' for traditional North Indian dramatic cadence.",
            status: "pending"
          }
        ],
        preservationSummary: {
          plotIntegrity: "The complete 3-beat structure is retained: the immediate Tokyo market countdown, the reveal of the father's antique pen, and the emergency blackout biometric theft.",
          emotionalBeats: "The power inversion (Elena dominant -> shocked discovery -> trapped helpless) is fully mirrored in Devanagari Hindi cadence with authentic dramatic weight.",
          characterVoice: "Elena's calculated precision, Julian's icy condescension, and Kai's nervous stammer are preserved in contemporary Indian corporate streaming vernacular.",
          tonePreservation: "Retains high-tension melodrama tailored for vertical mobile drama viewer retention."
        }
      };

      const adaptation = validateAndCleanAdaptation(mockHindiAdaptation, params);
      adaptation.isDemoSample = true;
      adaptation.generatorModel = "Offline Demo Engine (Sample)";
      return adaptation;
    }

    // Hindi → English Adaptation
    const mockEnglishAdaptation = {
      adaptedTitle: "The 54th Floor Betrayal",
      adaptedLogline: "At 2 AM during a hostile takeover, an incoming CEO discovers the anonymous whistleblower who ruined her father is sitting across the table — holding the voting proxy.",
      adaptedScript: `INT. TOWER SUITE - NIGHT (02:00 AM)

A storm hammers against floor-to-ceiling glass. The city skyline flickers through heavy rain.

MAYA LIN (28, tailored dark coat, calculation in her eyes) stands at the head of the table.

Sitting opposite is VICTOR STERLING (54, bespoke charcoal suit, silver signet ring, smiling cold).

Between them sits LEO RAMIREZ (31), trembling hands hovering over his laptop keyboard.

MAYA
Tokyo opens in forty seconds, Victor. The proxy votes are locked. You're out.

Victor doesn't flinch. He swirls the amber liquid in his crystal glass, amused.

VICTOR
Bold speech, Maya. Your father used to give the exact same preamble before he surrendered his life's work.

MAYA
(voice steady, razor-edged)
My father trusted a viper. I brought anti-venom. Leo, execute the share recall right now.

Leo hesitates, his fingers trembling above the key. His eyes dart toward Victor.

VICTOR
Go ahead, Leo. Tell our new Managing Director what Article 14, Subsection C actually specifies.

Maya's brow twitches. A split-second crack in her armor.

LEO
(clearing throat, trembling)
Maya... any unannounced shareholder vote called after midnight requires unanimous consent from the founder's trust.

MAYA
I hold the founder's trust!

VICTOR
Did you check the safe-deposit box at Midtown Trust this morning?

Victor reaches inside his coat pocket. He slides an antique gold fountain pen onto the glossy mahogany surface.

An eagle crest is etched into the cap. Maya's breath catches in her throat.

MAYA
Where did you get that? That was in my father's study the night he died...

VICTOR
(leaning in, whispering cold)
He didn't die of a broken heart, Maya. He sold me that trust for three million dollars in unbacked bonds... and he laughed while doing it.

A sudden BEEP echoes from Maya's tablet.

ON TABLET SCREEN: "BIOMETRIC OVERRIDE CONFIRMED. VOTING SHARES TRANSFERRED TO APEX HOLDINGS."

Maya stares down in horror.

VICTOR (CONT'D)
Thank you for the signature, sweetheart.

The boardroom LIGHTS SNAP OFF.

Only the red EMERGENCY STROBE pulses across their faces.

FADE OUT.`,
      localizationChoices: [
        {
          area: "Honorific & Formality Transposition",
          originalApproach: "Hindi colloquial deference and sarcasm ('साहिबा', 'मेरी बच्ची').",
          adaptedApproach: "Adapted to sharp contemporary corporate thriller cadence ('Managing Director', 'sweetheart').",
          rationale: "Translates the patriarchal sarcasm of Hindi melodrama into the icy corporate condescension familiar in English executive thrillers."
        },
        {
          area: "Idiomatic Equivalence",
          originalApproach: "'मेरे पिता ने एक आस्तीन के सांप पर भरोसा किया था।' (snake in the sleeve).",
          adaptedApproach: "'My father trusted a viper. I brought anti-venom.'",
          rationale: "Provides the immediate Western dramatic equivalent of internal betrayal without literal idiom translation."
        },
        {
          area: "Dialogue Velocity for Vertical Screen Format",
          originalApproach: "Extended compound Hindi emotional phrases.",
          adaptedApproach: "Crisp, staccato English deliveries calibrated for rapid subtitle reading on mobile screens.",
          rationale: "Maintains high velocity to optimize vertical short-form retention."
        }
      ],
      reviewFlags: [
        {
          id: "flag-en-01",
          originalPhrase: "मेरे पिता ने एक आस्तीन के सांप पर भरोसा किया था।",
          adaptedPhrase: "My father trusted a viper. I brought anti-venom.",
          concernType: "idiom",
          explanation: "The Hindi idiom 'आस्तीन का सांप' translates metaphorically to 'viper' rather than literal 'snake in the sleeve' to maintain natural Western screenplay flow.",
          suggestedAlternative: "'My father trusted a backstabber.' for more casual colloquialism.",
          status: "pending"
        },
        {
          id: "flag-en-02",
          originalPhrase: "हमारी नई साहिबा को जरा धारा 14, उप-धारा 'ग' पढ़कर सुनाओ।",
          adaptedPhrase: "Tell our new Managing Director what Article 14, Subsection C actually specifies.",
          concernType: "register_formality",
          explanation: "'साहिबा' was used sarcastically in Hindi; in English, sarcastic stress is placed on the capitalized official title 'Managing Director'.",
          suggestedAlternative: "'Tell her ladyship what Article 14 specifies' if British aristocratic tone is preferred.",
          status: "pending"
        },
        {
          id: "flag-en-03",
          originalPhrase: "दस्तखत के लिए बहुत-बहुत शुक्रिया, मेरी बच्ची।",
          adaptedPhrase: "Thank you for the signature, sweetheart.",
          concernType: "cultural_sensitivity",
          explanation: "'मेरी बच्ची' conveyed patronizing elder venom. 'Sweetheart' replicates that chilling diminutization in English.",
          suggestedAlternative: "'Thank you for the signature, darling.' for a softer menace.",
          status: "pending"
        }
      ],
      preservationSummary: {
        plotIntegrity: "All 3 dramatic beats (the market countdown, the pen reveal, and the biometric lockout) are preserved intact.",
        emotionalBeats: "The power reversal from predator to trapped prey is faithfully mirrored in English.",
        characterVoice: "Maya's relentless conviction and Victor's silky arrogance carry over seamlessly.",
        tonePreservation: "The high-tension short-form vertical drama tone is preserved with fast-paced dialogue."
      }
    };

    const adaptation = validateAndCleanAdaptation(mockEnglishAdaptation, params);
    adaptation.isDemoSample = true;
    adaptation.generatorModel = "Offline Demo Engine (Sample)";
    return adaptation;
  }
}
