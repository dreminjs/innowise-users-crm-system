import { FC } from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";
import clsx from "clsx";
export interface INavigationItem {
  to: "signin" | "signup";
  children: React.ReactNode;
  isActive: boolean;
}

export const NavigationItem: FC<INavigationItem> = ({
  to,
  children,
  isActive,
}) => {
  return (
    <li
      className={clsx(
        styles.navigationItem,
        isActive && styles.navigationItemActive,
      )}
    >
      <Link href={to}>{children}</Link>
    </li>
  );
};
