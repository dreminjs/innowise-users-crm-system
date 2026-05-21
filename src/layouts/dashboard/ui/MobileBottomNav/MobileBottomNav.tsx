"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileBottomNav.module.css";
import { navigationItems } from "@/shared/config/navigation";
import { ProfileMenu } from "@/layouts/dashboard/ui/NavModal/ProfileMenu";
import { useState } from "react";
import { useUserStore } from "@/application/store/user.store";
import { useGetProfile } from "@/modules/Users";
import Image from "next/image";
import { Icon } from "@/shared/ui/Icon/Icon";

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userId = useUserStore((state) => state.userId);
  const email = useUserStore((state) => state.email);
  const role = useUserStore((state) => state.role);
  const { data } = useGetProfile(userId!);
  const profile = data?.user?.profile;
  const avatar = profile?.avatar;
  const firstName = profile?.first_name;
  const lastName = profile?.last_name;
  const displayName =
    firstName || lastName
      ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
      : email;

  const availableNavigationItems = role
    ? navigationItems.filter((item) => item.roles.includes(role))
    : [];
  return (
    <nav className={styles.navigation}>
      {availableNavigationItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            <Icon name={item.icon} size={24} className={styles.icon} />

            <span>{item.label}</span>
          </Link>
        );
      })}
      <button
        className={styles.profileMobileButton}
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
          <Icon name="employees" size={24} className={styles.image} />
        )}
        <div className={styles.userInfo}>
          <span className={styles.name}>{displayName}</span>
        </div>
      </button>
      <ProfileMenu
        isOpen={isMenuOpen}
        userId={userId!}
        closeAction={() => setIsMenuOpen(false)}
        collapsed={false}
        isMobile
      />
    </nav>
  );
};
