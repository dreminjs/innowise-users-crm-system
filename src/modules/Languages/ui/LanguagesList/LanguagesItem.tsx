import { FC, useState } from "react";
import { languageLevelColors } from "../../model/languages.constants";
import { EditLanguageModal } from "../EditLanguageModal/EditLanguageModal";
import { useLanguageStore } from "../../model/language.store";
import styles from "../Languages.module.css";
import clsx from "clsx";
import { Proficiency } from "@/generated/graphql";

interface ILanguagesItemProps {
  name: string;
  proficiency: Proficiency;
  isAvailableToChange: boolean;
}

export const LanguagesItem: FC<ILanguagesItemProps> = ({
  name,
  proficiency,
  isAvailableToChange,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isDeleteMode, addDeleteLanguage, deleteLanguages } =
    useLanguageStore();
  const handleClick = () => {
    if (isDeleteMode) {
      addDeleteLanguage(name);
    } else {
      setIsEditModalOpen((prev) => !prev);
    }
  };
  return (
    <>
      <li>
        <button
          {...(isAvailableToChange ? { onClick: handleClick } : {})}
          className={clsx(
            styles.languagesItem,
            deleteLanguages[name] && styles.languagesItemActive,
          )}
        >
          <span style={{ color: languageLevelColors[proficiency] }}>
            {proficiency}
          </span>
          <span>{name}</span>
        </button>
      </li>
      <EditLanguageModal
        open={isEditModalOpen}
        toggleAction={() => setIsEditModalOpen((prev) => !prev)}
        name={name}
        proficiency={proficiency}
      />
    </>
  );
};
