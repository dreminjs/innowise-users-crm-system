"use client";
import PasswordEye from "../../../../public/password-eye.svg";
import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { TAuthFormData } from "../model/auth.types";
import styles from "./AuthForm.module.css";
import { useTheme } from "next-themes";

type TInputType = "password" | "email";
type TExcludeEmail<T> = T extends "email" ? "text" : T;

interface IAuthFormFieldProps {
  type: TInputType;
  register: UseFormRegister<TAuthFormData>;
  name: keyof TAuthFormData;
  error?: string;
  label: string;
}

export const AuthFormField: FC<IAuthFormFieldProps> = ({
  type,
  error,
  label,
  register,
  name,
}) => {
  const [inputType, setInputType] = useState<TExcludeEmail<TInputType>>(
    type === "email" ? "text" : type,
  );

  const { theme } = useTheme();

  return (
    <div className={styles.authFormField}>
      <div className={styles.authFormFieldInner}>
        <input
          {...register(name)}
          placeholder=" "
          className={styles.authFormInput}
          type={inputType}
        />
        <span className={styles.authFormLabel}>{label}</span>
        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setInputType((prev) =>
                prev === "password" ? "text" : "password",
              )
            }
          >
            <PasswordEye className={styles.passwordEye} />
          </button>
        )}
      </div>
      {error && <span>{error}</span>}
    </div>
  );
};
