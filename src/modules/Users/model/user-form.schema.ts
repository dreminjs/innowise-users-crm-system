import { z } from "zod";
import { UserRole } from "@/graphql/graphql";

export const userFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  departmentId: z.string(),
  positionId: z.string(),
  role: z.enum(["Admin", "Employee"]),
});

export type TUserFormValues = z.infer<typeof userFormSchema>;
