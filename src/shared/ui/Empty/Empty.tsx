import { useTranslations } from "next-intl";
import styles from "./Empty.module.css";

export const Empty = () => {
  const t = useTranslations();

  return <div className={styles.empty}>{t("empty")}</div>;
};
