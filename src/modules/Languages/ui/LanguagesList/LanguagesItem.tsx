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
}

export const LanguagesItem: FC<ILanguagesItemProps> = ({
  name,
  proficiency,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { isDeleteMode, addDeleteLanguage, deleteLanguages } =
    useLanguageStore();
  return (
    <>
      <li>
        <button
          onClick={() =>
            isDeleteMode
              ? addDeleteLanguage(name)
              : setIsEditModalOpen((prev) => !prev)
          }
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
