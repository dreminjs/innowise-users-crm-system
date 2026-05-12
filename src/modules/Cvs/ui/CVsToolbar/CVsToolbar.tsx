"use client";

import Image from "next/image";
import { AddNewButton } from "@/shared/ui/AddNewButton";
import styles from "./CVsToolbar.module.css";

type Props = {
  value: string;
  changeAction: (value: string) => void;
  createAction: () => void;
};

export const CVsToolbar = ({ value, changeAction, createAction }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Image src="/search.svg" alt="Search" width={16} height={16} />
        <input
          value={value}
          onChange={(e) => changeAction(e.target.value)}
          placeholder="Search"
          className={styles.input}
        />
      </div>
      <AddNewButton onClick={createAction} label="ADD CV" />
    </div>
  );
};
