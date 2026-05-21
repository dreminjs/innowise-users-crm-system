"use client";

import { useTranslations } from "next-intl";
import { AddCvProjectForm } from "./AddCvProjectForm";
import styles from "./AddCvProjectModal.module.css";

type Props = {
  cvId: string;
  open: boolean;
  closeAction: () => void;
};

export const AddCvProjectModal = ({ cvId, open, closeAction }: Props) => {
  const t = useTranslations("AddCvProject");
  if (!open) {
    return null;
  }
  return (
    <>
      <div className={styles.backdrop} onClick={closeAction} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("title")}</h2>
          <button onClick={closeAction} className={styles.close}>
            ×
          </button>
        </div>
        <AddCvProjectForm cvId={cvId} closeAction={closeAction} />
      </div>
    </>
  );
};
