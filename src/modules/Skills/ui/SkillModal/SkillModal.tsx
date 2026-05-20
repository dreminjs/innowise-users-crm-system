"use client";

import { FC, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { GetSkillCategoriesQuery } from "@/graphql/graphql";
import { GET_SKILL_CATEGORIES } from "@/modules/Skills/api/queries";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import { CustomSelect } from "@/shared/ui/CustomSelect/CustomSelect";

import styles from "./SkillModal.module.css";
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
    categoryId: string;
  };

  submitAction: (values: {
    name: string;
    categoryId: string | null;
  }) => Promise<void>;
};
export const SkillModal: FC<Props> = ({
  open,
  toggleAction,
  title,
  confirmLabel,
  loading,
  defaultValues,
  submitAction,
}) => {
  const t = useTranslations("SkillModal");
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [categoryId, setCategoryId] = useState<string | null>(
    defaultValues?.categoryId ?? null,
  );
  const [error, setError] = useState("");
  const { data } = useQuery<GetSkillCategoriesQuery>(GET_SKILL_CATEGORIES);
  const categoryOptions = useMemo(() => {
    return (
      data?.skillCategories.map((category) => ({
        label: category.name,
        value: category.id,
      })) ?? []
    );
  }, [data]);
  const handleSubmit = async () => {
    if (!name.trim()) {
      setError(t("validation.nameRequired"));
      return;
    }
    setError("");
    await submitAction({
      name,
      categoryId,
    });
    toggleAction();
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
        <CustomSelect
          label={t("category")}
          options={categoryOptions}
          value={categoryId}
          onChange={setCategoryId}
        />
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
