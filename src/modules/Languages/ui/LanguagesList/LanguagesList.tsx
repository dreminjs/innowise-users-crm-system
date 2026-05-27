import { FC, useState } from "react";
import { LanguagesItem } from "./LanguagesItem";
import { GetProfileLanguagesQuery } from "@/graphql/graphql";
import { Proficiency } from "@/generated/graphql";
import { useLanguageStore } from "../../model/language.store";
import { TLanguageForm } from "../../model/languages.interface";
import { EditLanguageModal } from "../EditLanguageModal/EditLanguageModal";
import styles from "../Languages.module.css";
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

  const [languageItem, setLanguageItem] = useState<TLanguageForm | null>(null);
  const handleClick = ({ name, proficiency }: TLanguageForm) => {
    if (isDeleteMode) {
      addDeleteLanguage(name);
    } else {
      setLanguageItem({ name, proficiency });
    }
  };

  return (
    <>
      <ul className={styles.languagesList}>
        {languagesData.profile.languages.map((el) => (
          <LanguagesItem
            key={el.name}
            name={el.name}
            proficiency={el.proficiency as Proficiency}
            isAvailableToChange={isAvailableToChange}
            isActive={Boolean(deleteLanguages[el.name])}
            onClick={handleClick}
          />
        ))}
      </ul>
      {languageItem && (
        <EditLanguageModal
          open={Boolean(languageItem)}
          toggleAction={() => setLanguageItem(null)}
          name={languageItem.name}
          proficiency={languageItem.proficiency}
        />
      )}
    </>
  );
};
