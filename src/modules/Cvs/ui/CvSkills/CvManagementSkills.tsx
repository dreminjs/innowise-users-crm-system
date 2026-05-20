"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useCvSkillStore } from "../../model/cv-skill.store";
import { CvRemoveSkillsButton } from "./CvRemoveSkillsButton";
import { AddCvSkillModal } from "./modals/AddCvSkillModal";
import styles from "./CvManagementSkills.module.css";
type Props = {
  cvId: string;
};

export const CvManagementSkills = ({ cvId }: Props) => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useCvSkillStore();
  const t = useTranslations();
  const handleOpenModal = () => {
    setIsSkillModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsSkillModalOpen(false);
  };
  return (
    <>
      <div className={styles.managementSkills}>
        {isDeleteMode ? (
          <>
            <button
              className={styles.cancelDeleteButton}
              onClick={() => toggleDeleteMode()}
            >
              {t("ConfirmButtons.cancel")}
            </button>
            <CvRemoveSkillsButton cvId={cvId} />
          </>
        ) : (
          <>
            <AddNewButton
              onClick={handleOpenModal}
              label={t("Skills.addSkill")}
            />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={t("Skills.deleteSkill")}
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
