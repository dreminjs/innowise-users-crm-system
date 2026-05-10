export const languageProfiency: LanguageLevel[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
];

export const languageLevelColors = {
  Native: "#FF4D4D",
  C2: "#FFB84D",
  C1: "#FFD93D",
  B2: "#6BCB77",
  B1: "#4D96FF",
  A2: "#6B7280",
  A1: "#9CA3AF",
} as const;

export type LanguageLevel = keyof typeof languageLevelColors;
