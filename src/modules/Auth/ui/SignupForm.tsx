"use client";

import { useAuthForm } from "../model/hooks/useAuthForm";
import { AuthButtons } from "./AuthButtons";
import { AuthFormLayout } from "./AuthFormLayout";
import { useSignup } from "../model/hooks/useSignup";
import { FormField } from "@/shared/ui/FormField";
import { TAuthFormData } from "../model/auth.types";
import styles from "./AuthForm.module.css";
import { useTranslations } from "next-intl";
export const SignupForm = () => {
  const { register, handleSubmit, errors } = useAuthForm();

  const { onSubmit, loading } = useSignup();
  const t = useTranslations("Signup");

  return (
    <AuthFormLayout title={t("title")} subtitle={t("subtitle")}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        <div className={styles.authFormFields}>
          <FormField<TAuthFormData>
            type="email"
            register={register}
            error={errors.email?.message}
            label={t("email")}
            name={"email"}
          />
          <FormField<TAuthFormData>
            type="password"
            register={register}
            error={errors.password?.message}
            label={t("password")}
            name={"password"}
          />
        </div>
        <AuthButtons
          submitLabel={t("submitLabel")}
          linkLabel={t("linkLabel")}
          linkUrl="signin"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
