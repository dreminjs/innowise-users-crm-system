"use client";

import { useAuthForm } from "../model/hooks/useAuthForm";
import { AuthButtons } from "./AuthButtons";
import { AuthFormLayout } from "./AuthFormLayout";
import { useSignin } from "../model/hooks/useSignin";
import { FormField } from "@/shared/ui/FormField";
import { TAuthFormData } from "../model/auth.types";
import { useTranslations } from "next-intl";
import styles from "./AuthForm.module.css";
export const SigninForm = () => {
  const { register, handleSubmit, errors } = useAuthForm();

  const { onSubmit, loading } = useSignin();
  const t = useTranslations("Login");
  return (
    <AuthFormLayout title={t("title")} subtitle={t("subtitle")}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.authFormFields}>
          <FormField<TAuthFormData>
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            label={t("email")}
          />
          <FormField<TAuthFormData>
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
            label={t("password")}
          />
        </div>
        <AuthButtons
          submitLabel={t("submitLabel")}
          linkLabel={t("forgotPassword")}
          linkUrl="forgot-password"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
