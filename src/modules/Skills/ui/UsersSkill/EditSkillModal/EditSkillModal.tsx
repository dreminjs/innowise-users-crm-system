import { EditSkillForm } from "./EditSkillForm";
import { TSkillForm } from "../../../model/skill.interface";
import { FC } from "react";
import { useTranslations } from "next-intl";
import { FormModal } from "@/shared/ui/FormModal";

type TEditSkillModalProps = {
  open: boolean;
  onClose: () => void;
  categoryId: string | null;
} & Omit<TSkillForm, "categoryId">;

export const EditSkillModal: FC<TEditSkillModalProps> = ({
  open,
  onClose,
  categoryId,
  mastery,
}) => {
  const t = useTranslations("Skills");
  return (
    <FormModal open={open} toggleAction={onClose} title={t("editSkill")}>
      {open && categoryId && (
        <EditSkillForm
          onToggle={onClose}
          categoryId={categoryId}
          mastery={mastery}
        />
      )}
    </FormModal>
  );
};
