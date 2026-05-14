"use client";

import Image from "next/image";
import styles from "./ProjectsSearch.module.css";
import { AddNewButton } from "@/shared/ui/AddNewButton";

type Props = {
  value: string;
  onChange: (value: string) => void;
  createAction: () => void;
};

export const ProjectsSearch = ({ value, onChange, createAction }: Props) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.search}>
        <Image src="/search.svg" alt="Search" width={16} height={16} />
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
