import { GetCvProjectsQuery } from "@/graphql/graphql";

export type CvProjects = NonNullable<
  NonNullable<GetCvProjectsQuery["cv"]>["projects"]
>;
export type CvProject = CvProjects[number];
export type ProjectSortField = "name" | "domain" | "start_date" | "end_date";
export type ProjectSortOrder = "asc" | "desc";

export const processProjects = (
  projects: CvProjects,
  search: string,
  sortField: ProjectSortField,
  sortOrder: ProjectSortOrder,
) => {
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = projects.filter((project) => {
    const name = project.project.name.toLowerCase();
    const internalName = project.project.internal_name.toLowerCase();
    return (
      name.includes(normalizedSearch) || internalName.includes(normalizedSearch)
    );
  });

  return [...filtered].sort((a, b) => {
    let first = "";
    let second = "";
    switch (sortField) {
      case "name":
        first = a.project.name.toLowerCase();
        second = b.project.name.toLowerCase();
        break;
      case "domain":
        first = a.project.domain.toLowerCase();
        second = b.project.domain.toLowerCase();
        break;
      case "start_date":
        first = a.start_date ?? "";
        second = b.start_date ?? "";
        break;
      case "end_date":
        first = a.end_date ?? "9999-12-31";
        second = b.end_date ?? "9999-12-31";
        break;
    }
    const result = first.localeCompare(second);
    return sortOrder === "asc" ? result : -result;
  });
};
