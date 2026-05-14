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
    <>
      <tr className={styles.row}>
        <td>{project.project.name}</td>
        <td>{project.project.domain}</td>
        <td>{project.start_date}</td>
        <td>{project.end_date ?? "Till now"}</td>
        <td className={styles.actions}>
          <ProjectActions
            cvId={cvId}
            cvProjectId={project.id}
            projectId={project.project.id}
          />
        </td>
      </tr>
      <tr className={styles.detailsRow}>
        <td colSpan={5}>
          <div className={styles.details}>
            <p className={styles.description}>{project.project.description}</p>
            {!!project.responsibilities.length && (
              <ul className={styles.responsibilities}>
                {project.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            )}
            {!!project.project.environment.length && (
              <div className={styles.environment}>
                {project.project.environment.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};
