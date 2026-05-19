"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/application/store/user.store";
import { useCreateCv } from "../../model/hooks/useCreateCv";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { ModalField } from "@/shared/ui/ModalField/ModalField";
import styles from "./CreateCvModal.module.css";
import {
  createCvDetailsSchema,
  TCvDetailsFormData,
} from "@/modules/Cvs/model/cvDetails.schema";

type Props = {
  isOpen: boolean;
  closeAction: () => void;
};

export const CreateCvModal = ({ isOpen, closeAction }: Props) => {
  const t = useTranslations("CvDetails");
  const schema = createCvDetailsSchema(t);
  const userId = useUserStore((state) => state.userId);
  const [createCv, { loading }] = useCreateCv();
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
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (form: TCvDetailsFormData) => {
    if (!userId) {
      return;
    }
    try {
      await createCv({
        variables: {
          cv: {
            name: form.name,
            education: form.education,
            description: form.description,
            userId,
          },
        },
      });
      reset();
      closeAction();
    } catch (error) {
      throw error;
    }
  };
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.backdrop} onClick={closeAction} />
      <div className={styles.modal}>
        <button
          type="button"
          onClick={closeAction}
          className={styles.closeButton}
        >
          ×
        </button>
        <h2 className={styles.title}>{t("title")}</h2>
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
            confirmLabel={t("create")}
            confirmButtonType="submit"
            onCancel={closeAction}
            disabled={loading}
          />
        </form>
      </div>
    </>
  );
};
