"use client";

import { useState } from "react";
import { useUserStore } from "@/application/store/user.store";
import { useCreateCv } from "../../model/hooks/useCreateCv";
import styles from "./CreateCvModal.module.css";

type Props = {
  isOpen: boolean;
  closeAction: () => void;
};

export const CreateCvModal = ({ isOpen, closeAction }: Props) => {
  const userId = useUserStore((state) => state.userId);
  const [name, setName] = useState("");
  const [education, setEducation] = useState("");
  const [description, setDescription] = useState("");
  const [createCv, { loading }] = useCreateCv();
  const handleSubmit = async () => {
    if (!name.trim()) return;
    if (!userId) return;
    try {
      await createCv({
        variables: {
          cv: {
            name,
            education,
            description,
            userId,
          },
        },
      });
      setName("");
      setEducation("");
      setDescription("");
      closeAction();
    } catch (error) {
      throw error;
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={closeAction} />
      <div className={styles.modal}>
        <button
          type="button"
          onClick={closeAction}
          className={styles.closeButton}
        >
          ×
        </button>
        <h2 className={styles.title}>Create CV</h2>
        <div className={styles.form}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="CV name"
            className={styles.input}
          />
          <input
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Education"
            className={styles.input}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className={styles.textarea}
          />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={closeAction}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={styles.submitButton}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};
