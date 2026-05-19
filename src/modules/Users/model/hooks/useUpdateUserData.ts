"use client";

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { UPDATE_PROFILE, UPDATE_USER_DATA } from "../../api/mutations";
import { GET_USERS } from "../../api/queries";
import { useNotification } from "@/modules/Notifications";
import { TUserFormValues } from "@/modules/Users/model/user-form.types";

type Props = {
  userId: string;
};

export const useUpdateUserData = ({ userId }: Props) => {
  const t = useTranslations("Notifications");
  const addNotification = useNotification((state) => state.addNotification);
  const [updateUser, { loading: userLoading }] = useMutation(UPDATE_USER_DATA);
  const [updateProfile, { loading: profileLoading }] =
    useMutation(UPDATE_PROFILE);
  const submitAction = async (dto: TUserFormValues) => {
    try {
      await updateProfile({
        variables: {
          dto: {
            first_name: dto.firstName,
            last_name: dto.lastName,
            userId: userId,
          },
        },
      });
      await updateUser({
        variables: {
          user: {
            userId,
            departmentId: dto.departmentId,
            positionId: dto.positionId,
            role: dto.role,
          },
        },
        refetchQueries: [
          {
            query: GET_USERS,
          },
        ],
        awaitRefetchQueries: true,
      });
      addNotification({
        message: t("userUpdatedSuccessfully"),
        type: "success",
      });
    } catch (error) {
      addNotification({
        message: error instanceof Error ? error.message : "Unknown error",
        type: "error",
      });
      throw error;
    }
  };
  return {
    submitAction,
    loading: userLoading || profileLoading,
  };
};
