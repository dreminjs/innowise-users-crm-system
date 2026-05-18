import { FC } from "react";
import { AddSkillForm } from "./AddSkillForm";
import { useTranslations } from "next-intl";
import { FormModal } from "@/shared/ui/FormModal";

interface IAddSkillModalProps {
  open: boolean;
  onToggle: () => void;
}

export const AddSkillModal: FC<IAddSkillModalProps> = ({ open, onToggle }) => {
  const t = useTranslations("Skills");
  return (
    <FormModal open={open} toggleAction={onToggle} title={t("addSkill")}>
      <AddSkillForm onToggle={onToggle} />
    </FormModal>
  );
};
