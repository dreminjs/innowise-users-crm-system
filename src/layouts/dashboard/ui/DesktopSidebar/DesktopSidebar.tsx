"use client";

import { navigationItems } from "@/shared/config/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./DesktopSidebar.module.css";
import { useUserStore } from "@/application/store/user.store";
import { useGetProfile } from "@/modules/Users";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export const DesktopSidebar = ({ collapsed, onToggle }: Props) => {
  const pathname = usePathname();
  const userId = useUserStore((state) => state.userId);
  const email = useUserStore((state) => state.email);
  const { data } = useGetProfile(userId);
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
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(styles.link, isActive && styles.active)}
            >
              <Image
                loading="eager"
                src={item.icon}
                alt={item.label}
                width={20}
                height={20}
              />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button className={styles.profileButton}>
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

        <button className={styles.collapseButton} onClick={onToggle}>
          <Image
            src="/nav-arrow.svg"
            alt="Toggle sidebar"
            loading="eager"
            width={40}
            height={40}
            className={clsx(styles.arrow, collapsed && styles.rotated)}
          />
        </button>
      </div>
    </aside>
  );
};
