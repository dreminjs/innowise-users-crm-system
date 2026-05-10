import { FC } from "react";
import styles from "./ConfirmButtons.module.css";

interface ConfirmButtonsProps {
  confirmLabel: string;
  amount?: number;
  confirmButtonType: "button" | "submit";
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmButtons: FC<ConfirmButtonsProps> = ({
  confirmLabel,
  amount,
  confirmButtonType,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.buttons}>
      <button type="button" className={styles.cancelButton} onClick={onCancel}>
        CANCEL
      </button>
      <button
        type={confirmButtonType}
        className={styles.confirmButton}
        onClick={onConfirm}
      >
        <span>{confirmLabel}</span>
        <span className={styles.confirmButtonAmount}>{amount}</span>
      </button>
    </div>
  );
};
