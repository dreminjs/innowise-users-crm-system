"use client";

import { useAuthForm } from "../model/hooks/useAuthForm";
import { AuthButtons } from "./AuthButtons";
import { AuthFormField } from "./AuthFormField";
import { AuthFormLayout } from "./AuthFormLayout";
import styles from "./AuthForm.module.css";
export const SignupForm = () => {
  const { register, handleSubmit, errors } = useAuthForm();

  return (
    <AuthFormLayout
      title="Зарегистрируйтесь"
      subtitle="Добро пожаловать! Создайте аккаунт, чтобы продолжить"
    >
      <form className={styles.authForm}>
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
        />
      </form>
    </AuthFormLayout>
  );
};
