import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import styles from "./Navigation.module.css";
interface INavigationItemProps {
  href: string;
  label: string;
  isActive: boolean;
  payload: {
    type: "employee" | "cvs";
    id: number;
  };
}

export const NavigationItem: FC<INavigationItemProps> = ({
  href,
  label,
  isActive,
}) => {
  return (
    <li
      className={clsx(
        isActive && styles.navigationItemActive,
        styles.navigationItem,
      )}
    >
      <Link href={"/"}>{label}</Link>
    </li>
  );
};
