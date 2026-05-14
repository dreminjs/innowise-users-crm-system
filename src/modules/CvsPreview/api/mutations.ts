import { graphql } from "@/graphql";

export const EXPORT_PDF = graphql(`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`);
