import clsx from "clsx";
import styles from "./ModalField.module.css";

type Props = {
  label: string;
  active?: boolean;
  textarea?: boolean;
  error?: string;
  children: React.ReactNode;
};

export const ModalField = ({
  label,
  active,
  textarea,
  error,
  children,
}: Props) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={clsx(styles.field, {
          [styles.active]: active,
          [styles.textarea]: textarea,
          [styles.errorBorder]: error,
        })}
      >
        {children}
        <label className={styles.label}>{label}</label>
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
