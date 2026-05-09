import { FC } from "react";
import styles from "./RemoveItemButton.module.css";
import TrashIcon from "../../../../../public/trash-icon.svg";
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
      <Image width={14} height={18} src={TrashIcon} alt="trash icon" />
      <span>{label}</span>
    </button>
  );
};
