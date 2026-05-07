import { FC, useEffect } from "react";
import { INotification } from "../model/notification.interface";
import styles from "./NotificationList.module.css";
import clsx from "clsx";
type TNotificationItemProps = INotification & {
  onRemove: (id: string) => void;
};

export const NotificationItem: FC<TNotificationItemProps> = ({
  message,
  type,
  id,
  onRemove,
}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
      onRemove(id);
    }, 3000);
    return () => clearTimeout(timerId);
  }, [id, onRemove]);

  return (
    <li
      className={clsx(styles.notificationItem, {
        [styles.notificationItemError]: type === "error",
        [styles.notificationItemSuccess]: type === "success",
      })}
    >
      {message}
    </li>
  );
};
