import { FC } from "react";
import styles from "./RemoveItemButton.module.css";
import { FaTrashAlt } from "react-icons/fa";
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
        <FaTrashAlt width={14} height={18} />
      </span>
      <span>{label}</span>
    </button>
  );
};
