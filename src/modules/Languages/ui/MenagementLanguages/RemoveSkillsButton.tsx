import { useDeleteProfileLanguages } from "../../model/hooks/useDeleteProfileLanguages";
import { useLanguageStore } from "../../model/language.store";
import styles from "../Languages.module.css";

export const RemoveLanguagesButton = () => {
  const { deleteLanguages } = useLanguageStore();

  const { handleDeleteProfileLanguages, loading } = useDeleteProfileLanguages();

  return (
    <button
      disabled={loading}
      onClick={handleDeleteProfileLanguages}
      className={styles.removeSkillsButton}
    >
      <span className={styles.deleteConfirmButtonAmount}>
        {Object.keys(deleteLanguages).length}
      </span>
      <span>{loading ? "Loading..." : "DELETE"}</span>
    </button>
  );
};
