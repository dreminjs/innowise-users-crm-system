"use client";
import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import PasswordEye from "../../../../public/password-eye.svg";
import Image from "next/image";
import styles from "./FormField.module.css";
import clsx from "clsx";
import { Icon } from "@/shared/ui/Icon/Icon";
type TInputType = "password" | "email" | "text";
type TExcludeEmail<T> = T extends "email" ? "text" : T;

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
  const [inputType, setInputType] = useState<TExcludeEmail<TInputType>>(
    type === "email" ? "text" : type,
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
    </>
  );
};
