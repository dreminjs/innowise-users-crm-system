"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DesktopSidebar.module.css";
import { navigationItems } from "@/shared/config/navigation";
import ArrowIcon from "../../../../../public/arrow.svg";

export const DesktopSidebar = () => {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        ${styles.sidebar}
        ${collapsed ? styles.collapsed : ""}
      `}
    >
      <nav className={styles.navigation}>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                ${styles.link}
                ${isActive ? styles.active : ""}
              `}
            >
              <Image src={item.icon} alt={item.label} width={20} height={20} />

              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <button className={styles.profileButton}>
          <img className={styles.avatar} src="/avatar.jpg" alt="User avatar" />
          {!collapsed && (
            <div className={styles.userInfo}>
              <span className={styles.name}>User email</span>
            </div>
          )}
        </button>

        <button
          className={styles.collapseButton}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <Image
            src="/arrow.svg"
            alt="Toggle sidebar"
            width={34}
            height={34}
            className={`
              ${styles.arrow}
              ${collapsed ? styles.rotated : ""}
            `}
          />
        </button>
      </div>
    </aside>
  );
};
