"use client";

import { navigationItems } from "@/shared/config/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./DesktopSidebar.module.css";
import { useUserStore } from "@/application/store/user.store";
import { useGetProfile } from "@/modules/Users";
import { ProfileMenu } from "@/layouts/dashboard/ui/NavModal/ProfileMenu";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  collapsed: boolean;
  toggleAction: () => void;
};

export const DesktopSidebar = ({ collapsed, toggleAction }: Props) => {
  const pathname = usePathname();
  const t = useTranslations("DesktopNavigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = useUserStore((state) => state.userId);
  const email = useUserStore((state) => state.email);
  const { data } = useGetProfile(userId!);
  const profile = data?.user?.profile;
  const avatar = profile?.avatar;
  const firstName = profile?.first_name;
  const lastName = profile?.last_name;
  const displayName =
    firstName || lastName
      ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
      : email;

  return (
    <aside className={clsx(styles.sidebar, collapsed && styles.collapsed)}>
      <nav className={styles.navigation}>
        {navigationItems.map(({ icon: Icon, ...item }) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(styles.link, isActive && styles.active)}
            >
              <Icon />
              {!collapsed && <span>{t(item.label)}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button
          className={styles.profileButton}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {avatar ? (
            <Image
              className={styles.avatar}
              src={avatar}
              width={40}
              height={40}
              alt={displayName ?? "User"}
            />
          ) : (
            <Image
              className={styles.image}
              src="/Employees.svg"
              alt="user avatar"
              width={40}
              height={40}
              loading="eager"
            />
          )}

          {!collapsed && (
            <div className={styles.userInfo}>
              <span className={styles.name}>{displayName}</span>
            </div>
          )}
        </button>

        <ProfileMenu
          isOpen={isMenuOpen}
          userId={userId!}
          closeAction={() => setIsMenuOpen(false)}
        />

        <button className={styles.collapseButton} onClick={toggleAction}>
          <Image
            src="/nav-arrow.svg"
            alt="Toggle sidebar"
            loading="eager"
            width={16}
            height={16}
            className={clsx(styles.arrow, collapsed && styles.rotated)}
          />
        </button>
      </div>
    </aside>
  );
};
