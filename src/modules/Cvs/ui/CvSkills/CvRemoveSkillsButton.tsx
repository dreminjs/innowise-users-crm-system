"use client";

import { useCvSkillStore } from "../../model/cv-skill.store";
import styles from "@/modules/Skills/ui/Skills.module.css";
import { useDeleteCvSkill } from "@/modules/Cvs/hooks/useDeleteCvSkill";

type Props = {
  cvId: string;
};

export const CvRemoveSkillsButton = ({ cvId }: Props) => {
  const { deleteSkills, clearSkills, toggleDeleteMode } = useCvSkillStore();
  const [deleteCvSkill, { loading }] = useDeleteCvSkill(cvId);
  const handleDelete = async () => {
    try {
      await deleteCvSkill({
        variables: {
          skill: {
            cvId,
            name: Object.keys(deleteSkills),
          },
        },
      });

      clearSkills();
      toggleDeleteMode();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handleDelete}
      className={styles.removeSkillsButton}
    >
      <span className={styles.deleteConfirmButtonAmount}>
        {Object.keys(deleteSkills).length}
      </span>
      <span>{loading ? "Loading..." : "DELETE"}</span>
    </button>
  );
};
