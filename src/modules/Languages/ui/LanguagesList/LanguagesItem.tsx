import { FC } from "react";
import { languageLevelColors } from "../../model/languages.constants";

import styles from "../Languages.module.css";
import clsx from "clsx";
import { Proficiency } from "@/generated/graphql";
import { useTranslations } from "next-intl";
import { TLanguageForm } from "../../model/languages.interface";

interface ILanguagesItemProps {
  name: string;
  proficiency: Proficiency;
  isAvailableToChange: boolean;
  onClick?: (dto: TLanguageForm) => void;
  isActive: boolean;
}

export const LanguagesItem: FC<ILanguagesItemProps> = ({
  name,
  proficiency,
  isAvailableToChange,
  isActive,
  onClick,
}) => {
  const t = useTranslations("Languages");
  return (
    <>
      <li>
        <button
          data-testid="languages-item"
          {...(isAvailableToChange && onClick
            ? { onClick: onClick.bind(null, { name, proficiency }) }
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
    </>
  );
};
