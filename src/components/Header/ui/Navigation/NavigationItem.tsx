import clsx from "clsx";
import Link from "next/link";
import { FC } from "react";
import styles from "./Navigation.module.css";
interface INavigationItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export const NavigationItem: FC<INavigationItemProps> = ({
  href,
  label,
  isActive,
}) => {
  return (
    <li
      className={clsx(
        styles.navigationItem,
        isActive && styles.navigationItemActive,
      )}
    >
      <Link href={href}>
        {label.charAt(0).toLocaleUpperCase() + label.slice(1)}
      </Link>
    </li>
  );
};
