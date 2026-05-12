import type { TLanguageLocalization, TLanguageOption } from "./settings.types";

export const languageOptions: TLanguageOption[] = [
  {
    label: "Русский",
    value: "Russian",
  },
  {
    label: "Deutsch",
    value: "German",
  },
  {
    label: "English",
    value: "English",
  },
];

export const languages: TLanguageLocalization[] = [
  { label: "English", value: "English", locale: "en" },
  { label: "Русский", value: "Russian", locale: "ru" },
  { label: "Deutsch", value: "German", locale: "de" },
];
