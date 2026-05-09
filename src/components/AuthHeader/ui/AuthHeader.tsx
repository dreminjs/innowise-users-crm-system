"use client";
import { Navigation } from "@/components/Navigation";
import styles from "./AuthHeader.module.css";
import { usePathname } from "next/navigation";
import { navItems } from "../model/nav.items";
export const AuthHeader = () => {
  const pathname = usePathname();
  if (pathname === "/auth/forgot-password") return null;
  return (
    <header className={styles.authHeader}>
      <Navigation items={navItems} />
    </header>
  );
};
