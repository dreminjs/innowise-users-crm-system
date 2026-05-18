import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../model/auth.schema";
import { TForgotPasswordFormData } from "../model/auth.types";
import { useForgotPassword } from "../model/hooks/useForgotPassword";
import { AuthFormLayout } from "./AuthFormLayout";
import { AuthButtons } from "./AuthButtons";
import { FormField } from "@/shared/ui/FormField";
import { useTranslations } from "next-intl";
import styles from "./AuthForm.module.css";

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { onSubmit, loading } = useForgotPassword();
  const t = useTranslations();
  return (
    <AuthFormLayout
      title={t("ForgotPassword.title")}
      subtitle={t("ForgotPassword.subtitle")}
    >
      <form className={styles.forgotPassword} onSubmit={handleSubmit(onSubmit)}>
        <FormField<TForgotPasswordFormData>
          type={"email"}
          register={register}
          name={"email"}
          label={t("Login.email")}
          error={errors.email?.message}
        />
        <AuthButtons
          submitLabel={t("ForgotPassword.resetPassword")}
          linkLabel={t("ConfirmButtons.cancel")}
          linkUrl="/auth/signin"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
