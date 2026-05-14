import { create } from "zustand";

interface ISkillStore {
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  deleteSkills: Record<string, string | undefined>;
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
    set((state) => {
      if (state.deleteSkills[skill]) {
        const { [skill]: _, ...rest } = state.deleteSkills;
        return { deleteSkills: rest };
      } else {
        return { deleteSkills: { ...state.deleteSkills, [skill]: skill } };
      }
    }),
  clearDeleteSkills: () => set(() => ({ deleteSkills: {} })),
  removeDeleteSkill: (skill: string) =>
    set((state) => ({
      deleteSkills: Object.fromEntries(
        Object.entries(state.deleteSkills).filter(([key]) => key !== skill),
      ),
    })),
}));
