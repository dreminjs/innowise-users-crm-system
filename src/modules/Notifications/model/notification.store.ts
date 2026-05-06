import { create } from "zustand";
import {
  INotificationState,
  TCreateNotification,
} from "./notification.interface";

export const useNotification = create<INotificationState>((set) => ({
  notifications: [],
  addNotification: (notification: TCreateNotification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: crypto.randomUUID() },
      ],
    })),
  removeNotification: (id: string) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
