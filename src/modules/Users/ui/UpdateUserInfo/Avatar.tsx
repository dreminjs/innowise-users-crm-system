import { FC } from "react";
import Image from "next/image";
import styles from "./UpdateUserInfo.module.css";
interface IAvatarProps {
  avatarUrl: string | null;
  firstLetter: string;
}

export const Avatar: FC<IAvatarProps> = ({ avatarUrl, firstLetter }) => {
  return (
    <>
      {avatarUrl ? (
        <Image
          width={120}
          height={120}
          className={styles.avatar}
          src={avatarUrl}
          alt="avatar"
        />
      ) : (
        <div className={styles.avatarSkeleton}>{firstLetter}</div>
      )}
    </>
  );
};
