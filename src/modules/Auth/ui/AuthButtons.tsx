import Link from "next/link";
import { FC } from "react";
import styles from "./AuthForm.module.css";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Login");
  return (
    <div className={styles.authButtons}>
      <button
        disabled={isLoading}
        className={styles.authFormSubmit}
        type="submit"
      >
        {isLoading ? t("loading") : submitLabel}
      </button>
      <Link className={styles.authFormLink} href={linkUrl}>
        {linkLabel}
      </Link>
    </div>
  );
};
