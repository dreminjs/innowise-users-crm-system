import { GetProjectsQuery } from "@/graphql/graphql";

export type ProjectSortField =
  | "name"
  | "internal_name"
  | "domain"
  | "start_date"
  | "end_date";

export type ProjectSortOrder = "asc" | "desc";

export const processProjects = (
  projects: GetProjectsQuery["projects"],
  search: string,
  sortField: ProjectSortField,
  sortOrder: ProjectSortOrder,
) => {
  const normalized = search.toLowerCase();

  const filtered = projects.filter((project) => {
    return (
      project.name.toLowerCase().includes(normalized) ||
      project.internal_name.toLowerCase().includes(normalized)
    );
  });

  return filtered.sort((a, b) => {
    const first = (a[sortField] ?? "").toString().toLowerCase();

    const second = (b[sortField] ?? "").toString().toLowerCase();

    if (sortOrder === "asc") {
      return first.localeCompare(second);
    }

    return second.localeCompare(first);
  });
};
