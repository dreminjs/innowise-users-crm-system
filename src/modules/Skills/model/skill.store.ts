import { create } from "zustand";

interface ISkillStore {
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  deleteSkills: Record<string, string>;
  addDeleteSkill: (skill: string) => void;
  removeDeleteSkill: (skill: string) => void;
  clearDeleteSkills: () => void;
}

export const useSkillStore = create<ISkillStore>((set) => ({
  isDeleteMode: false,
  toggleDeleteMode: () =>
    set((state) => ({ isDeleteMode: !state.isDeleteMode })),
  deleteSkills: {},
  addDeleteSkill: (skill: string) =>
    set((state) => ({
      deleteSkills: { ...state.deleteSkills, [skill]: skill },
    })),
  clearDeleteSkills: () => set(() => ({ deleteSkills: {} })),
  removeDeleteSkill: (skill: string) =>
    set((state) => ({
      deleteSkills: Object.fromEntries(
        Object.entries(state.deleteSkills).filter(([key]) => key !== skill),
      ),
    })),
}));
