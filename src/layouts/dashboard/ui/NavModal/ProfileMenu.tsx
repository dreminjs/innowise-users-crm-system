"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ProfileMenu.module.css";
import { useUserStore } from "@/application/store/user.store";
import { useTokens } from "@/modules/Tokens";
import { Icon } from "@/shared/ui/Icon/Icon";

type Props = {
  isOpen: boolean;
  userId: string;
  closeAction: () => void;
};

export const ProfileMenu = ({ isOpen, userId, closeAction }: Props) => {
  const router = useRouter();
  const resetUser = useUserStore((state) => state.resetUser);
  const clearToken = useTokens((state) => state.deleteAccessToken);
  const handleLogout = () => {
    resetUser();
    clearToken();
    closeAction();
    router.push("/auth/signin");
  };
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.backdrop} onClick={closeAction} />
      <div className={styles.modal}>
        <Link
          className={styles.item}
          href={`/users/${userId}`}
          onClick={closeAction}
        >
          <Icon name="account" size={20} className={styles.avatarFallback} />
          <span>Profile</span>
        </Link>
        <Link className={styles.item} href="/settings" onClick={closeAction}>
          <Icon name="settings" size={20} className={styles.avatarFallback} />
          <span>Settings</span>
        </Link>
        <div className={styles.divider} />
        <button className={styles.item} onClick={handleLogout}>
          <Icon name="logout" size={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};
