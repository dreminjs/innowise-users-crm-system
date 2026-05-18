"use client";

import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css";

type Props = {
  label: string;
  value: string;
  changeAction: (value: string) => void;
};

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const CustomInput = forwardRef<HTMLDivElement, CustomInputProps>(
  ({ value, onClick }, ref) => {
    return (
      <div ref={ref} onClick={onClick} className={styles.trigger}>
        {value || "Select date"}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

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
      calendarClassName={styles.calendar}
      customInput={<CustomInput />}
    />
  );
};
