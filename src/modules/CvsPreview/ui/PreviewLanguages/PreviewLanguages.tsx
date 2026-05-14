import { GetCvQuery } from "@/graphql/graphql";
import styles from "./PreviewLanguages.module.css";

type Props = {
  languages: GetCvQuery["cv"]["languages"];
};

export const PreviewLanguages = ({ languages }: Props) => {
  return (
    <section>
      <h2 className={styles.title}>Languages</h2>
      <ul className={styles.list}>
        {languages.map((language) => (
          <li key={language.name} className={styles.item}>
            <div className={styles.languageInfo}>
              <strong>{language.name}</strong>
              <span>{language.proficiency}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
