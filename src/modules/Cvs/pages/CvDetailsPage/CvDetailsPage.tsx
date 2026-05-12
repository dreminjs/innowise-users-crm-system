"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetCv } from "@/modules/Cvs/hooks/useGetCv";
import { useUpdateCv } from "@/modules/Cvs/hooks/useUpdateCv";
import styles from "./CvDetailsPage.module.css";

type Props = {
  cvId: string;
};

type FormState = {
  name: string;
  education: string;
  description: string;
};

export const CvDetailsPage = ({ cvId }: Props) => {
  const router = useRouter();
  const { data, loading } = useGetCv(cvId);
  const [updateCv, { loading: updating }] = useUpdateCv();
  const cv = data?.cv;
  const [form, setForm] = useState<FormState | null>(null);
  if (cv && form === null) {
    setForm({
      name: cv.name,
      education: cv.education ?? "",
      description: cv.description,
    });
  }
  const handleSubmit = async () => {
    if (!form) return;
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
      console.error(error);
    }
  };
  if (loading || !form) {
    return <div className={styles.empty}>Loading...</div>;
  }
  return (
    <section className={styles.page}>
      <div className={styles.form}>
        <div className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev!,
                name: e.target.value,
              }))
            }
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Education</span>
          <input
            value={form.education}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev!,
                education: e.target.value,
              }))
            }
            className={styles.input}
          />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Description</span>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev!,
                description: e.target.value,
              }))
            }
            className={styles.textarea}
          />
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={updating}
            className={styles.button}
          >
            UPDATE
          </button>
        </div>
      </div>
    </section>
  );
};
