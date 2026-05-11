"use client";

import Image from "next/image";
import styles from "./ProfileMenu.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ProfileMenu = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />

      <div className={styles.modal}>
        <button className={styles.item}>
          <Image src="/account.svg" alt="Profile" width={20} height={20} />

          <span>Profile</span>
        </button>

        <button className={styles.item}>
          <Image src="/settings.svg" alt="Settings" width={20} height={20} />

          <span>Settings</span>
        </button>

        <div className={styles.divider} />

        <button className={styles.item}>
          <Image src="/logout.svg" alt="Logout" width={20} height={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};
