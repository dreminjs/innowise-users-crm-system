"use client";
import { NavigationItem } from "./NavigationItem";
import styles from "./Navigation.module.css";
import { usePathname } from "next/navigation";
export const Navigation = () => {
  const pathname = usePathname().split("/")[2];
  return (
    <nav>
      <ul className={styles.navigationList}>
        <NavigationItem to={"signin"} isActive={pathname === "signin"}>
          ВОЙТИ
        </NavigationItem>
        <NavigationItem to={"signup"} isActive={pathname === "signup"}>
          СОЗДАТЬ
        </NavigationItem>
      </ul>
    </nav>
  );
};
