"use client";

import { useState } from "react";
import { DesktopSidebar } from "../DesktopSidebar";
import { MobileBottomNav } from "../MobileBottomNav";
import styles from "./DashboardLayout.module.css";

type Props = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`
        ${styles.layout}
        ${collapsed ? styles.collapsed : ""}
      `}
    >
      <DesktopSidebar
        collapsed={collapsed}
        toggleAction={() => setCollapsed((prev) => !prev)}
      />
      <main className={styles.content}>{children}</main>
      <MobileBottomNav />
    </div>
  );
};
