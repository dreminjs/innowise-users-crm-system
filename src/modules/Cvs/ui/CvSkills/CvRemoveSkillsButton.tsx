"use client";

import { useTranslations } from "next-intl";
import { useCvSkillStore } from "../../model/cv-skill.store";
import { useDeleteCvSkill } from "@/modules/Cvs/hooks/useDeleteCvSkill";
import styles from "./CvRemoveSkillsButton.module.css";
type Props = {
  cvId: string;
};

export const CvRemoveSkillsButton = ({ cvId }: Props) => {
  const t = useTranslations("Skills");
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
      className={styles.removeButton}
    >
      <span className={styles.amount}>{Object.keys(deleteSkills).length}</span>
      <span>{loading ? t("loading") : t("deleteSkill")}</span>
    </button>
  );
};
