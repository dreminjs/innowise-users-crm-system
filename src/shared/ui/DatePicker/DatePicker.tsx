"use client";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css";

type Props = {
  label: string;
  value: string;
  changeAction: (value: string) => void;
};

export const DatePicker = ({ value, changeAction }: Props) => {
  return (
    <ReactDatePicker
      selected={value ? new Date(value) : null}
      onChange={(date: Date | null) => {
        if (!date) {
          changeAction("");
          return;
        }
        const formatted = date.toISOString().split("T")[0];
        changeAction(formatted);
      }}
      dateFormat="yyyy-MM-dd"
      className={styles.input}
      calendarClassName={styles.calendar}
    />
  );
};
