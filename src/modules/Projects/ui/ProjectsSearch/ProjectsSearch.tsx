"use client";

import Image from "next/image";
import styles from "./ProjectsSearch.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const ProjectsSearch = ({ value, onChange }: Props) => {
  return (
    <div className={styles.search}>
      <Image src="/search.svg" alt="Search" width={16} height={16} />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className={styles.input}
      />
    </div>
  );
};
