import { FC } from "react";
import { languageLevelColors } from "../../model/languages.constants";
import { EditLanguageModal } from "../EditLanguageModal/EditLanguageModal";
import styles from "../Languages.module.css";
import clsx from "clsx";
import { Proficiency } from "@/generated/graphql";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Languages");
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
            {proficiency === "Native" ? t("Native") : proficiency}
          </span>
          <span>{t(name)}</span>
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
