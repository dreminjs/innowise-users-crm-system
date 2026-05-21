"use client";

import { FormModal } from "@/shared/ui/FormModal/ui/FormModal";
import { AddCvSkillForm } from "../forms/AddCvSkillForm";
import { useTranslations } from "next-intl";

type Props = {
  cvId: string;
  open: boolean;
  toggleAction: () => void;
};

export const AddCvSkillModal = ({ cvId, open, toggleAction }: Props) => {
  const t = useTranslations("Skills");

  return (
    <FormModal open={open} toggleAction={toggleAction} title={t("addSkill")}>
      <AddCvSkillForm cvId={cvId} toggleAction={toggleAction} />
    </FormModal>
  );
};
