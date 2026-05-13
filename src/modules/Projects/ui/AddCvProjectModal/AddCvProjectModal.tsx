"use client";

import { AddCvProjectForm } from "./AddCvProjectForm";
import styles from "./AddCvProjectModal.module.css";

type Props = {
  cvId: string;
  open: boolean;
  onClose: () => void;
};

export const AddCvProjectModal = ({ cvId, open, onClose }: Props) => {
  if (!open) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add project</h2>
          <button onClick={onClose} className={styles.close}>
            ×
          </button>
        </div>
        <AddCvProjectForm cvId={cvId} onClose={onClose} />
      </div>
    </>
  );
};
