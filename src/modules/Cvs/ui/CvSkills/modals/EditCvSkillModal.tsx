"use client";

import { FC } from "react";
import { Mastery } from "@/generated/graphql";
import { EditCvSkillForm } from "../forms/EditCvSkillForm";
import { FormModal } from "@/shared/ui/FormModal/ui/FormModal";
import { useTranslations } from "next-intl";

type Props = {
  cvId: string;
  open: boolean;
  toggleAction: () => void;
  categoryId: string | null;
  mastery: Mastery;
};

export const EditCvSkillModal: FC<Props> = ({
  cvId,
  open,
  toggleAction,
  categoryId,
  mastery,
}) => {
  const t = useTranslations("Skills");
  return (
    <FormModal open={open} toggleAction={toggleAction} title={t("editSkill")}>
      {categoryId && (
        <EditCvSkillForm
          cvId={cvId}
          toggleAction={toggleAction}
          categoryId={categoryId}
          mastery={mastery}
        />
      )}
    </FormModal>
  );
};
