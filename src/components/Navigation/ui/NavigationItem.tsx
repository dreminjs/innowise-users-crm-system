import { FC } from "react";
import styles from "./Navigation.module.css";
import clsx from "clsx";
import Link from "next/link";
import { INavigationItem } from "../model/navigation.interface";
type TNavigationItemProps = {
  isActive: boolean;
} & INavigationItem;

export const NavigationItem: FC<TNavigationItemProps> = ({
  isActive,
  to,
  label,
}) => {
  return (
    <li
      className={clsx(
        styles.navigationItem,
        isActive && styles.navigationItemActive,
      )}
    >
      <Link href={to}>{label}</Link>
    </li>
  );
};
