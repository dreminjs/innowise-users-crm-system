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
import { ResumeLanguage } from "@/modules/Settings/ui/ResumeLanguage";
import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import { getMessages } from "@/shared/lib/getMessages";

type Props = {
  cvId: string;
};

export const CvPreviewPage = ({ cvId }: Props) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { resumeLanguage } = useSettingsStore();
  const messages = getMessages(resumeLanguage);
  console.log(messages?.Settings);
  const { data, loading, error } = useQuery(GET_CV, {
    variables: {
      cvId,
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error || !data?.cv) {
    return null;
  }
  const cv = data.cv;
  return (
    <section className={styles.page}>
      <div className={styles.actions}>
        <div className={styles.language}>
          <ResumeLanguage label={messages?.Settings.resumeLanguage} />
        </div>
        <PreviewExportButton previewRef={previewRef} />
      </div>
      <div
        ref={previewRef}
        id="cv-preview"
        className={`${styles.preview} preview-root`}
      >
        <PreviewHeader cv={cv} messages={messages} />
        <div className={`${styles.content} preview-content`}>
          <div className={styles.sidebar}>
            <PreviewLanguages
              languages={cv.languages ?? []}
              messages={messages}
            />
          </div>
          <div className={`${styles.main} preview-main`}>
            <PreviewProjects projects={cv.projects ?? []} messages={messages} />
            <PreviewSkills skills={cv.skills ?? []} messages={messages} />
          </div>
        </div>
      </div>
    </section>
  );
};
