import { GetCvQuery } from "@/graphql/graphql";
import styles from "./PreviewLanguages.module.css";
import { AppMessages } from "@/shared/lib/getMessages";

type Props = {
  languages: GetCvQuery["cv"]["languages"];
  messages: AppMessages;
};

export const PreviewLanguages = ({ languages, messages }: Props) => {
  return (
    <section>
      <h2 className={`${styles.title} preview-title`}>
        {messages.Preview.languages}
      </h2>
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
