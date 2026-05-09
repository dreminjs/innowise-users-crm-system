import { FC } from "react";
import Image from "next/image";
import styles from "../UpdateUserInfo.module.css";
import { useDeleteAvatar } from "@/modules/Users/model/hooks/useDeleteAvatar";
interface IAvatarProps {
  avatarUrl: string | null;
  firstLetter: string;
}

export const Avatar: FC<IAvatarProps> = ({ avatarUrl, firstLetter }) => {
  const { deleteAvatar } = useDeleteAvatar();

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
          <button className={styles.deleteAvatar} onClick={deleteAvatar}>
            ❌
          </button>
        </>
      ) : (
        <div className={styles.avatarSkeleton}>{firstLetter}</div>
      )}
    </div>
  );
};
