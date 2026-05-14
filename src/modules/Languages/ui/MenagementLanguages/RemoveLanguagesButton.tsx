import { useTranslations } from "next-intl";
import { useDeleteProfileLanguages } from "../../model/hooks/useDeleteProfileLanguages";
import { useLanguageStore } from "../../model/language.store";
import styles from "../Languages.module.css";

export const RemoveLanguagesButton = () => {
  const { deleteLanguages } = useLanguageStore();

  const { handleDeleteProfileLanguages, loading } = useDeleteProfileLanguages();
  const t = useTranslations("ConfirmButtons");

  if (Object.keys(deleteLanguages).length !== 0) {
    return (
      <button
        disabled={loading}
        onClick={handleDeleteProfileLanguages}
        className={styles.removeLanguagesButton}
      >
        <span className={styles.deleteConfirmButtonAmount}>
          {Object.keys(deleteLanguages).length}
        </span>
        <span>{loading ? "Loading..." : t("delete")}</span>
      </button>
    );
  }
  return null;
};
