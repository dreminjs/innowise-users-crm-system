import { FC } from "react";
import styles from "./RemoveItemButton.module.css";
import clsx from "clsx";
import { Icon } from "@/shared/ui/Icon/Icon";

interface IRemoveItemButtonProps {
  onClick: () => void;
  label: string;
}

export const RemoveItemButton: FC<IRemoveItemButtonProps> = ({
  onClick,
  label,
}) => {
  return (
    <button className={styles.removeItemButton} onClick={onClick}>
      <span>
        <Icon name="trash" className={clsx(styles.arrow)} />
      </span>
      <span>{label}</span>
    </button>
  );
};
