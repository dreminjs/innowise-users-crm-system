import { create } from "zustand";

type State = {
  deleteSkills: Record<string, boolean>;
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  toggleSkill: (name: string) => void;
  clearSkills: () => void;
};

export const useCvSkillStore = create<State>((set) => ({
  deleteSkills: {},
  isDeleteMode: false,

  toggleDeleteMode: () =>
    set((state) => ({
      isDeleteMode: !state.isDeleteMode,
    })),

  toggleSkill: (name) =>
    set((state) => {
      const next = {
        ...state.deleteSkills,
      };
      if (next[name]) {
        delete next[name];
      } else {
        next[name] = true;
      }
      return {
        deleteSkills: next,
      };
    }),
  clearSkills: () =>
    set({
      deleteSkills: {},
    }),
}));
