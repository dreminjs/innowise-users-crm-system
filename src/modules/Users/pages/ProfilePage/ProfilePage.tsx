import { useUserStore } from "@/application/store/user.store";
import { FC } from "react";
import { UpdateUserInfo } from "../../ui/UpdateUserInfo/UpdateUserInfo";
import styles from "./ProfilePage.module.css";

interface IProfilePageProps {
  userId: string;
}

export const ProfilePage: FC<IProfilePageProps> = ({ userId }) => {
  const currentUserId = useUserStore((state) => state.userId);

  return (
    <div className={styles.page}>
      <UpdateUserInfo userId={userId} />
    </div>
  );
};
