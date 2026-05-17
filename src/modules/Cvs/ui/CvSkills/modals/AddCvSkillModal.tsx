"use client";

import { FormModal } from "@/shared/ui/FormModal";
import { AddCvSkillForm } from "../forms/AddCvSkillForm";

type Props = {
  cvId: string;
  open: boolean;
  toggleAction: () => void;
};

export const AddCvSkillModal = ({ cvId, open, toggleAction }: Props) => {
  return (
    <FormModal open={open} toggleAction={toggleAction} title={"Add Skill"}>
      <AddCvSkillForm cvId={cvId} toggleAction={toggleAction} />
    </FormModal>
  );
};
