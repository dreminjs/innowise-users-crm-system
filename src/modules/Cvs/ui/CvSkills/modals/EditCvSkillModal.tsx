"use client";

import { FC } from "react";
import { Mastery } from "@/generated/graphql";
import { AddItemModal } from "@/shared/ui/AddItemModal";
import { EditCvSkillForm } from "./EditCvSkillForm";

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
  return (
    <AddItemModal open={open} toggleAction={toggleAction} title={"Edit Skill"}>
      {categoryId && (
        <EditCvSkillForm
          cvId={cvId}
          toggleAction={toggleAction}
          categoryId={categoryId}
          mastery={mastery}
        />
      )}
    </AddItemModal>
  );
};
