"use client";

import { useRef } from "react";

import { useQuery } from "@apollo/client/react";
import { GET_CV } from "@/modules/Cvs/api/queries";
import { Loading } from "@/shared/ui/Loading";
import styles from "./CvPreviewPage.module.css";
import { PreviewExportButton } from "@/modules/CvsPreview/ui/PreviewExportButton/PreviewExportButton";
import { PreviewHeader } from "@/modules/CvsPreview/ui/PreviewHeader/PreviewHeader";
import { PreviewLanguages } from "@/modules/CvsPreview/ui/PreviewLanguages/PreviewLanguages";
import { PreviewProjects } from "@/modules/CvsPreview/ui/PreviewProjects/PreviewProjects";
import { PreviewSkills } from "@/modules/CvsPreview/ui/PreviewSkills/PreviewSkills";

type Props = {
  cvId: string;
};

export const CvPreviewPage = ({ cvId }: Props) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useQuery(GET_CV, {
    variables: {
      cvId,
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error || !data?.cv) {
    return <div className={styles.empty}>Failed to load CV</div>;
  }
  const cv = data.cv;
  return (
    <section className={styles.page}>
      <div className={styles.actions}>
        <PreviewExportButton previewRef={previewRef} />
      </div>
      <div ref={previewRef} id="cv-preview" className={styles.preview}>
        <PreviewHeader cv={cv} />
        <div className={styles.content}>
          <div className={styles.sidebar}>
            <PreviewLanguages languages={cv.languages ?? []} />
          </div>
          <div className={styles.main}>
            <PreviewProjects projects={cv.projects ?? []} />
            <PreviewSkills skills={cv.skills ?? []} />
          </div>
        </div>
      </div>
    </section>
  );
};
