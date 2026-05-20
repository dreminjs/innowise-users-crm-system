"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CvDetailsPage.module.css";
import { useGetCv } from "@/modules/Cvs/hooks/useGetCv";
import { useUpdateCv } from "@/modules/Cvs/hooks/useUpdateCv";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import { Loading } from "@/shared/ui/Loading";
import {
  createCvDetailsSchema,
  TCvDetailsFormData,
} from "@/modules/Cvs/model/cvDetails.schema";

type Props = {
  cvId: string;
};

export const CvDetailsPage = ({ cvId }: Props) => {
  const router = useRouter();
  const t = useTranslations("CvDetails");
  const schema = createCvDetailsSchema(t);
  const { data, loading } = useGetCv(cvId);
  const [updateCv, { loading: updating }] = useUpdateCv();
  const cv = data?.cv;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TCvDetailsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      education: "",
      description: "",
    },
  });
  useEffect(() => {
    if (!cv) {
      return;
    }
    reset({
      name: cv.name,
      education: cv.education ?? "",
      description: cv.description,
    });
  }, [cv, reset]);
  const onSubmit = async (form: TCvDetailsFormData) => {
    try {
      await updateCv({
        variables: {
          cv: {
            cvId,
            name: form.name,
            education: form.education,
            description: form.description,
          },
        },
      });
      router.push("/cvs");
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <section className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <ModalField
          label={t("name")}
          active={Boolean(watch("name"))}
          error={errors.name?.message}
        >
          <input {...register("name")} placeholder=" " />
        </ModalField>
        <ModalField
          label={t("education")}
          active={Boolean(watch("education"))}
          error={errors.education?.message}
        >
          <input {...register("education")} placeholder=" " />
        </ModalField>
        <ModalField
          label={t("description")}
          textarea
          active={Boolean(watch("description"))}
          error={errors.description?.message}
        >
          <textarea {...register("description")} placeholder=" " />
        </ModalField>
        <ConfirmButtons
          confirmLabel={updating ? t("updating") : t("update")}
          confirmButtonType="submit"
          cancelAction={() => router.push("/cvs")}
          disabled={updating}
        />
      </form>
    </section>
  );
};
