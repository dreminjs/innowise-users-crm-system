"use client";

import { useEffect, useState } from "react";
import { GetCvQuery } from "@/graphql/graphql";
import { AppMessages } from "@/shared/lib/getMessages";
import { translateText } from "@/shared/api/translateText";
import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import styles from "./PreviewProjects.module.css";

type Props = {
  projects: GetCvQuery["cv"]["projects"];
  messages: AppMessages;
};

type TTranslatedProject = {
  description: string;
  responsibilities: string[];
  roles: string[];
};

export const PreviewProjects = ({ projects, messages }: Props) => {
  const { resumeLanguage } = useSettingsStore();
  const [translatedProjects, setTranslatedProjects] = useState<
    Record<string, TTranslatedProject>
  >({});

  useEffect(() => {
    const translateProjects = async () => {
      if (!projects?.length) {
        return;
      }
      const entries = await Promise.all(
        projects.map(async (project) => {
          try {
            const [description, responsibilities, roles] = await Promise.all([
              project.project?.description
                ? translateText(project.project.description, resumeLanguage)
                : Promise.resolve(""),
              Promise.all(
                project.responsibilities.map((responsibility) =>
                  translateText(responsibility, resumeLanguage),
                ),
              ),
              Promise.all(
                project.roles.map((role) =>
                  translateText(role, resumeLanguage),
                ),
              ),
            ]);
            return [
              project.id,
              {
                description,
                responsibilities,
                roles,
              },
            ] as const;
          } catch {
            return [
              project.id,
              {
                description: project.project?.description ?? "",
                responsibilities: project.responsibilities,
                roles: project.roles,
              },
            ] as const;
          }
        }),
      );
      setTranslatedProjects(Object.fromEntries(entries));
    };
    translateProjects();
  }, [projects, resumeLanguage]);

  return (
    <section>
      <h2 className={`${styles.title} preview-title`}>
        {messages.Preview.projects}
      </h2>
      <div className={styles.list}>
        {projects?.map((project) => {
          const translated = translatedProjects[project.id];
          return (
            <article
              key={project.id}
              className={`${styles.project} project-block`}
            >
              <div className={styles.projectInfo}>
                <div>
                  <h3>{project.project?.name}</h3>
                  <p>
                    {translated?.description ?? project.project?.description}
                  </p>
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
                      {(translated?.roles ?? project.roles).map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {!!project.responsibilities.length && (
                  <div>
                    <strong>{messages.Preview.responsibilities}</strong>
                    <ul>
                      {(
                        translated?.responsibilities ?? project.responsibilities
                      ).map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
