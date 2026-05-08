import { GetUsersQuery } from "@/graphql/graphql";

export const filterUsers = (users: GetUsersQuery["users"], search: string) => {
  const normalizedSearch = search.toLowerCase();
  return users.filter((user) => {
    const firstName = user.profile.first_name ?? "";
    const lastName = user.profile.last_name ?? "";
    const fullName = `
      ${firstName}
      ${lastName}
    `.toLowerCase();
    return fullName.includes(normalizedSearch);
  });
};
