"use client";

import Image from "next/image";
import styles from "./UsersSearch.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";

type Props = {
  value: string;
  changeAction: (value: string) => void;
};

export const UsersSearch = ({ value, changeAction }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Icon name="search" size={18} className={styles.icon} />
        <input
          className={styles.input}
          type="text"
          placeholder="Search users..."
          value={value}
          onChange={(event) => changeAction(event.target.value)}
        />
      </div>
    </div>
  );
};
