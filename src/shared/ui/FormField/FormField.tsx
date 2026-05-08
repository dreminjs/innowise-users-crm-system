"use client";
import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import PasswordEye from "../../../../public/password-eye.svg";
import styles from "./AuthForm.module.css";
import Image from "next/image";
type TInputType = "password" | "email";
type TExcludeEmail<T> = T extends "email" ? "text" : T;

interface IFormFieldProps<T extends FieldValues> {
  type: TInputType;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  label: string;
}

export const FormField = <T extends FieldValues>({
  type,
  error,
  label,
  register,
  name,
}: IFormFieldProps<T>) => {
  const [inputType, setInputType] = useState<TExcludeEmail<TInputType>>(
    type === "email" ? "text" : type,
  );

  // const { theme } = useTheme();

  return (
    <div className={styles.formField}>
      <div className={styles.formFieldInner}>
        <input
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
            <Image height={20} width={20} alt="pass" src={PasswordEye} />
          </button>
        )}
      </div>
      {error && <span>{error}</span>}
    </div>
  );
};
