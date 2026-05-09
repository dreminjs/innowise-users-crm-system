import { useState } from "react";
import styles from "../Skills.module.css";
import { AddSkillModal } from "./AddSkillModal/AddSkillModal";
import { AddNewButton } from "@/shared/ui/AddNewButton";

export const MenagementSkills = () => {
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  return (
    <>
      <div className={styles.menagementSkills}>
        <AddNewButton
          onClick={() => setIsSkillModalOpen(true)}
          label={"ADD SKILL"}
        />
      </div>

      <AddSkillModal
        open={isSkillModalOpen}
        onToggle={() => setIsSkillModalOpen((prev) => !prev)}
      />
    </>
  );
};
