"use client";

import { useState } from "react";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useCvSkillStore } from "../../model/cv-skill.store";
import { CvRemoveSkillsButton } from "./CvRemoveSkillsButton";
import { AddCvSkillModal } from "./modals/AddCvSkillModal";
import styles from "@/modules/Skills/ui/Skills.module.css";

type Props = {
  cvId: string;
};

export const CvManagementSkills = ({ cvId }: Props) => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useCvSkillStore();
  const handleOpenModal = () => {
    setIsSkillModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSkillModalOpen(false);
  };

  return (
    <>
      <div className={styles.menagementSkills}>
        {isDeleteMode ? (
          <>
            <button
              className={styles.cancelDeleteButton}
              onClick={() => toggleDeleteMode()}
            >
              CANCEL
            </button>
            <CvRemoveSkillsButton cvId={cvId} />
          </>
        ) : (
          <>
            <AddNewButton onClick={handleOpenModal} label={"ADD SKILL"} />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={"REMOVE SKILLS"}
            />
          </>
        )}
      </div>
      <AddCvSkillModal
        cvId={cvId}
        open={isSkillModalOpen}
        toggleAction={handleCloseModal}
      />
    </>
  );
};
