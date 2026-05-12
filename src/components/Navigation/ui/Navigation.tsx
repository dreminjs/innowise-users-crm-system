"use client";
import { FC } from "react";
import styles from "./Navigation.module.css";

interface INavigationProps {
  children: React.ReactNode;
}

export const Navigation: FC<INavigationProps> = ({ children }) => {
  return (
    <nav className={styles.navigation}>
      <ul className={styles.navigationList}>{children}</ul>
    </nav>
  );
};
