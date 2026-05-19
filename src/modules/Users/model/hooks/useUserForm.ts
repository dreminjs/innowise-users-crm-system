"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, editUserSchema } from "../user-form.schema";
import { TUserFormMode, TUserFormValues } from "../user-form.types";

type Props = {
  mode: TUserFormMode;
  defaultValues?: Partial<TUserFormValues>;
};

export const useUserForm = ({ mode, defaultValues }: Props) => {
  const t = useTranslations("Users");
  return useForm<TUserFormValues>({
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      departmentId: defaultValues?.departmentId ?? "",
      positionId: defaultValues?.positionId ?? "",
      role: defaultValues?.role ?? "Employee",
    },
    resolver: zodResolver(
      mode === "create" ? createUserSchema(t) : editUserSchema(t),
    ),
    mode: "onBlur",
  });
};
