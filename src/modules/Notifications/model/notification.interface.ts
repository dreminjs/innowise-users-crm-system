export type TNotificationType = "success" | "error" | "info";

export interface INotification {
  id: string;
  type: TNotificationType;
  message: string;
}

export interface INotificationState {
  notifications: INotification[];
  removeNotification: (id: string) => void;
  addNotification: (notification: TCreateNotification) => void;
}

export type TCreateNotification = Omit<INotification, "id">;
