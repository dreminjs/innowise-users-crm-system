import { useDeleteProfileSkills } from "../../model/hooks/useDeleteProfileSkills";
import { useSkillStore } from "../../model/skill.store";
import styles from "../Skills.module.css";

export const RemoveSkillsButton = () => {
  const { deleteSkills } = useSkillStore();

  const { handleDeleteProfileSkills, loading } = useDeleteProfileSkills();

  return (
    <button
      disabled={loading}
      onClick={handleDeleteProfileSkills}
      className={styles.removeSkillsButton}
    >
      <span className={styles.deleteConfirmButtonAmount}>
        {Object.keys(deleteSkills).length}
      </span>
      <span>{loading ? "Loading..." : "DELETE"}</span>
    </button>
  );
};
