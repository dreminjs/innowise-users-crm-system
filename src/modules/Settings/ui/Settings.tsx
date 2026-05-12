import { Appearance } from "./Appearance";
import { Language } from "./Language";
import { ResumeLanguage } from "./ResumeLanguage";
import styles from "./Settings.module.css";

export const Settings = () => {
  return (
    <div className={styles.settings}>
      <Appearance />
      <Language />
      <ResumeLanguage />
    </div>
  );
};
