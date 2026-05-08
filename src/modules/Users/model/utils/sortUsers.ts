import { GetUsersQuery } from "@/graphql/graphql";
import { SortField, SortOrder } from "../usersTable.types";

export const sortUsers = (
  users: GetUsersQuery["users"],
  sortField: SortField,
  sortOrder: SortOrder,
) => {
  return [...users].sort((a, b) => {
    let firstValue = "";
    let secondValue = "";

    switch (sortField) {
      case "first_name":
        firstValue = a.profile.first_name ?? "";
        secondValue = b.profile.first_name ?? "";
        break;

      case "last_name":
        firstValue = a.profile.last_name ?? "";
        secondValue = b.profile.last_name ?? "";
        break;

      case "email":
        firstValue = a.email;
        secondValue = b.email;
        break;

      case "department":
        firstValue = a.department_name ?? "";
        secondValue = b.department_name ?? "";
        break;

      case "position":
        firstValue = a.position_name ?? "";
        secondValue = b.position_name ?? "";
        break;
    }

    return sortOrder === "asc"
      ? firstValue.localeCompare(secondValue)
      : secondValue.localeCompare(firstValue);
  });
};
