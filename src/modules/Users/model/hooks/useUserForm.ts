"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  userFormSchema,
  TUserFormValues,
} from "@/modules/Users/model/user-form.schema";
import { UserRole } from "@/generated/graphql";

type Props = {
  defaultValues?: Partial<TUserFormValues>;
};

export const useUserForm = ({ defaultValues }: Props) => {
  return useForm<TUserFormValues>({
    resolver: zodResolver(userFormSchema),

    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      departmentId: defaultValues?.departmentId ?? "",
      positionId: defaultValues?.positionId ?? "",
      role: defaultValues?.role ?? UserRole.Employee,
    },
  });
};
