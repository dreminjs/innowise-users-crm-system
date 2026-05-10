import { create } from "zustand";

interface ILanguageStore {
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  deleteLanguages: Record<string, string>;
  addDeleteLanguage: (skill: string) => void;
  removeDeleteLanguage: (skill: string) => void;
  clearDeleteLanguages: () => void;
}

export const useLanguageStore = create<ILanguageStore>((set) => ({
  isDeleteMode: false,
  toggleDeleteMode: () =>
    set((state) => ({ isDeleteMode: !state.isDeleteMode })),
  deleteLanguages: {},
  addDeleteLanguage: (language: string) =>
    set((state) => ({
      deleteLanguages: { ...state.deleteLanguages, [language]: language },
    })),
  clearDeleteLanguages: () => set(() => ({ deleteLanguages: {} })),
  removeDeleteLanguage: (language: string) =>
    set((state) => ({
      deleteLanguages: Object.fromEntries(
        Object.entries(state.deleteLanguages).filter(
          ([key]) => key !== language,
        ),
      ),
    })),
}));
