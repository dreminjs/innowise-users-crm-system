import { renderHook, act } from "@testing-library/react";
import { useExportPdf } from "./useExportPdf";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("../api/mutations", () => ({
  EXPORT_PDF: "EXPORT_PDF",
}));
jest.mock("@/modules/CvsPreview/lib/buildPrintableHtml");

import { useMutation } from "@apollo/client/react";
import { buildPrintableHtml } from "@/modules/CvsPreview/lib/buildPrintableHtml";
import { EXPORT_PDF } from "../api/mutations";

const mockUseMutation = useMutation as unknown as jest.Mock;
const mockBuildPrintableHtml = buildPrintableHtml as jest.Mock;

const mockExportPdfFn = jest.fn();
const mockState = { loading: false, error: undefined, data: undefined };

const MOCK_HTML = "<html><body>CV Content</body></html>";
const MOCK_BASE64 = btoa("fake-pdf-content");

const mockClick = jest.fn();
const mockCreateObjectURL = jest.fn().mockReturnValue("blob:mock-url");
const mockRevokeObjectURL = jest.fn();

global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

const originalCreateElement = document.createElement.bind(document);

describe("useExportPdf", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockBuildPrintableHtml.mockReturnValue(MOCK_HTML);
    mockUseMutation.mockReturnValue([mockExportPdfFn, mockState]);
    mockExportPdfFn.mockResolvedValue({ data: { exportPdf: MOCK_BASE64 } });
    mockCreateObjectURL.mockReturnValue("blob:mock-url");

    jest.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "a") {
        return {
          href: "",
          download: "",
          click: mockClick,
        } as unknown as HTMLAnchorElement;
      }
      return originalCreateElement(tag);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Initialization", () => {
    it("calls useMutation with EXPORT_PDF document", () => {
      renderHook(() => useExportPdf());
      expect(mockUseMutation).toHaveBeenCalledWith(EXPORT_PDF);
    });

    it("returns handleExportPdf function", () => {
      const { result } = renderHook(() => useExportPdf());
      expect(typeof result.current.handleExportPdf).toBe("function");
    });

    it("spreads mutation state into return value", () => {
      mockUseMutation.mockReturnValue([
        mockExportPdfFn,
        { loading: true, error: undefined, data: undefined },
      ]);
      const { result } = renderHook(() => useExportPdf());
      expect(result.current.loading).toBe(true);
    });
  });

  describe("handleExportPdf", () => {
    it("calls buildPrintableHtml with provided content", async () => {
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockBuildPrintableHtml).toHaveBeenCalledWith("raw content");
    });

    it("calls exportPdf mutation with built html and margins", async () => {
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockExportPdfFn).toHaveBeenCalledWith({
        variables: {
          pdf: {
            html: MOCK_HTML,
            margin: {
              top: "20px",
              bottom: "20px",
              left: "20px",
              right: "20px",
            },
          },
        },
      });
    });

    it("creates object URL from blob when base64 is returned", async () => {
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockCreateObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    });

    it("creates blob with application/pdf mime type", async () => {
      let capturedBlob: Blob | undefined;
      mockCreateObjectURL.mockImplementation((blob: Blob) => {
        capturedBlob = blob;
        return "blob:mock-url";
      });
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(capturedBlob?.type).toBe("application/pdf");
    });

    it("creates anchor element and triggers click", async () => {
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("sets correct href and download on anchor element", async () => {
      const mockAnchor = { href: "", download: "", click: mockClick };
      jest
        .spyOn(document, "createElement")
        .mockImplementation((tag: string) => {
          if (tag === "a") return mockAnchor as unknown as HTMLAnchorElement;
          return originalCreateElement(tag);
        });
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockAnchor.href).toBe("blob:mock-url");
      expect(mockAnchor.download).toBe("cv-preview.pdf");
    });

    it("revokes object URL after click", async () => {
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockRevokeObjectURL).toHaveBeenCalledWith("blob:mock-url");
    });

    it("does nothing when exportPdf returns no base64 data", async () => {
      mockExportPdfFn.mockResolvedValue({ data: { exportPdf: null } });
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockClick).not.toHaveBeenCalled();
    });

    it("does nothing when data is undefined", async () => {
      mockExportPdfFn.mockResolvedValue({ data: undefined });
      const { result } = renderHook(() => useExportPdf());
      await act(async () => {
        await result.current.handleExportPdf("raw content");
      });
      expect(mockCreateObjectURL).not.toHaveBeenCalled();
      expect(mockClick).not.toHaveBeenCalled();
    });
  });
});
