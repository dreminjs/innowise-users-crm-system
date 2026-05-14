import { useState } from "react";
import { AddSkillModal } from "./AddSkillModal/AddSkillModal";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useSkillStore } from "../../model/skill.store";
import { RemoveSkillsButton } from "./RemoveSkillsButton";
import styles from "../Skills.module.css";
import { useTranslations } from "next-intl";

export const MenagementSkills = () => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useSkillStore();
  const t = useTranslations("Skills");
  return (
    <>
      <div className={styles.menagementSkills}>
        {isDeleteMode ? (
          <>
            <button
              className={styles.cancelDeleteButton}
              onClick={() => toggleDeleteMode()}
            >
              {t("cancel")}
            </button>
            <RemoveSkillsButton />
          </>
        ) : (
          <>
            <AddNewButton
              onClick={() => setIsSkillModalOpen(true)}
              label={t("addSkill")}
            />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={t("deleteSkill")}
            />
          </>
        )}
      </div>

      <AddSkillModal
        open={isSkillModalOpen}
        onToggle={() => setIsSkillModalOpen((prev) => !prev)}
      />
    </>
  );
};
