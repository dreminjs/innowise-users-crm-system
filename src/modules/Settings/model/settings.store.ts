import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TLanguage } from "./settings.types";

interface ISettingsStore {
  language: TLanguage;
  resumeLanguage: TLanguage;
  setLanguage: (language: TLanguage) => void;
  setResumeLanguage: (resumeLanguage: TLanguage) => void;
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      language: "English",
      resumeLanguage: "English",
      setLanguage: (language) => set({ language }),
      setResumeLanguage: (resumeLanguage) => set({ resumeLanguage }),
    }),
    {
      name: "settings",
    },
  ),
);
