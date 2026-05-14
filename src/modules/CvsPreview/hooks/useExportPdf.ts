"use client";

import { useMutation } from "@apollo/client/react";
import { EXPORT_PDF } from "../api/mutations";
import { buildPrintableHtml } from "@/modules/CvsPreview/lib/buildPrintableHtml";

export const useExportPdf = () => {
  const [exportPdf, state] = useMutation(EXPORT_PDF);
  const handleExportPdf = async (content: string) => {
    const html = buildPrintableHtml(content);
    const result = await exportPdf({
      variables: {
        pdf: {
          html,
          margin: {
            top: "20px",
            bottom: "20px",
            left: "20px",
            right: "20px",
          },
        },
      },
    });
    const base64 = result.data?.exportPdf;
    if (!base64) {
      return;
    }
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cv-preview.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };
  return {
    handleExportPdf,
    ...state,
  };
};
