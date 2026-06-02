import { GetCvsQuery } from "@/graphql/graphql";

export type CvSortField = "name" | "education" | "employee";
export type CvSortOrder = "asc" | "desc";

export const processCvs = (
  cvs: GetCvsQuery["cvs"],
  search: string,
  sortField: CvSortField,
  sortOrder: CvSortOrder,
) => {
  const normalizedSearch = search.toLowerCase().trim();

  const filtered = cvs.filter((cv) => {
    const employee = cv.user?.email?.toLowerCase() ?? "";

    return (
      cv.name.toLowerCase().includes(normalizedSearch) ||
      (cv.education ?? "").toLowerCase().includes(normalizedSearch) ||
      cv.description.toLowerCase().includes(normalizedSearch) ||
      employee.includes(normalizedSearch)
    );
  });

  return filtered.sort((a, b) => {
    let first = "";
    let second = "";

    if (sortField === "name") {
      first = a.name.toLowerCase();
      second = b.name.toLowerCase();
    }

    if (sortField === "education") {
      first = a.education?.toLowerCase() ?? "";
      second = b.education?.toLowerCase() ?? "";
    }
    if (sortField === "employee") {
      first = a.user?.email?.toLowerCase() ?? "";
      second = b.user?.email?.toLowerCase() ?? "";
    }

    if (sortOrder === "asc") {
      return first.localeCompare(second);
    }
    return second.localeCompare(first);
  });
};
