"use client";

import { Icon } from "@/shared/ui/Icon/Icon";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import styles from "./SearchToolbar.module.css";
import { useTranslations } from "next-intl";

type Props = {
  value: string;
  changeAction: (value: string) => void;
  placeholder?: string;
  buttonLabel?: string;
  createAction?: () => void;
  className?: string;
};

export const SearchToolbar = ({
  value,
  changeAction,
  placeholder,
  buttonLabel,
  createAction,
  className,
}: Props) => {
  const t = useTranslations("SearchToolbar");
  return (
    <div className={className || styles.container}>
      <div className={styles.search}>
        <Icon name="search" size={18} className={styles.icon} />
        <input
          value={value}
          onChange={(e) => changeAction(e.target.value)}
          placeholder={placeholder || t("search")}
          className={styles.input}
          data-testid="search-input"
        />
      </div>
      {buttonLabel && createAction && (
        <AddNewButton onClick={createAction} label={buttonLabel} />
      )}
    </div>
  );
};
