import { create } from "zustand";

interface ISkillStore {
  isDeleteMode: boolean;
  toggleDeleteMode: () => void;
  deleteSkills: Record<string, string>;
  toggleDeleteSkill: (skill: string) => void;
  clearDeleteSkills: () => void;
}

export const useSkillStore = create<ISkillStore>((set, get) => ({
  isDeleteMode: false,
  toggleDeleteMode: () =>
    set((state) => ({ isDeleteMode: !state.isDeleteMode })),
  deleteSkills: {},
  toggleDeleteSkill: (skill: string) =>
    set((state) => {
      if (state.deleteSkills[skill]) {
        const { [skill]: _, ...rest } = state.deleteSkills;
        return { deleteSkills: rest };
      } else {
        return { deleteSkills: { ...state.deleteSkills, [skill]: skill } };
      }
    }),
  clearDeleteSkills: () => set(() => ({ deleteSkills: {}, deletedCount: 0 })),
}));
