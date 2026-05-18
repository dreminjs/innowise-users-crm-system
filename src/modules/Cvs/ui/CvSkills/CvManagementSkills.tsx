"use client";

import { useState } from "react";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useCvSkillStore } from "../../model/cv-skill.store";
import { CvRemoveSkillsButton } from "./CvRemoveSkillsButton";
import { AddCvSkillModal } from "./modals/AddCvSkillModal";
import styles from "@/modules/Skills/ui/Skills.module.css";
import { useTranslations } from "next-intl";

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
  const t = useTranslations();

  return (
    <>
      <div className={styles.menagementSkills}>
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
