import { FC } from "react";
import styles from "./ConfirmButtons.module.css";
import { useTranslations } from "next-intl";

interface ConfirmButtonsProps {
  confirmLabel: string;
  amount?: number;
  confirmButtonType: "button" | "submit";
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

export const ConfirmButtons: FC<ConfirmButtonsProps> = ({
  confirmLabel,
  amount,
  confirmButtonType,
  onConfirm,
  onCancel,
  disabled,
}) => {
  const t = useTranslations("ConfirmButtons");
  return (
    <div className={styles.buttons}>
      <button type="button" className={styles.cancelButton} onClick={onCancel}>
        {t("cancel")}
      </button>
      <button
        disabled={disabled}
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
