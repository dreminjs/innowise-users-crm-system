import { useForm } from "react-hook-form";
import { AuthFormLayout } from "./AuthFormLayout";
import { TResetPasswordFormData } from "../model/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { resetPasswordSchema } from "../model/auth.schema";
import { useResetPassword } from "../model/hooks/useResetPassword";
import { AuthButtons } from "./AuthButtons";
import { FormField } from "@/shared/ui/FormField";
import styles from "./AuthForm.module.css";

export const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { loading, onSubmit } = useResetPassword();
  const t = useTranslations();
  return (
    <AuthFormLayout
      title={t("resetPassword.title")}
      subtitle={t("resetPassword.subtitle")}
    >
      <form className={styles.forgotPassword} onSubmit={handleSubmit(onSubmit)}>
        <FormField<TResetPasswordFormData>
          type={"email"}
          register={register}
          name={"newPassword"}
          label={t("resetPassword.newPassword")}
          error={errors.newPassword?.message}
        />
        <AuthButtons
          submitIsEnabled={watch("newPassword")?.length > 0}
          submitLabel={t("resetPassword.submit")}
          linkLabel={t("ConfirmButtons.cancel")}
          linkUrl="/auth/signin"
          isLoading={loading}
        />
      </form>
    </AuthFormLayout>
  );
};
