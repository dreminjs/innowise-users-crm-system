import { FC } from "react";
import { AddSkillForm } from "./AddSkillForm";
import { useTranslations } from "next-intl";
import { FormModal } from "@/shared/ui/FormModal";

interface IAddSkillModalProps {
  open: boolean;
  onToggle: () => void;
  userId: string;
}

export const AddSkillModal: FC<IAddSkillModalProps> = ({
  open,
  onToggle,
  userId,
}) => {
  const t = useTranslations("Skills");
  return (
    <FormModal open={open} toggleAction={onToggle} title={t("addSkill")}>
      <AddSkillForm onToggle={onToggle} userId={userId} />
    </FormModal>
  );
};
