"use client";

import { AddItemModal } from "@/shared/ui/AddItemModal";

import { AddCvSkillForm } from "../forms/AddCvSkillForm";

type Props = {
  cvId: string;
  open: boolean;
  toggleAction: () => void;
};

export const AddCvSkillModal = ({ cvId, open, toggleAction }: Props) => {
  return (
    <AddItemModal open={open} toggleAction={toggleAction} title={"Add Skill"}>
      <AddCvSkillForm cvId={cvId} toggleAction={toggleAction} />
    </AddItemModal>
  );
};
