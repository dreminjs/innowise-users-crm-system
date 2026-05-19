"use client";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./EditCvProjectPage.module.css";
import { GET_CV_PROJECTS } from "@/modules/Projects/api/queries";
import { useUpdateCvProject } from "@/modules/Projects/hooks/useUpdateProject";
import { DatePicker } from "@/shared/ui/DatePicker/DatePicker";
import { Loading } from "@/shared/ui/Loading";
import { Empty } from "@/shared/ui/Empty";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import {
  createAddCvProjectSchema,
  TAddCvProjectFormData,
} from "@/modules/Projects/model/addCvProject.schema";

type Props = {
  cvId: string;
  projectId: string;
};

export const EditCvProjectPage = ({ cvId, projectId }: Props) => {
  const t = useTranslations("EditCvProject");
  const router = useRouter();
  const schema = createAddCvProjectSchema(t);
  const { data, loading } = useQuery(GET_CV_PROJECTS, {
    variables: {
      cvId,
    },
  });
  const [updateCvProject, { loading: saving }] = useUpdateCvProject(cvId);
  const project = useMemo(() => {
    return data?.cv?.projects?.find(
      (project) => project.project.id === projectId,
    );
  }, [data, projectId]);
  const {
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddCvProjectFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      projectId: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
    },
  });
  useEffect(() => {
    if (!project) {
      return;
    }
    reset({
      projectId: project.project.id,
      startDate: project.start_date ?? "",
      endDate: project.end_date ?? "",
      responsibilities: project.responsibilities?.[0] ?? "",
    });
  }, [project, reset]);
  const onSubmit = async (form: TAddCvProjectFormData) => {
    if (!project) {
      return;
    }
    await updateCvProject({
      variables: {
        project: {
          cvId,
          projectId: project.project.id,
          start_date: form.startDate,
          end_date: form.endDate || null,
          roles: project.roles ?? [],
          responsibilities: form.responsibilities
            ? [form.responsibilities]
            : [],
        },
      },
    });
    router.replace(`/cvs/${cvId}/projects`);
  };
  if (loading) {
    return <Loading />;
  }
  if (!project) {
    return <Empty />;
  }
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>
        </div>
        <form className={styles.card} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.grid}>
            <ModalField
              label={t("project")}
              active={Boolean(project.project.name)}
            >
              <input value={project.project.name} readOnly placeholder=" " />
            </ModalField>
            <ModalField
              label={t("domain")}
              active={Boolean(project.project.domain)}
            >
              <input value={project.project.domain} readOnly placeholder=" " />
            </ModalField>
            <ModalField
              label={t("startDate")}
              active={Boolean(watch("startDate"))}
              error={errors.startDate?.message}
            >
              <DatePicker
                value={watch("startDate")}
                changeAction={(value) =>
                  setValue("startDate", value, {
                    shouldValidate: true,
                  })
                }
              />
            </ModalField>
            <ModalField
              label={t("endDate")}
              active={Boolean(watch("endDate"))}
              error={errors.endDate?.message}
            >
              <DatePicker
                value={watch("endDate")}
                changeAction={(value) =>
                  setValue("endDate", value, {
                    shouldValidate: true,
                  })
                }
              />
            </ModalField>
          </div>
          <ModalField
            label={t("description")}
            textarea
            active={Boolean(project.project.description)}
          >
            <textarea
              value={project.project.description}
              readOnly
              placeholder=" "
            />
          </ModalField>
          <ModalField
            label={t("environment")}
            active={Boolean(project.project.environment?.length)}
          >
            <input
              value={project.project.environment.join(", ")}
              readOnly
              placeholder=" "
            />
          </ModalField>
          <ModalField
            label={t("responsibilities")}
            textarea
            active={Boolean(watch("responsibilities"))}
            error={errors.responsibilities?.message}
          >
            <textarea
              value={watch("responsibilities")}
              onChange={(e) =>
                setValue("responsibilities", e.target.value, {
                  shouldValidate: true,
                })
              }
              placeholder=" "
            />
          </ModalField>
          <ConfirmButtons
            confirmLabel={saving ? t("saving") : t("save")}
            confirmButtonType="submit"
            onCancel={() => router.replace(`/cvs/${cvId}/projects`)}
            disabled={saving}
          />
        </form>
      </div>
    </div>
  );
};
