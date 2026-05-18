import { useTranslations } from "next-intl";
import { Appearance } from "./Appearance";
import { Language } from "./Language";
import { ResumeLanguage } from "./ResumeLanguage";
import styles from "./Settings.module.css";

export const Settings = () => {
  const t = useTranslations("Settings");
  return (
    <div className={styles.settings}>
      <Appearance label={t("appearance")} />
      <Language label={t("language")} />
      <ResumeLanguage label={t("resumeLanguage")} />
    </div>
  );
};
