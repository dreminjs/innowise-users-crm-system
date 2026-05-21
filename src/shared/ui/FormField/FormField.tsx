"use client";

import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./FormField.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";
type TInputType = "password" | "email" | "text";
type TExcludeEmail<T> = T extends "email" ? "text" : T;
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { useTheme } from "next-themes";
interface IFormFieldProps<T extends FieldValues> {
  type: TInputType;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  label: string;
  isAvailable?: boolean;
}

export const FormField = <T extends FieldValues>({
  type,
  error,
  label,
  register,
  name,
  isAvailable = true,
}: IFormFieldProps<T>) => {
  const [inputType, setInputType] = useState<"text" | "password">(
    type === "password" ? "password" : "text",
  );
  return (
    <>
      <div className={styles.formField}>
        <div className={styles.formFieldInner}>
          <input
            disabled={!isAvailable}
            {...register(name)}
            placeholder=" "
            className={styles.formInput}
            type={inputType}
          />
          <span className={styles.formLabel}>{label}</span>
          {type === "password" && (
            <button
              type="button"
              className={styles.togglePasswordTypeBtn}
              onClick={() =>
                setInputType((prev) =>
                  prev === "password" ? "text" : "password",
                )
              }
            >
              {inputType === "password" ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          )}
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
