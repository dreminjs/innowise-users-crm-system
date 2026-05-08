"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./MobileBottomNav.module.css";
import { navigationItems } from "@/shared/config/navigation";

export const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.link} ${isActive ? styles.active : ""}`}
          >
            <Image src={item.icon} alt={item.label} width={20} height={20} />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
