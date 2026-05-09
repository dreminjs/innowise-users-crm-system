import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserState {
  role: string | null;
  userId: string | null;
  email: string | null;
  position: string | null;
  position_name: string | null;
}

interface UserActions {
  setRole: (role: string | null) => void;
  setUserId: (id: string | null) => void;
  setEmail: (email: string | null) => void;
  setPositionName: (name: string | null) => void;
  setUser: (state: Partial<UserState>) => void;
  resetUser: () => void;
}

type TUserStore = UserState & UserActions;

const initialState: UserState = {
  role: null,
  userId: null,
  email: null,
  position: null,
  position_name: null,
};

export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setRole: (role) => set({ role }),
      setUserId: (userId) => set({ userId }),
      setEmail: (email) => set({ email }),
      setPositionName: (position_name) => set({ position_name }),
      setUser: (state) => set((prev) => ({ ...prev, ...state })),
      resetUser: () => set(initialState),
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
