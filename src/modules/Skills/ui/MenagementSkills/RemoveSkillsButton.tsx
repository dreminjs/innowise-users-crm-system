import { useTranslations } from "next-intl";
import { useDeleteProfileSkills } from "../../model/hooks/useDeleteProfileSkills";
import { useSkillStore } from "../../model/skill.store";
import styles from "../UsersSkill/Skills.module.css";

export const RemoveSkillsButton = () => {
  const { deleteSkills } = useSkillStore();
  const { handleDeleteProfileSkills, loading } = useDeleteProfileSkills();
  const t = useTranslations("ConfirmButtons");
  if (Object.keys(deleteSkills).length !== 0) {
    return (
      <button
        disabled={loading || Object.keys(deleteSkills).length === 0}
        onClick={handleDeleteProfileSkills}
        className={styles.removeSkillsButton}
        data-testid="remove-skill-button"
      >
        <span className={styles.deleteConfirmButtonAmount}>
          {Object.keys(deleteSkills).length}
        </span>
        <span>{loading ? "Loading..." : t("delete")}</span>
      </button>
    );
  }
  return null;
};
