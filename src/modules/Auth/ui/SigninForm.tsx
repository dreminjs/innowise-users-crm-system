"use client";

import { useAuthForm } from "../model/hooks/useAuthForm";
import { AuthButtons } from "./AuthButtons";
import { AuthFormLayout } from "./AuthFormLayout";
import styles from "./AuthForm.module.css";
import { useSignin } from "../model/hooks/useSignin";
import { FormField } from "@/shared/ui/FormField";
import { TAuthFormData } from "../model/auth.types";
export const SigninForm = () => {
  const { register, handleSubmit, errors } = useAuthForm();

  const { onSubmit, loading } = useSignin();

  return (
    <AuthFormLayout
      title="С возвращением"
      subtitle="Рады вас видеть! Войдите, чтобы продолжить"
    >
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.authFormFields}>
          <FormField<TAuthFormData>
            name="email"
            type="email"
            register={register}
            error={errors.email?.message}
            label={"Почта"}
          />
          <FormField<TAuthFormData>
            name="password"
            type="password"
            register={register}
            error={errors.password?.message}
            label={"Пароль"}
          />
        </div>
        <AuthButtons
          submitLabel="ВОЙТИ"
          linkLabel="ЗАБЫЛИ ПАРОЛЬ"
          linkUrl="forgot-password"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
