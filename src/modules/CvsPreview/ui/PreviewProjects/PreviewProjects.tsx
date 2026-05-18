import { GetCvQuery } from "@/graphql/graphql";
import styles from "./PreviewProjects.module.css";
import { AppMessages } from "@/shared/lib/getMessages";

type Props = {
  projects: GetCvQuery["cv"]["projects"];
  messages: AppMessages;
};

export const PreviewProjects = ({ projects, messages }: Props) => {
  return (
    <section>
      <h2 className={`${styles.title} preview-title`}>
        {messages.Preview.projects}
      </h2>
      <div className={styles.list}>
        {projects?.map((project) => (
          <article
            key={project.id}
            className={`${styles.project} project-block`}
          >
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
                <strong>{messages.Preview.period}</strong>
                <p>
                  {project.start_date}
                  {" — "}
                  {project.end_date ?? messages.Preview.tillNow}
                </p>
              </div>
              {!!project.roles.length && (
                <div>
                  <strong>{messages.Preview.roles}</strong>
                  <ul>
                    {project.roles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!!project.responsibilities.length && (
                <div>
                  <strong>{messages.Preview.responsibilities}</strong>
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
