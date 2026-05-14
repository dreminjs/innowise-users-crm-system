import { FC } from "react";
import styles from "../Languages.module.css";
import { LanguagesItem } from "./LanguagesItem";
import { GetProfileLanguagesQuery } from "@/graphql/graphql";
import { Proficiency } from "@/generated/graphql";
interface ILanguagesListProps {
  languagesData: GetProfileLanguagesQuery;
}

export const LanguagesList: FC<ILanguagesListProps> = ({ languagesData }) => {
  return (
    <ul className={styles.languagesList}>
      {languagesData.profile.languages.map((el) => (
        <LanguagesItem
          key={el.name}
          name={el.name}
          proficiency={el.proficiency as Proficiency}
          isAvailableToChange={false}
        />
      ))}
    </ul>
  );
};
