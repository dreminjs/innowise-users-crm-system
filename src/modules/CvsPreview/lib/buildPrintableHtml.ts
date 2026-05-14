export const buildPrintableHtml = (content: string) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <style>
        * {
          box-sizing: border-box;
        }
        @page {
          size: A4;
          margin: 20px;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          background: #ffffff;
          color: #111827;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }
        body {
          width: 100%;
        }
        #cv-preview {
          width: 100%;
        }
        h1,
        h2,
        h3,
        p,
        ul,
        li {
          margin-top: 0;
        }
        .preview-root {
          width: 794px;
          min-height: 1123px;
          padding: 56px 52px;
          background: #ffffff;
          margin: 0 auto;
        }
        .preview-content {
          display: grid;
          grid-template-columns:
            170px
            1fr;
          gap: 32px;
          margin-top: 36px;
        }
        .preview-sidebar {
          padding-right: 18px;

          border-right:
            1px solid #e5e7eb;
        }
        .preview-main {
          display: flex;
          flex-direction: column;

          gap: 44px;
        }
        .preview-title {
          margin: 0 0 28px;

          font-size: 30px;
          font-weight: 500;
          line-height: 1.1;

          color: #111827;
        }
        .project-block {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        tr {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        td {
          vertical-align: top;
        }
      </style>
    </head>

    <body>
      ${content}
    </body>
  </html>
  `;
};
