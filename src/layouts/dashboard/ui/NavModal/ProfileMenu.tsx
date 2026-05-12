"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./ProfileMenu.module.css";
import { useUserStore } from "@/application/store/user.store";
import { useTokens } from "@/modules/Tokens";

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
          <Image src="/account.svg" alt="Profile" width={20} height={20} />
          <span>Profile</span>
        </Link>
        <Link className={styles.item} href="/settings" onClick={closeAction}>
          <Image src="/settings.svg" alt="Settings" width={20} height={20} />
          <span>Settings</span>
        </Link>
        <div className={styles.divider} />
        <button className={styles.item} onClick={handleLogout}>
          <Image src="/logout.svg" alt="Logout" width={20} height={20} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};
