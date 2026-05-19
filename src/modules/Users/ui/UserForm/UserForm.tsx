"use client";
import { Controller } from "react-hook-form";
import { useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { FormField } from "@/shared/ui/FormField";
import styles from "./UserForm.module.css";
import { useUserForm } from "@/modules/Users/model/hooks/useUserForm";
import { TUserFormProps } from "@/modules/Users/ui/UserForm/UserForm.types";
import { GET_USERS_CREATERIES } from "@/modules/Users/api/queries";
import { Loading } from "@/shared/ui/Loading";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { roleOptions } from "@/modules/Users/model/user-form.constants";

export const UserForm = ({
  mode,
  defaultValues,
  loading,
  submitAction,
  cancelAction,
}: TUserFormProps) => {
  const t = useTranslations("Users");
  const { data, loading: loadingMeta, error } = useQuery(GET_USERS_CREATERIES);
  const { register, control, handleSubmit, setValue } = useUserForm({
    defaultValues,
  });
  if (loadingMeta) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <form onSubmit={handleSubmit(submitAction)} className={styles.form}>
      <div className={styles.grid}>
        <FormField
          type="email"
          register={register}
          name="email"
          label={t("fields.email")}
          isAvailable={false}
        />
        <FormField
          type="password"
          register={register}
          name="password"
          label={t("fields.password")}
          isAvailable={false}
        />
        <FormField
          type="text"
          register={register}
          name="firstName"
          label={t("fields.firstName")}
          isAvailable={true}
        />
        <FormField
          type="text"
          register={register}
          name="lastName"
          label={t("fields.lastName")}
          isAvailable={true}
        />
        <Controller
          control={control}
          name="departmentId"
          render={({ field }) => (
            <CustomSelect
              label={t("fields.department")}
              options={
                data?.departments.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) ?? []
              }
              value={field.value}
              onChange={(value) => setValue("departmentId", value)}
            />
          )}
        />
        <Controller
          control={control}
          name="positionId"
          render={({ field }) => (
            <CustomSelect
              label={t("fields.position")}
              options={
                data?.positions.map((item) => ({
                  value: item.id,
                  label: item.name,
                })) ?? []
              }
              value={field.value}
              onChange={(value) => setValue("positionId", value)}
            />
          )}
        />
        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <CustomSelect
              label={t("fields.role")}
              options={roleOptions}
              value={field.value}
              onChange={(value) =>
                setValue("role", value as typeof field.value)
              }
            />
          )}
        />
      </div>
      <ConfirmButtons
        cancelAction={cancelAction}
        confirmButtonType="submit"
        confirmLabel={t(mode === "create" ? "create.submit" : "edit.submit")}
        disabled={loading}
      />
    </form>
  );
};
