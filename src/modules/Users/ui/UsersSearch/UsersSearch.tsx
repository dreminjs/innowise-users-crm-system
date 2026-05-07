"use client";

import styles from "./UsersSearch.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const UsersSearch = ({ value, onChange }: Props) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search users..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};
