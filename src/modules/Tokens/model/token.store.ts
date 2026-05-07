import { create } from "zustand";
import { ITokensState } from "./token.interface";
import { persist, createJSONStorage } from "zustand/middleware";

export const useTokens = create<ITokensState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (payload: string | null) => set({ accessToken: payload }),
      setRefreshToken: (payload: string | null) =>
        set({ refreshToken: payload }),
    }),
    {
      name: "tokens",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
