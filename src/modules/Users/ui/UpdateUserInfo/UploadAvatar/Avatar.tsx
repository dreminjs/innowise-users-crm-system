import { FC } from "react";
import Image from "next/image";
import styles from "../UpdateUserInfo.module.css";
import { useDeleteAvatar } from "@/modules/Users/model/hooks/useDeleteAvatar";
interface IAvatarProps {
  avatarUrl: string | null;
  firstLetter: string;
  isAvailable: boolean;
  onClearAvatar: () => void;
}

export const Avatar: FC<IAvatarProps> = ({
  avatarUrl,
  firstLetter,
  isAvailable,
  onClearAvatar,
}) => {
  const { deleteAvatar } = useDeleteAvatar();
  const handleDeleteAvatar = () => {
    onClearAvatar();
    deleteAvatar();
  };
  return (
    <div className={styles.avatarContainer}>
      {avatarUrl ? (
        <>
          <Image
            width={120}
            height={120}
            className={styles.avatar}
            src={avatarUrl}
            alt="avatar"
          />
          {isAvailable && (
            <button
              className={styles.deleteAvatar}
              onClick={handleDeleteAvatar}
            >
              ❌
            </button>
          )}
        </>
      ) : (
        <div className={styles.avatarSkeleton}>{firstLetter}</div>
      )}
    </div>
  );
};
