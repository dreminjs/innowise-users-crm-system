import { z } from "zod";

export const createUserSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.invalidEmail")),
    password: z.string().trim().min(6, t("errors.passwordMin")),
    firstName: z
      .string()
      .trim()
      .min(1, t("errors.firstNameRequired"))
      .max(50, t("errors.firstNameMax")),
    lastName: z
      .string()
      .trim()
      .min(1, t("errors.lastNameRequired"))
      .max(50, t("errors.lastNameMax")),
    departmentId: z.string().min(1, t("errors.departmentRequired")),
    positionId: z.string().min(1, t("errors.positionRequired")),
    role: z.enum(["Admin", "Employee"]),
  });

export const editUserSchema = (t: (key: string) => string) =>
  createUserSchema(t).omit({
    email: true,
    password: true,
  });
export type TCreateUserFormValues = z.infer<
  ReturnType<typeof createUserSchema>
>;
export type TEditUserFormValues = z.infer<ReturnType<typeof editUserSchema>>;
export type TUserFormValues = TCreateUserFormValues | TEditUserFormValues;
