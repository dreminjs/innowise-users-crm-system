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
            <div>
              <h3>{project.project?.name}</h3>

              <p>{project.project?.description}</p>
            </div>
            <div>
              <p>
                <strong>Period:</strong>
              </p>
              <p>
                {project.start_date}
                {" — "}
                {project.end_date ?? "Till now"}
              </p>
              <p>
                <strong>Responsibilities:</strong>
              </p>
              <ul>
                {project.responsibilities.map((responsibility) => (
                  <li key={responsibility}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
