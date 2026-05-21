"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../../api/mutations";
import { GET_USERS } from "../../api/queries";
import { useNotification } from "@/modules/Notifications";
import { TCreateUserFormValues } from "@/modules/Users/model/user-form.schema";
export const useCreateUser = () => {
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [mutate, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      addNotification({
        message: t("userCreatedSuccessfully"),
        type: "success",
      });
    },
    onError: (error) => {
      addNotification({
        message: error.message,
        type: "error",
      });
    },
    refetchQueries: [
      {
        query: GET_USERS,
      },
    ],
  });
  const submitAction = async (dto: TCreateUserFormValues) => {
    await mutate({
      variables: {
        user: {
          auth: {
            email: dto.email,
            password: dto.password,
          },
          profile: {
            first_name: dto.firstName,
            last_name: dto.lastName,
          },
          cvsIds: [],
          departmentId: dto.departmentId,
          positionId: dto.positionId,
          role: dto.role,
        },
      },
    });
  };
  return {
    submitAction,
    loading,
    error,
  };
};
