"use client";

import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "./FormField.module.css";
import { Icon } from "@/shared/ui/Icon/Icon";
type TInputType = "password" | "email" | "text";

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
            onClick={() =>
              setInputType((prev) =>
                prev === "password" ? "text" : "password",
              )
            }
          >
            <Icon name="password" size={20} />
          </button>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
