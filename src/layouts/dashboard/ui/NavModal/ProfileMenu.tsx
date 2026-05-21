"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./ProfileMenu.module.css";
import { useUserStore } from "@/application/store/user.store";
import { useTokens } from "@/modules/Tokens";
import { Icon } from "@/shared/ui/Icon/Icon";
import { useTranslations } from "next-intl";
import { navigationItems } from "@/shared/config/navigation";

type Props = {
  isOpen: boolean;
  userId: string;
  collapsed: boolean;
  closeAction: () => void;
  isMobile?: boolean;
};

export const ProfileMenu = ({
  isOpen,
  userId,
  collapsed,
  closeAction,
  isMobile = false,
}: Props) => {
  const t = useTranslations("DesktopNavigation");
  const router = useRouter();
  const role = useUserStore((state) => state.role);
  const resetUser = useUserStore((state) => state.resetUser);
  const clearToken = useTokens((state) => state.deleteAccessToken);
  const handleLogout = () => {
    resetUser();
    clearToken();
    closeAction();
    router.push("/auth/signin");
  };
  if (!isOpen) return null;
  const mobileMenuItems = role
    ? navigationItems.filter(
        (item) =>
          item.roles.includes(role) &&
          item.href !== "/users" &&
          item.href !== "/skills",
      )
    : [];

  return createPortal(
    <>
      <div className={styles.backdrop} onClick={closeAction} />
      <div
        className={clsx(
          styles.modal,
          collapsed && styles.collapsedModal,
          isMobile && styles.mobileModal,
        )}
      >
        <Link
          className={styles.item}
          href={`/users/${userId}`}
          onClick={closeAction}
        >
          <Icon name="account" size={20} />
          <span>{t("profile")}</span>
        </Link>
        <Link className={styles.item} href="/settings" onClick={closeAction}>
          <Icon name="settings" size={20} />
          <span>{t("settings")}</span>
        </Link>
        {isMobile && (
          <>
            <div className={styles.divider} />
            {mobileMenuItems.map((item) => (
              <Link
                key={item.href}
                className={styles.item}
                href={item.href}
                onClick={closeAction}
              >
                <Icon name={item.icon} size={20} />
                <span>{t(item.label)}</span>
              </Link>
            ))}
          </>
        )}
        <div className={styles.divider} />
        <button className={styles.item} onClick={handleLogout}>
          <Icon name="logout" size={20} />
          <span>{t("logout")}</span>
        </button>
      </div>
    </>,
    document.body,
  );
};
