import { useTranslations } from "next-intl";
import styles from "./Skills.module.css";
export const SkillsHeaderTable = () => {
  const t = useTranslations("Skills");
  return (
    <thead className={styles.header}>
      <tr>
        <th className={styles.nameColumn}>{t("Name")}</th>
        <th className={styles.typeColumn}>{t("Type")}</th>
        <th className={styles.categoryColumn}>{t("Category")}</th>
      </tr>
    </thead>
  );
};
