import { FC } from "react";
import { UploadAvatar } from "./UploadAvatar/UploadAvatar";
import { useGetProfile } from "../../model/hooks/useGetProfile";
import { useUserStore } from "@/application/store/user.store";
import styles from "./UpdateUserInfo.module.css";
import { UserInfo } from "./UserInfo";

interface IUpdateUserInfoProps {
  userId: string;
}

export const UpdateUserInfo: FC<IUpdateUserInfoProps> = ({ userId }) => {
  const { data, error } = useGetProfile(userId);
  const currentUserId = useUserStore((state) => state.userId);
  if (error || !data) return <div>Error!</div>;
  return (
    <form className={styles.updateUserInfo}>
      <UploadAvatar
        avatarUrl={data?.user.profile.avatar || ""}
        firstLetter={data?.user?.profile?.first_name?.charAt(0) || "Unknow"}
        isUploadAvailable={currentUserId === userId}
      />
      <UserInfo
        fullName={
          data?.user.profile.first_name + " " + data?.user.profile.last_name
        }
        email={data?.user.email || "-"}
        hiredDate={`A member since ${new Date(+data?.user.created_at || 0).toDateString()}`}
      />
    </form>
  );
};
