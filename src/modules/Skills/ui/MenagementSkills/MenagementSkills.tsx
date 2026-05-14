import { FC, useState } from "react";
import { AddSkillModal } from "./AddSkillModal/AddSkillModal";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useSkillStore } from "../../model/skill.store";
import { RemoveSkillsButton } from "./RemoveSkillsButton";
import styles from "../Skills.module.css";
import { useTranslations } from "next-intl";

interface IMenuagementSkillsProps {
  isAvailableToDelete: boolean;
}

export const MenagementSkills: FC<IMenuagementSkillsProps> = ({
  isAvailableToDelete,
}) => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useSkillStore();
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
            {<RemoveSkillsButton />}
          </>
        ) : (
          <>
            <AddNewButton
              onClick={() => setIsSkillModalOpen(true)}
              label={t("Skills.addSkill")}
            />
            {isAvailableToDelete && (
              <RemoveItemButton
                onClick={() => toggleDeleteMode()}
                label={t("Skills.deleteSkill")}
              />
            )}
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
