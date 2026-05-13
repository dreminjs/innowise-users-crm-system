import { GetProjectsQuery } from "@/graphql/graphql";

import styles from "./ProjectsTable.module.css";

type Props = {
  project: GetProjectsQuery["projects"][number];
};

export const ProjectTableRow = ({ project }: Props) => {
  return (
    <tr className={styles.row}>
      <td>{project.name}</td>
      <td>{project.internal_name}</td>
      <td>{project.domain}</td>
      <td>{project.start_date}</td>
      <td>{project.end_date ?? "Till now"}</td>
    </tr>
  );
};
