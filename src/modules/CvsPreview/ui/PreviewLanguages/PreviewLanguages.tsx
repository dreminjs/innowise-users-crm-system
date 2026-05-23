"use client";

import { useEffect, useState } from "react";
import { GetCvQuery } from "@/graphql/graphql";
import { translateText } from "@/shared/api/translateText";
import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import styles from "./PreviewLanguages.module.css";

type Props = {
  languages: GetCvQuery["cv"]["languages"];
  // messages: AppMessages;
  messages: any;
};

type TTranslatedLanguage = {
  name: string;
};

const capitalize = (value: string) => {
  if (!value) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const PreviewLanguages = ({ languages, messages }: Props) => {
  const { resumeLanguage } = useSettingsStore();
  const [translatedLanguages, setTranslatedLanguages] = useState<
    Record<string, TTranslatedLanguage>
  >({});
  useEffect(() => {
    const translateLanguages = async () => {
      const entries = await Promise.all(
        languages.map(async (language) => {
          try {
            const name = await translateText(language.name, resumeLanguage);
            return [
              language.name,
              {
                name: capitalize(name),
              },
            ] as const;
          } catch {
            return [
              language.name,
              {
                name: capitalize(language.name),
              },
            ] as const;
          }
        }),
      );
      setTranslatedLanguages(Object.fromEntries(entries));
    };
    translateLanguages();
  }, [languages, resumeLanguage]);
  return (
    <section>
      <h2 className={`${styles.title} preview-title`}>
        {/*{messages.Preview.languages}*/}
      </h2>
      <ul className={styles.list}>
        {languages.map((language) => {
          const translated = translatedLanguages[language.name];
          return (
            <li key={language.name} className={styles.item}>
              <div className={styles.languageInfo}>
                <strong>{translated?.name ?? capitalize(language.name)}</strong>
                <span>{language.proficiency}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
