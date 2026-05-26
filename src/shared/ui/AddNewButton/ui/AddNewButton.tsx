import { FC } from "react";
import styles from "./AddNewButton.module.css";

interface IAddNewButtonProps {
  onClick: () => void;
  label: string;
}

export const AddNewButton: FC<IAddNewButtonProps> = ({ onClick, label }) => {
  return (
    <button
      className={styles.addNewButton}
      onClick={onClick}
      data-testid="add-new-btn"
    >
      <span>+</span>
      <span>{label}</span>
    </button>
  );
};
