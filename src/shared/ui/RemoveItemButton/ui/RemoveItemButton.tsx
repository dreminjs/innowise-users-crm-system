import { FC } from "react";
import TrashIcon from "../../../../../public/trash-icon.svg";
import styles from "./RemoveItemButton.module.css";
import Image from "next/image";
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
