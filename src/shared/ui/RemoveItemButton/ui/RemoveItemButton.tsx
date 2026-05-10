import { FC } from "react";
import TrashIcon from "../../../../../public/trash-icon.svg";
import styles from "./RemoveItemButton.module.css";
import Image from "next/image";

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
        <Image width={14} height={18} src={TrashIcon} alt="trash icon" />
      </span>
      <span>{label}</span>
    </button>
  );
};
