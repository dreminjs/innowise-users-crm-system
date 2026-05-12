import styles from "../UpdateUserInfo.module.css";
import { useQuery } from "@apollo/client/react";
import { GET_USERS_CREATERIES } from "@/modules/Users/api/queries";
import { FormField } from "@/shared/ui/FormField";
import {
  TUpdateUserForm,
  updateUserSchema,
} from "@/modules/Users/model/uploadUserInfo.schema";
import { Controller, useForm } from "react-hook-form";
import { FC } from "react";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { useUpdateProfile } from "@/modules/Users/model/hooks/useUpdateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUser } from "@/modules/Users/model/hooks/useUpdateUser";

interface IUploadInfoProps {
  isAvailable: boolean;
  firstName: string;
  lastName: string;
  positionId: string;
  departmentId: string;
}

export const UploadInfo: FC<IUploadInfoProps> = ({
  isAvailable,
  firstName,
  lastName,
  positionId,
  departmentId,
}) => {
  const { onSubmit: updateProfile, loading: loadingUpdatingProfile } =
    useUpdateProfile();
  const { onSubmit: updateUser, loading: loadingUpdatingUser } =
    useUpdateUser();

  const handleUpdateUserInfo = async (dto: TUpdateUserForm) => {
    await updateProfile({
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    await updateUser({
      departmentId: dto.departmentId,
      positionId: dto.positionId,
    });
  };

  const { data, loading, error } = useQuery(GET_USERS_CREATERIES);
  const { register, handleSubmit, control, setValue } =
    useForm<TUpdateUserForm>({
      defaultValues: {
        firstName,
        lastName,
        positionId,
        departmentId,
      },
      resolver: zodResolver(updateUserSchema),
    });
  const handleDepartmentChange = (departmentId: string) => {
    setValue("departmentId", departmentId);
  };

  const handlePositionChange = (positionId: string) => {
    setValue("positionId", positionId);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <form
      onSubmit={handleSubmit(handleUpdateUserInfo)}
      className={styles.uploadInfo}
    >
      {(isAvailable || firstName) && (
        <FormField<TUpdateUserForm>
          type="text"
          register={register}
          name="firstName"
          label="First Name"
        />
      )}

      {(isAvailable || lastName) && (
        <FormField<TUpdateUserForm>
          type="text"
          register={register}
          name="lastName"
          label="Last Name"
        />
      )}

      {(isAvailable || departmentId) && (
        <Controller
          control={control}
          name="departmentId"
          render={({ field }) => (
            <CustomSelect
              options={
                data?.departments.map((el) => ({
                  value: el.id,
                  label: el.name,
                })) || []
              }
              label="Department"
              disabled={!isAvailable}
              value={field.value}
              onChange={handleDepartmentChange}
            />
          )}
        />
      )}

      {(isAvailable || positionId) && (
        <Controller
          control={control}
          name="positionId"
          render={({ field }) => (
            <CustomSelect
              options={
                data?.positions.map((el) => ({
                  value: el.id,
                  label: el.name,
                })) || []
              }
              label="Position"
              disabled={!isAvailable}
              value={field.value}
              onChange={handlePositionChange}
            />
          )}
        />
      )}

      {isAvailable && (
        <button
          disabled={loadingUpdatingProfile && loadingUpdatingUser}
          className={styles.uploadInfoSubmit}
        >
          {loadingUpdatingProfile && loadingUpdatingUser
            ? "Loading..."
            : "SUBMIT"}
        </button>
      )}
    </form>
  );
};
