"use client";

import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css";

type Props = {
  value: string;
  changeAction: (value: string) => void;
  placeholder?: string;
  testId?: string;
};

const CustomInput = forwardRef<
  HTMLButtonElement,
  {
    value?: string;
    onClick?: () => void;
    placeholder?: string;
    testId?: string;
  }
>(({ value, onClick, placeholder, testId }, ref) => {
  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={onClick}
      ref={ref}
      data-testid={testId}
    >
      <span>{value || placeholder}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8 2V5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 2V5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="3"
          y="5"
          width="18"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
});

CustomInput.displayName = "CustomInput";

export const DatePicker = ({
  value,
  changeAction,
  placeholder = "",
  testId,
}: Props) => {
  return (
    <div className={styles.calendarWrapper}>
      <ReactDatePicker
        selected={value ? new Date(value) : null}
        onChange={(date: Date | null) => {
          if (!date) {
            changeAction("");
            return;
          }
          changeAction(date.toISOString().split("T")[0]);
        }}
        dateFormat="yyyy-MM-dd"
        calendarClassName={styles.calendar}
        popperClassName={styles.popper}
        customInput={<CustomInput placeholder={placeholder} testId={testId} />}
      />
    </div>
  );
};
