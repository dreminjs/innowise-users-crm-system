"use client";

import { RefObject } from "react";
import styles from "./PreviewExportButton.module.css";
import { useExportPdf } from "@/modules/CvsPreview/hooks/useExportPdf";

type Props = {
  previewRef: RefObject<HTMLDivElement | null>;
};

export const PreviewExportButton = ({ previewRef }: Props) => {
  const { handleExportPdf, loading } = useExportPdf();
  const handleClick = async () => {
    if (!previewRef.current) {
      return;
    }
    await handleExportPdf(previewRef.current.innerHTML);
  };
  return (
    <button onClick={handleClick} disabled={loading} className={styles.button}>
      {loading ? "EXPORTING..." : "EXPORT PDF"}
    </button>
  );
};
