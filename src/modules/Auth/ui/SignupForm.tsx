"use client";

import { useAuthForm } from "../model/hooks/useAuthForm";
import { AuthButtons } from "./AuthButtons";
import { AuthFormField } from "./AuthFormField";
import { AuthFormLayout } from "./AuthFormLayout";
import styles from "./AuthForm.module.css";
import { useSignup } from "../model/hooks/useSignup";
export const SignupForm = () => {
  const { register, handleSubmit, errors } = useAuthForm();

  const { onSubmit, loading } = useSignup();

  return (
    <AuthFormLayout
      title="Зарегистрируйтесь"
      subtitle="Добро пожаловать! Создайте аккаунт, чтобы продолжить"
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
        <div className={styles.authFormFields}>
          <AuthFormField
            type="email"
            register={register}
            error={errors.email?.message}
            label={"Почта"}
            name={"email"}
          />
          <AuthFormField
            type="password"
            register={register}
            error={errors.password?.message}
            label={"Пароль"}
            name={"password"}
          />
        </div>
        <AuthButtons
          submitLabel="СОЗДАТЬ АККАУНТ"
          linkLabel="У МЕНЯ ЕСТЬ АККАУНТ"
          linkUrl="signin"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
