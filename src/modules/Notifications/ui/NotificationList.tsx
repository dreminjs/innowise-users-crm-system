"use client";

import clsx from "clsx";
import { useNotification } from "../model/notification.store";
import { NotificationItem } from "./NotificationItem";
import styles from "./NotificationList.module.css";

export const NotificationList = () => {
  const { removeNotification, notifications } = useNotification();

  return (
    <ul className={styles.notificationList}>
      {notifications.map((notification) => (
        <NotificationItem
          {...notification}
          key={notification.id}
          onRemove={removeNotification}
        />
      ))}
    </ul>
  );
};
