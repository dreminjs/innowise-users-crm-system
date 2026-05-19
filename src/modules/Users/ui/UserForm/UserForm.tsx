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
  serverError,
  submitAction,
  cancelAction,
}: TUserFormProps) => {
  const t = useTranslations("Users");
  const { data, loading: loadingMeta, error } = useQuery(GET_USERS_CREATERIES);
  const isCreating = mode === "create";

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useUserForm({
    mode,
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
        {isCreating && (
          <FormField
            type="email"
            register={register}
            name="email"
            label={t("fields.email")}
            error={errors.email?.message || serverError}
          />
        )}
        {isCreating && (
          <FormField
            type="password"
            register={register}
            name="password"
            label={t("fields.password")}
            error={errors.password?.message}
          />
        )}
        <FormField
          type="text"
          register={register}
          name="firstName"
          label={t("fields.firstName")}
          error={errors.firstName?.message}
        />
        <FormField
          type="text"
          register={register}
          name="lastName"
          label={t("fields.lastName")}
          error={errors.lastName?.message}
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
