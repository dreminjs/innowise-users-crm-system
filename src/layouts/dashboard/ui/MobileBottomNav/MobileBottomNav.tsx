"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileBottomNav.module.css";
import { navigationItems } from "@/shared/config/navigation";
import { ProfileMenu } from "@/layouts/dashboard/ui/NavModal/ProfileMenu";
import { useState } from "react";
import { useUserStore } from "@/application/store/user.store";
import { useGetProfile } from "@/modules/Users";

export const MobileBottomNav = () => {
  const pathname = usePathname();
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
    <nav className={styles.navigation}>
      {navigationItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            <Image src={item.icon} alt={item.label} width={40} height={40} />
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
          <Image
            className={styles.image}
            src="/Employees.svg"
            alt="user avatar"
            width={24}
            height={24}
            loading="eager"
          />
        )}
        <div className={styles.userInfo}>
          <span className={styles.name}>{displayName}</span>
        </div>
      </button>
      <ProfileMenu
        isOpen={isMenuOpen}
        userId={userId!}
        closeAction={() => setIsMenuOpen(false)}
      />
    </nav>
  );
};
