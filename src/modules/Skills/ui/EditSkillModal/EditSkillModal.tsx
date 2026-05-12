import { EditSkillForm } from "./EditSkillForm";
import { TSkillForm } from "../../model/skill.interface";
import { FC } from "react";
import { AddItemModal } from "@/shared/ui/AddItemModal";

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
  return (
    <AddItemModal open={open} toggleAction={onToggle} title={"Edit Edit"}>
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
