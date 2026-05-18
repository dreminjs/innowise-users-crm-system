"use client";

import { useEffect, useState } from "react";
import { GetCvQuery } from "@/graphql/graphql";
import { useSettingsStore } from "@/modules/Settings/model/settings.store";
import { AppMessages } from "@/shared/lib/getMessages";
import { translateText } from "@/shared/api/translateText";
import styles from "./PreviewHeader.module.css";

type Props = {
  cv: GetCvQuery["cv"];
  messages: AppMessages;
};

export const PreviewHeader = ({ cv, messages }: Props) => {
  const { resumeLanguage } = useSettingsStore();
  const [translatedEducation, setTranslatedEducation] = useState("");
  const [translatedDescription, setTranslatedDescription] = useState("");
  useEffect(() => {
    const translateContent = async () => {
      try {
        const [education, description] = await Promise.all([
          cv.education
            ? translateText(cv.education, resumeLanguage)
            : Promise.resolve("-"),
          cv.description
            ? translateText(cv.description, resumeLanguage)
            : Promise.resolve(""),
        ]);
        setTranslatedEducation(education);
        setTranslatedDescription(description);
      } catch (error) {
        console.error(error);
        setTranslatedEducation(cv.education ?? "-");
        setTranslatedDescription(cv.description ?? "");
      }
    };
    translateContent();
  }, [cv.education, cv.description, resumeLanguage]);
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.name}>
            {cv.user?.profile?.full_name ?? "Unknown User"}
          </h1>
          <p className={styles.position}>{cv.user?.position?.name ?? ""}</p>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoBlock}>
          <div className={styles.infoSection}>
            <h3>{messages?.CvDetails.education}</h3>
            <p>{translatedEducation}</p>
          </div>
        </div>
        <div className={styles.infoBlock}>
          <div className={styles.infoSection}>
            <h3>{cv.name}</h3>
            <p className={styles.description}>{translatedDescription}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
