"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import styles from "./DepartmentModal.module.css";
import { FormModal } from "@/shared/ui/FormModal";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";

type Props = {
  open: boolean;
  toggleAction: () => void;
  title: string;
  confirmLabel: string;
  loading?: boolean;
  defaultValues?: {
    name: string;
  };
  submitAction: (values: { name: string }) => Promise<void>;
};

export const DepartmentModal: FC<Props> = ({
  open,
  toggleAction,
  title,
  confirmLabel,
  loading,
  defaultValues,
  submitAction,
}) => {
  const t = useTranslations("DepartmentModal");
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(t("validation.nameRequired"));
      return;
    }
    setError("");
    await submitAction({
      name,
    });
  };

  return (
    <FormModal open={open} toggleAction={toggleAction} title={title}>
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
      >
        <ModalField label={t("name")} active={!!name} error={error}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </ModalField>
        <ConfirmButtons
          confirmLabel={confirmLabel}
          confirmButtonType="submit"
          cancelAction={toggleAction}
          disabled={loading}
        />
      </form>
    </FormModal>
  );
};
