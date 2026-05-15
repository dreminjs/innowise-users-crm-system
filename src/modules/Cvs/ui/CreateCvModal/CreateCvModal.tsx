"use client";

import { useState } from "react";
import { useUserStore } from "@/application/store/user.store";
import { useCreateCv } from "../../model/hooks/useCreateCv";
import styles from "./CreateCvModal.module.css";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { ModalField } from "@/shared/ui/ModalField/ModalField";

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
          <ModalField label="CV Name" active={Boolean(name)}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
            />
          </ModalField>

          <ModalField label="Education" active={Boolean(education)}>
            <input
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder=" "
            />
          </ModalField>

          <ModalField
            label="Description"
            textarea
            active={Boolean(description)}
          >
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
            />
          </ModalField>
          <ConfirmButtons
            confirmLabel="Create"
            confirmButtonType="button"
            onConfirm={handleSubmit}
            onCancel={closeAction}
            disabled={loading}
          />
        </div>
      </div>
    </>
  );
};
