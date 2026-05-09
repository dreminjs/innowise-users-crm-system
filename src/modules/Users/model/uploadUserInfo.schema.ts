import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  department: z.string().min(1, "Department is required"),
  departmentId: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  positionId: z.string().min(1, "Position is required"),
});

export type TUpdateUserForm = z.infer<typeof updateUserSchema>;
