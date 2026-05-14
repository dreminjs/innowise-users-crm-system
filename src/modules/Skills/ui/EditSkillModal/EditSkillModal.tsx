import { EditSkillForm } from "./EditSkillForm";
import { TSkillForm } from "../../model/skill.interface";
import { FC } from "react";
import { AddItemModal } from "@/shared/ui/AddItemModal";
import { useTranslations } from "next-intl";

type TEditSkillModalProps = {
  open: boolean;
  onToggle: () => void;
  categoryId: string | null;
} & Omit<TSkillForm, "categoryId">;

export const EditSkillModal: FC<TEditSkillModalProps> = ({
  open,
  onToggle,
  categoryId,
  mastery,
}) => {
  const t = useTranslations("Skills");
  return (
    <AddItemModal open={open} toggleAction={onToggle} title={t("editSkill")}>
      {categoryId && (
        <EditSkillForm
          onToggle={onToggle}
          categoryId={categoryId}
          mastery={mastery}
        />
      )}
    </AddItemModal>
  );
};
