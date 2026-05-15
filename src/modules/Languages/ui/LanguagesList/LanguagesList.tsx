import { FC, useState } from "react";
import styles from "../Languages.module.css";
import { LanguagesItem } from "./LanguagesItem";
import { GetProfileLanguagesQuery } from "@/graphql/graphql";
import { Proficiency } from "@/generated/graphql";
import { useLanguageStore } from "../../model/language.store";
interface ILanguagesListProps {
  languagesData: GetProfileLanguagesQuery;
  isAvailableToChange: boolean;
}

export const LanguagesList: FC<ILanguagesListProps> = ({
  languagesData,
  isAvailableToChange,
}) => {
  const { isDeleteMode, addDeleteLanguage, deleteLanguages } =
    useLanguageStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleClick = (name: string) => {
    console.log(name);
    if (isDeleteMode) {
      addDeleteLanguage(name);
    } else {
      setIsEditModalOpen((prev) => !prev);
    }
  };

  return (
    <ul className={styles.languagesList}>
      {languagesData.profile.languages.map((el) => (
        <LanguagesItem
          key={el.name}
          name={el.name}
          proficiency={el.proficiency as Proficiency}
          isAvailableToChange={isAvailableToChange}
          isActive={Boolean(deleteLanguages[el.name])}
          onClick={handleClick}
          isEditModalOpen={isEditModalOpen}
        />
      ))}
    </ul>
  );
};
