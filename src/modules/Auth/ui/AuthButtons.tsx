import Link from "next/link";
import { FC } from "react";
import styles from "./AuthForm.module.css";

interface IAuthButtons {
  submitLabel: string;
  linkLabel: string;
  linkUrl: string;
}

export const AuthButtons: FC<IAuthButtons> = ({
  submitLabel,
  linkLabel,
  linkUrl,
}) => {
  return (
    <div className={styles.authButtons}>
      <button className={styles.authFormSubmit} type="submit">
        {submitLabel}
      </button>
      <Link className={styles.authFormLink} href={linkUrl}>
        {linkLabel}
      </Link>
    </div>
  );
};
