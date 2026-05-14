import { FC } from "react";
import { languageLevelColors } from "../../model/languages.constants";
import { EditLanguageModal } from "../EditLanguageModal/EditLanguageModal";
import styles from "../Languages.module.css";
import clsx from "clsx";
import { Proficiency } from "@/generated/graphql";

interface ILanguagesItemProps {
  name: string;
  proficiency: Proficiency;
  isAvailableToChange: boolean;
  onClick?: (name: string) => void;
  isActive: boolean;
  isEditModalOpen: boolean;
}

export const LanguagesItem: FC<ILanguagesItemProps> = ({
  name,
  proficiency,
  isAvailableToChange,
  isActive,
  onClick,
  isEditModalOpen,
}) => {
  return (
    <>
      <li>
        <button
          {...(isAvailableToChange && onClick
            ? { onClick: onClick.bind(null, name) }
            : {})}
          className={clsx(
            styles.languagesItem,
            isActive && styles.languagesItemActive,
          )}
        >
          <span style={{ color: languageLevelColors[proficiency] }}>
            {proficiency}
          </span>
          <span>{name}</span>
        </button>
      </li>
      {onClick && (
        <EditLanguageModal
          open={isEditModalOpen}
          toggleAction={onClick.bind(null, name)}
          name={name}
          proficiency={proficiency}
        />
      )}
    </>
  );
};
