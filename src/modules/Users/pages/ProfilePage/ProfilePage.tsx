"use client";
import { FC } from "react";
import { UpdateUserInfo } from "../../ui/UpdateUserInfo/UpdateUserInfo";
import styles from "./ProfilePage.module.css";

interface IProfilePageProps {
  userId: string;
}

export const ProfilePage: FC<IProfilePageProps> = ({ userId }) => {
  return (
    <div className={styles.page}>
      <UpdateUserInfo userId={userId} />
    </div>
  );
};
