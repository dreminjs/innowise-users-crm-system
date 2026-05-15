"use client";

import Image from "next/image";
import styles from "./ProjectsSearch.module.css";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import { Icon } from "@/shared/ui/Icon/Icon";

type Props = {
  value: string;
  onChange: (value: string) => void;
  createAction: () => void;
};

export const ProjectsSearch = ({ value, onChange, createAction }: Props) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <Icon name="search" size={18} className={styles.icon} />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
          className={styles.input}
        />
      </div>
      <AddNewButton onClick={createAction} label="ADD PROJECT" />
    </div>
  );
};
