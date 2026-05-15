"use client";

import { Icon } from "@/shared/ui/Icon/Icon";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import styles from "./SearchToolbar.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  buttonLabel?: string;
  onCreate?: () => void;
  className?: string;
};

export const SearchToolbar = ({
  value,
  onChange,
  placeholder = "Search",
  buttonLabel,
  onCreate,
  className,
}: Props) => {
  return (
    <div className={className || styles.container}>
      <div className={styles.search}>
        <Icon name="search" size={18} className={styles.icon} />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={styles.input}
        />
      </div>
      {buttonLabel && onCreate && (
        <AddNewButton onClick={onCreate} label={buttonLabel} />
      )}
    </div>
  );
};
