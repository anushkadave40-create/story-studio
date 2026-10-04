import { SupportedLanguage } from "@/types/story";

export const GENRE_PRESETS = [
  { label: "Corporate Revenge Melodrama", description: "Cutthroat boardrooms, hidden heirlooms, secret wills, hostile takeovers" },
  { label: "Urban Psychological Thriller", description: "Late-night elevators, stalkers, double identities, paranoid revelations" },
  { label: "Sci-Fi Time-Loop Suspense", description: "Glitch in temporal tech, 60 seconds to undo a catastrophe" },
  { label: "Enemies-to-Lovers Romance", description: "Bickering rival creatives stuck in a remote villa or locked office" },
  { label: "Billionaire Undercover / Identity Reveal", description: "Underestimated cleaner or intern turns out to own the parent conglomerate" },
  { label: "Supernatural Family Curse", description: "Ancestral mirror or heirloom awakening dark pacts in modern luxury condo" }
];

export const TONE_PRESETS = [
  "High Tension & Razor-Sharp Betrayal",
  "Emotionally Charged & Melodramatic",
  "Dark, Gritty & Atmospheric",
  "Witty, Sarcastic & Fast-Paced",
  "Romantic, Yearning & Vulnerable",
  "Uncanny Suspense & Edge-of-Seat Dread"
];

export const DURATION_OPTIONS = [
  { value: "1 min", label: "1 Minute", description: "~120-150 words • Hyper-fast hook for TikTok / Reels" },
  { value: "3 min", label: "3 Minutes", description: "~350-450 words • Standard vertical micro-drama episode" },
  { value: "5 min", label: "5 Minutes", description: "~650-800 words • Premium mini-pilot with deep character conflict" }
] as const;

export const LANGUAGE_OPTIONS: { code: string; name: SupportedLanguage }[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" }
];

export const ADAPTATION_STYLES = [
  {
    id: "faithful",
    label: "Faithful & Nuanced",
    description: "Preserves exact scene pacing, direct dialogue meaning, and tone while refining syntactic flow."
  },
  {
    id: "conversational",
    label: "Conversational Vernacular",
    description: "Adapts dialogue into authentic spoken cadence, colloquial idioms, and natural modern speech."
  },
  {
    id: "locally_adapted",
    label: "Deep Cultural Localization",
    description: "Re-anchors cultural references, honorifics, corporate/legal hierarchies, and idioms to match target audience media expectations."
  }
] as const;

export const PREMISE_INSPIRATIONS = [
  {
    title: "The Anonymous Heir",
    genre: "Corporate Revenge Melodrama",
    duration: "3 min" as const,
    tone: "High Tension & Razor-Sharp Betrayal",
    premise: "At 2 AM during a hostile corporate takeover, an uncompromising new CEO discovers the anonymous whistleblower who destroyed her father is sitting across the mahogany table — holding the voting proxy.",
    context: "A rain-lashed 54th-floor penthouse boardroom in Manhattan. Dim ambient lighting with city skyline reflections."
  },
  {
    title: "कांच का बोर्डरूम (The Glass Boardroom)",
    genre: "Corporate Revenge Melodrama",
    duration: "3 min" as const,
    tone: "High Tension & Razor-Sharp Betrayal",
    premise: "रात के दो बजे, कंपनी के आपातकालीन बोर्ड मीटिंग में, नई मैनेजिंग डायरेक्टर को पता चलता है कि उसके पिता को बर्बाद करने वाला अनाम व्हिसलब्लोअर सामने ही बैठा है—उसके हाथ में वोटिंग का गुप्त अधिकार है।",
    context: "बारिश में भीगे मुंबई के नरीमन पॉइंट स्थित 54वीं मंजिल का कॉर्पोरेट पेंटहाउस; धीमी एम्बिएंट लाइटिंग।"
  },
  {
    title: "Last Floor Down",
    genre: "Urban Psychological Thriller",
    duration: "1 min" as const,
    tone: "Uncanny Suspense & Edge-of-Seat Dread",
    premise: "Two executives are trapped in an express glass elevator stuck between the 88th and 89th floor. When one receives an emergency news alert that the CEO was poisoned 5 minutes ago, he notices white powder on the other's sleeve.",
    context: "Sleek mirrored glass elevator with flickering overhead LED strips and an emergency intercom."
  },
  {
    title: "The Reset Button",
    genre: "Sci-Fi Time-Loop Suspense",
    duration: "3 min" as const,
    tone: "High Tension & Razor-Sharp Betrayal",
    premise: "A neuro-programmer discovers that her wedding anniversary dinner with her charismatic husband is a simulation she has restarted 42 times trying to prevent him from deleting her memory.",
    context: "An ultra-minimalist smart villa overlooking the ocean; subtle glitch artifacts on wine glasses."
  }
];
