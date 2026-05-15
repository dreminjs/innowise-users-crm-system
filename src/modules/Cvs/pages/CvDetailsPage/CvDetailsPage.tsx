"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CvDetailsPage.module.css";
import { useGetCv } from "@/modules/Cvs/hooks/useGetCv";
import { useUpdateCv } from "@/modules/Cvs/hooks/useUpdateCv";
import { ConfirmButtons } from "@/shared/ui/ConfirmButtons";
import { ModalField } from "@/shared/ui/ModalField/ModalField";

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
  const [form, setForm] = useState<FormState>({
    name: "",
    education: "",
    description: "",
  });
  useEffect(() => {
    if (!cv) return;
    setForm({
      name: cv.name,
      education: cv.education ?? "",
      description: cv.description,
    });
  }, [cv]);

  const handleSubmit = async () => {
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
    return <div className={styles.empty}>Loading...</div>;
  }
  return (
    <section className={styles.page}>
      <div className={styles.form}>
        <ModalField label="Name" active={Boolean(form.name)}>
          <input
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            placeholder=" "
          />
        </ModalField>
        <ModalField label="Education" active={Boolean(form.education)}>
          <input
            value={form.education}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                education: e.target.value,
              }))
            }
            placeholder=" "
          />
        </ModalField>
        <ModalField
          label="Description"
          textarea
          active={Boolean(form.description)}
        >
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder=" "
          />
        </ModalField>
        <ConfirmButtons
          confirmLabel={updating ? "Updating..." : "Update"}
          confirmButtonType="button"
          onConfirm={handleSubmit}
          onCancel={() => router.push("/cvs")}
          disabled={updating}
        />
      </div>
    </section>
  );
};
