import { GetCvQuery } from "@/graphql/graphql";
import styles from "./PreviewProjects.module.css";

type Props = {
  projects: GetCvQuery["cv"]["projects"];
};

export const PreviewProjects = ({ projects }: Props) => {
  return (
    <section>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.list}>
        {projects?.map((project) => (
          <article key={project.id} className={styles.project}>
            <div className={styles.projectInfo}>
              <div>
                <h3>{project.project?.name}</h3>
                <p>{project.project?.description}</p>
              </div>
              <div className={styles.environment}>
                {project.project?.environment.join(", ")}
              </div>
            </div>
            <div className={styles.projectMeta}>
              <div>
                <strong>Period</strong>
                <p>
                  {project.start_date}
                  {" — "}
                  {project.end_date ?? "Till now"}
                </p>
              </div>
              {!!project.roles.length && (
                <div>
                  <strong>Roles</strong>
                  <ul>
                    {project.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!!project.responsibilities.length && (
                <div>
                  <strong>Responsibilities</strong>
                  <ul>
                    {project.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
