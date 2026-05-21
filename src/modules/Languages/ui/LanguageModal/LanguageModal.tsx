"use client";

import { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import styles from "./LanguageModal.module.css";
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
    nativeName: string;
    iso2: string;
  };
  submitAction: (values: {
    name: string;
    native_name: string;
    iso2: string;
  }) => Promise<void>;
};

export const LanguageModal: FC<Props> = ({
  open,
  toggleAction,
  title,
  confirmLabel,
  loading,
  defaultValues,
  submitAction,
}) => {
  const t = useTranslations("LanguageModal");
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [nativeName, setNativeName] = useState(defaultValues?.nativeName ?? "");
  const [iso2, setIso2] = useState(defaultValues?.iso2 ?? "");
  const [errors, setErrors] = useState({
    name: "",
    nativeName: "",
    iso2: "",
  });
  const handleSubmit = async () => {
    const nextErrors = {
      name: "",
      nativeName: "",
      iso2: "",
    };
    if (!name.trim()) {
      nextErrors.name = t("validation.nameRequired");
    }
    if (!nativeName.trim()) {
      nextErrors.nativeName = t("validation.nativeNameRequired");
    }
    if (!iso2.trim()) {
      nextErrors.iso2 = t("validation.iso2Required");
    }
    setErrors(nextErrors);
    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      return;
    }
    await submitAction({
      name,
      native_name: nativeName,
      iso2,
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
        <ModalField label={t("name")} active={!!name} error={errors.name}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </ModalField>

        <ModalField
          label={t("nativeName")}
          active={!!nativeName}
          error={errors.nativeName}
        >
          <input
            value={nativeName}
            onChange={(e) => setNativeName(e.target.value)}
            className={styles.input}
          />
        </ModalField>
        <ModalField label={t("iso2")} active={!!iso2} error={errors.iso2}>
          <input
            value={iso2}
            onChange={(e) => setIso2(e.target.value)}
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
