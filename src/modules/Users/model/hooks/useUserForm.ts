"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserSchema,
  editUserSchema,
  TCreateUserFormValues,
  TEditUserFormValues,
} from "../user-form.schema";

type Props =
  | {
      mode: "create";
      defaultValues?: Partial<TCreateUserFormValues>;
    }
  | {
      mode: "edit";
      defaultValues?: Partial<TEditUserFormValues>;
    };
export const useUserForm = (props: Props) => {
  const t = useTranslations("Users");
  const isCreate = props.mode === "create";
  return useForm<TCreateUserFormValues | TEditUserFormValues>({
    defaultValues: isCreate
      ? {
          email: props.defaultValues?.email ?? "",
          password: props.defaultValues?.password ?? "",
          firstName: props.defaultValues?.firstName ?? "",
          lastName: props.defaultValues?.lastName ?? "",
          departmentId: props.defaultValues?.departmentId ?? "",
          positionId: props.defaultValues?.positionId ?? "",
          role: props.defaultValues?.role ?? "Employee",
        }
      : {
          firstName: props.defaultValues?.firstName ?? "",
          lastName: props.defaultValues?.lastName ?? "",
          departmentId: props.defaultValues?.departmentId ?? "",
          positionId: props.defaultValues?.positionId ?? "",
          role: props.defaultValues?.role ?? "Employee",
        },
    resolver: zodResolver(isCreate ? createUserSchema(t) : editUserSchema(t)),
    mode: "onBlur",
  });
};
