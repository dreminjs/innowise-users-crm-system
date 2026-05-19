import { UserRole } from "@/generated/graphql";

export const roleOptions = [
  {
    value: UserRole.Employee,
    label: "Employee",
  },
  {
    value: UserRole.Admin,
    label: "Admin",
  },
];
