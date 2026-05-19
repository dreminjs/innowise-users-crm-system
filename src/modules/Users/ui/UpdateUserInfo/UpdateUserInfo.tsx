import { FC } from "react";
import { UploadAvatar } from "./UploadAvatar/UploadAvatar";
import { useGetProfile } from "@/modules/Users";
import { useUserStore } from "@/application/store/user.store";
import { UserInfo } from "./UserInfo";
import { UploadInfo } from "./UploadInfo/UploadInfo";
import styles from "./UpdateUserInfo.module.css";
import { Loading } from "@/shared/ui/Loading";
import { UserRole } from "@/generated/graphql";

interface IUpdateUserInfoProps {
  userId: string;
}

export const UpdateUserInfo: FC<IUpdateUserInfoProps> = ({ userId }) => {
  const { data, error, loading } = useGetProfile(userId);
  const role = useUserStore((state) => state.role);
  const currentUserId = useUserStore((state) => state.userId);
  const isEditable = currentUserId === userId || role === UserRole.Admin;
  if (loading) return <Loading />;
  if (error || !data)
    return <div className={styles.uploadInfoError}>Error!</div>;
  return (
    <div className={styles.updateUserInfo}>
      <UploadAvatar
        userId={userId}
        avatarUrl={data.user.profile.avatar || ""}
        firstLetter={data.user?.profile?.first_name?.charAt(0) || "Unknow"}
        isUploadAvailable={isEditable}
      />
      <UserInfo
        fullName={
          data.user.profile.first_name && data.user.profile.last_name
            ? data.user.profile.first_name + " " + data.user.profile.last_name
            : "-"
        }
        email={data.user.email || "-"}
        hiredDate={`A member since ${new Date(+data.user.created_at || 0).toDateString()}`}
      />
      <UploadInfo
        userId={userId}
        isAvailable={isEditable}
        firstName={data.user.profile.first_name || ""}
        lastName={data.user.profile.last_name || ""}
        positionId={data.user.position?.id || ""}
        departmentId={data.user.department?.id || ""}
      />
    </div>
  );
};
