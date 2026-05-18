import clsx from "clsx";
import styles from "./ModalField.module.css";

type Props = {
  label: string;
  active?: boolean;
  textarea?: boolean;
  children: React.ReactNode;
};

export const ModalField = ({ label, active, textarea, children }: Props) => {
  return (
    <div
      className={clsx(styles.field, {
        [styles.active]: active,
        [styles.textarea]: textarea,
      })}
    >
      {children}

      <label className={styles.label}>{label}</label>
    </div>
  );
};
