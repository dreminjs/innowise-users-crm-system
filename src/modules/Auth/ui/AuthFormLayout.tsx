import { FC } from "react";
import styles from "./AuthForm.module.css";

interface IAuthFormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const AuthFormLayout: FC<IAuthFormLayoutProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className={styles.authFormLayout}>
      <h2 className={styles.titleGreeting}>{title}</h2>
      <h4 className={styles.subtitleGreeting}>{subtitle}</h4>
      <>{children}</>
    </div>
  );
};
