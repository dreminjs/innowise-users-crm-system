import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TLanguageLocale } from "./settings.types";

interface ISettingsStore {
  language: TLanguageLocale;
  setLanguage: (language: TLanguageLocale) => void;
  resumeLanguage: TLanguageLocale;
  setResumeLanguage: (resumeLanguage: TLanguageLocale) => void;
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) =>
        set({
          language,
        }),
      resumeLanguage: "en",
      setResumeLanguage: (resumeLanguage) =>
        set({
          resumeLanguage,
        }),
    }),
    {
      name: "settings",
    },
  ),
);
