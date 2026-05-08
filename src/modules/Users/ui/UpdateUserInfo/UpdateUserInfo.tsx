import { FC } from "react";
import { UploadAvatar } from "./UploadAvatar";
import { useGetProfile } from "../../model/hooks/useGetProfile";
import styles from "./UpdateUserInfo.module.css";
import { useUserStore } from "@/application/store/user.store";

interface IUpdateUserInfoProps {
  userId: string;
}

export const UpdateUserInfo: FC<IUpdateUserInfoProps> = ({ userId }) => {
  const { data } = useGetProfile(userId);
  const currentUserId = useUserStore((state) => state.userId);
  return (
    <form className={styles.updateUserInfo}>
      <UploadAvatar
        avatarUrl={data?.user.profile.avatar || ""}
        firstLetter={data?.user?.profile?.first_name?.charAt(0) || "Unknow"}
        isUploadAvailable={currentUserId === userId}
      />
    </form>
  );
};
