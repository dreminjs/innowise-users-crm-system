import { FC } from "react";
import styles from "./ConfirmButtons.module.css";
import { useTranslations } from "next-intl";

interface ConfirmButtonsProps {
  confirmLabel: string;
  amount?: number;
  confirmButtonType: "button" | "submit";
  confirmAction?: () => void;
  cancelAction?: () => void;
  disabled?: boolean;
}

export const ConfirmButtons: FC<ConfirmButtonsProps> = ({
  confirmLabel,
  amount,
  confirmButtonType,
  confirmAction,
  cancelAction,
  disabled,
}) => {
  const t = useTranslations("ConfirmButtons");
  console.log(confirmLabel);
  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={styles.cancelButton}
        onClick={cancelAction}
      >
        {t("cancel")}
      </button>
      <button
        disabled={disabled}
        type={confirmButtonType}
        className={styles.confirmButton}
        onClick={confirmAction}
      >
        <span>{confirmLabel ?? t("confirm")}</span>
        {amount && <span className={styles.confirmButtonAmount}>{amount}</span>}
      </button>
    </div>
  );
};
