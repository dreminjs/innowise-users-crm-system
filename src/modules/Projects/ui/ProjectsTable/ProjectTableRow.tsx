import styles from "./ProjectsTable.module.css";
import { GetCvProjectsQuery } from "@/graphql/graphql";
import { ProjectActions } from "@/modules/Projects/ui/ProjectsTable/ProjectActions/ProjectActions";

type Props = {
  project: NonNullable<
    NonNullable<GetCvProjectsQuery["cv"]>["projects"]
  >[number];
  cvId: string;
};

export const ProjectTableRow = ({ project, cvId }: Props) => {
  return (
    <tr className={styles.row}>
      <td>{project.name}</td>
      <td>{project.domain}</td>
      <td>{project.start_date}</td>
      <td>{project.end_date ?? "Till now"}</td>
      <td className={styles.actions}>
        <ProjectActions cvId={cvId} projectId={project.id} />
      </td>
    </tr>
  );
};
