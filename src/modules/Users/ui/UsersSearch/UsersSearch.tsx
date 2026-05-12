"use client";

import Image from "next/image";
import styles from "./UsersSearch.module.css";

type Props = {
  value: string;
  changeAction: (value: string) => void;
};

export const UsersSearch = ({ value, changeAction }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.search}>
        <Image
          src="/search.svg"
          alt="Search"
          width={18}
          height={18}
          className={styles.icon}
        />
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
