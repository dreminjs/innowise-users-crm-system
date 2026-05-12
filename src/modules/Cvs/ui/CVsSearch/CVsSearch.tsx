"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDebounce } from "@/shared/hooks/useDebounce";
import styles from "./CVsSearch.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const CVsSearch = ({ value, onChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue);
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);
  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <Image src="/search.svg" alt="Search" width={20} height={20} />
        <input
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder="Search"
          className={styles.input}
        />
      </div>
      <button className={styles.createButton}>+ Create CV</button>
    </div>
  );
};
