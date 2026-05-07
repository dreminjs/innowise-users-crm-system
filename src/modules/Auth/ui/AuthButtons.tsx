import Link from "next/link";
import { FC } from "react";
import styles from "./AuthForm.module.css";

interface IAuthButtons {
  submitLabel: string;
  linkLabel: string;
  linkUrl: string;
  isLoading: boolean;
}

export const AuthButtons: FC<IAuthButtons> = ({
  submitLabel,
  linkLabel,
  linkUrl,
  isLoading,
}) => {
  return (
    <div className={styles.authButtons}>
      <button
        disabled={isLoading}
        className={styles.authFormSubmit}
        type="submit"
      >
        {isLoading ? "Загрузка..." : submitLabel}
      </button>
      <Link className={styles.authFormLink} href={linkUrl}>
        {linkLabel}
      </Link>
    </div>
  );
};
