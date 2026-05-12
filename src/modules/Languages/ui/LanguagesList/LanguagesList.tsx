import { FC } from "react";
import { LanguagesItem } from "./LanguagesItem";
import { GetProfileLanguagesQuery } from "@/graphql/graphql";
import styles from "../Languages.module.css";
import { Empty } from "@/shared/ui/Empty";
interface ILanguagesListProps {
  languagesData: GetProfileLanguagesQuery;
  isAvailableToChange: boolean;
}

export const LanguagesList: FC<ILanguagesListProps> = ({
  languagesData,
  isAvailableToChange,
}) => {
  return (
    <ul className={styles.languagesList}>
      {languagesData.profile.languages.map((el) => (
        <LanguagesItem
          key={el.name}
          name={el.name}
          proficiency={el.proficiency}
          isAvailableToChange={isAvailableToChange}
        />
      ))}
    </ul>
  );
};
