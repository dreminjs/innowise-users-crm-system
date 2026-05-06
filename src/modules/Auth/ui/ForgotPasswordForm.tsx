import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterOptions,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { forgotPasswordSchema } from "../model/auth.schema";
import { TForgotPasswordFormData } from "../model/auth.types";
import { useForgotPassword } from "../model/hooks/useForgotPassword";
import { AuthFormLayout } from "./AuthFormLayout";
import { AuthFormField } from "./AuthFormField";
import { AuthButtons } from "./AuthButtons";

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { onSubmit, loading } = useForgotPassword();

  return (
    <AuthFormLayout
      title={"ЗАБЫЛИ ПАРОЛЬ"}
      subtitle={"Мы отправили вам инструкции по сбросу пароля"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AuthFormField<TForgotPasswordFormData>
          type={"email"}
          register={register}
          name={"email"}
          label={"Почта"}
          error={errors.email?.message}
        />
        <AuthButtons
          submitLabel="СБРОСИТЬ ПАРОЛЬ"
          linkLabel="ОТМЕНА"
          linkUrl="/auth/signin"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
