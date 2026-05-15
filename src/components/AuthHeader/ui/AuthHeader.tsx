"use client";
import { Navigation, NavigationItem } from "@/components/Navigation";
import { usePathname } from "next/navigation";
import { navItems } from "../model/nav.items";
import styles from "./AuthHeader.module.css";
export const AuthHeader = () => {
  const pathname = usePathname();

  if (pathname === "/auth/forgot-password") return null;
  return (
    <header className={styles.authHeader}>
      <Navigation>
        {navItems.map((el, idx) => (
          <NavigationItem
            key={idx}
            isActive={pathname.includes(el.to)}
            label={el.label}
            to={el.to}
          />
        ))}
      </Navigation>
    </header>
  );
};
