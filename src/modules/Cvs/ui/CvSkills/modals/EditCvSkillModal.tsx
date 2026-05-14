"use client";

import { FC } from "react";
import { Mastery } from "@/generated/graphql";
import { AddItemModal } from "@/shared/ui/AddItemModal";
import { EditCvSkillForm } from "./EditCvSkillForm";

type Props = {
  cvId: string;
  open: boolean;
  onToggle: () => void;
  categoryId: string | null;
  mastery: Mastery;
};

export const EditCvSkillModal: FC<Props> = ({
  cvId,
  open,
  onToggle,
  categoryId,
  mastery,
}) => {
  return (
    <AddItemModal open={open} toggleAction={onToggle} title={"Edit Skill"}>
      {categoryId && (
        <EditCvSkillForm
          cvId={cvId}
          onToggle={onToggle}
          categoryId={categoryId}
          mastery={mastery}
        />
      )}
    </AddItemModal>
  );
};
