import Link from "next/link";
import { FC } from "react";
import styles from "./UserAction.module.css";
interface IUserActionProps {
  children: React.ReactNode;
  to: string;
}

export const UserAction: FC<IUserActionProps> = ({ children, to }) => {
  return (
    <li className={styles.userActionsItem} data-testid="menu-link">
      <Link href={to}>{children}</Link>
    </li>
  );
};
