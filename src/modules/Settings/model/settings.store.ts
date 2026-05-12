import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TLanguage } from "./settings.types";

interface ISettingsStore {
  language: TLanguage;
  setLanguage: (language: TLanguage) => void;
  resumeLanguage: TLanguage;
  setResumeLanguage: (resumeLanguage: TLanguage) => void;
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      resumeLanguage: "English",
      setResumeLanguage: (resumeLanguage) => set({ resumeLanguage }),
      language: "English",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "settings",
    },
  ),
);
