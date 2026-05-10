import { useState } from "react";
import { AddSkillModal } from "./AddSkillModal/AddSkillModal";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { RemoveItemButton } from "@/shared/ui/RemoveItemButton";
import { useSkillStore } from "../../model/skill.store";
import { RemoveSkillsButton } from "./RemoveSkillsButton";
import styles from "../Skills.module.css";

export const MenagementSkills = () => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const { toggleDeleteMode, isDeleteMode } = useSkillStore();
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
            <RemoveSkillsButton />
          </>
        ) : (
          <>
            <AddNewButton
              onClick={() => setIsSkillModalOpen(true)}
              label={"ADD SKILL"}
            />
            <RemoveItemButton
              onClick={() => toggleDeleteMode()}
              label={"REMOVE SKILLS"}
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
