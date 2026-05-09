import { FC } from "react";
import { UploadAvatar } from "./UploadAvatar/UploadAvatar";
import { useGetProfile } from "../../model/hooks/useGetProfile";
import { useUserStore } from "@/application/store/user.store";
import styles from "./UpdateUserInfo.module.css";
import { UserInfo } from "./UserInfo";
import { UploadInfo } from "./UploadInfo/UploadInfo";
import { da } from "zod/v4/locales";

interface IUpdateUserInfoProps {
  userId: string;
}

export const UpdateUserInfo: FC<IUpdateUserInfoProps> = ({ userId }) => {
  const { data, error } = useGetProfile(userId);
  const currentUserId = useUserStore((state) => state.userId);
  if (!data || error) return <div>Error!</div>;
  return (
    <div className={styles.updateUserInfo}>
      <UploadAvatar
        avatarUrl={data?.user.profile.avatar || ""}
        firstLetter={data?.user?.profile?.first_name?.charAt(0) || "Unknow"}
        isUploadAvailable={currentUserId === userId}
      />
      <UserInfo
        fullName={
          data?.user.profile.first_name && data?.user.profile.last_name
            ? data?.user.profile.first_name + " " + data?.user.profile.last_name
            : "-"
        }
        email={data?.user.email || "-"}
        hiredDate={`A member since ${new Date(+data?.user.created_at || 0).toDateString()}`}
      />
      <UploadInfo
        isAvailable={currentUserId === userId}
        firstName={data?.user.profile.first_name || ""}
        lastName={data?.user.profile.last_name || ""}
        department={data?.user.department?.name || ""}
        positionId={data.user.position?.id || ""}
        position={data.user.position?.name || ""}
        departmentId={data?.user.department?.id || ""}
      />
    </div>
  );
};
