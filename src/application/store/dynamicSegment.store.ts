import { create } from "zustand";

interface IDynamicSegmentStore {
  segment: string;
  setSegment: (segment: string) => void;
}

export const useDynamicSegment = create<IDynamicSegmentStore>((set) => ({
  segment: "",
  setSegment: (segment: string) => set({ segment }),
}));
