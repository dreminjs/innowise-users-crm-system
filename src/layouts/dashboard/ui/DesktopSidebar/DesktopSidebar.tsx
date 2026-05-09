"use client";

import { navigationItems } from "@/shared/config/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./DesktopSidebar.module.css";
import clsx from "clsx";

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export const DesktopSidebar = ({ collapsed, onToggle }: Props) => {
  const pathname = usePathname();

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
          <Image
            className={styles.image}
            src="/Employees.svg"
            alt="user avatar"
            width={40}
            height={40}
            loading="eager"
          />

          {!collapsed && (
            <div className={styles.userInfo}>
              <span className={styles.name}>User email</span>
            </div>
          )}
        </button>

        <button className={styles.collapseButton} onClick={onToggle}>
          <Image
            src="/arrow.svg"
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
