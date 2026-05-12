import { GetCvsQuery } from "@/graphql/graphql";

type Cv = GetCvsQuery["cvs"][number];

export const getCvUserName = (cv: Cv) => {
  const firstName = cv.user?.profile?.first_name;
  const lastName = cv.user?.profile?.last_name;
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  return fullName || cv.user?.email || "-";
};
