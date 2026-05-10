import { Mastery } from "@/generated/graphql";

export const skillLevels: Mastery[] = [
  Mastery.Novice,
  Mastery.Competent,
  Mastery.Proficient,
  Mastery.Advanced,
  Mastery.Expert,
];

export const masteryValue: Record<Mastery, number> = {
  [Mastery.Novice]: 20,
  [Mastery.Competent]: 40,
  [Mastery.Proficient]: 60,
  [Mastery.Advanced]: 80,
  [Mastery.Expert]: 100,
};

export const masteryColorPalette: Record<Mastery, string> = {
  [Mastery.Novice]: "#767676",
  [Mastery.Competent]: "#66BB6A",
  [Mastery.Proficient]: "#FFB800",
  [Mastery.Advanced]: "#29B6F6",
  [Mastery.Expert]: "#C63031",
};

export const masteryBgColor: Record<Mastery, string> = {
  [Mastery.Novice]: "#3B3B3B",
  [Mastery.Competent]: "#335D35",
  [Mastery.Proficient]: "#7F5C00",
  [Mastery.Advanced]: "#0D3A4F",
  [Mastery.Expert]: "#631818",
};
