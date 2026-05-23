import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PreviewExportButton } from "./PreviewExportButton";
import { useExportPdf } from "@/modules/CvsPreview/hooks/useExportPdf";

jest.mock("@/modules/CvsPreview/hooks/useExportPdf", () => ({
  useExportPdf: jest.fn(),
}));

describe("PreviewExportButton", () => {
  const mockHandleExportPdf = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render button in normal state (not loading)", () => {
    (useExportPdf as jest.Mock).mockReturnValue({
      handleExportPdf: mockHandleExportPdf,
      loading: false,
    });

    const mockRef = { current: null };

    render(<PreviewExportButton previewRef={mockRef} />);

    const button = screen.getByRole("button", { name: /export pdf/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("renders the button in the loading state (loading: true)", () => {
    (useExportPdf as jest.Mock).mockReturnValue({
      handleExportPdf: mockHandleExportPdf,
      loading: true,
    });

    const mockRef = { current: null };

    render(<PreviewExportButton previewRef={mockRef} />);

    const button = screen.getByRole("button", { name: /exporting/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("calls handleExportPdf with innerHTML on click if ref exists", async () => {
    const user = userEvent.setup();
    (useExportPdf as jest.Mock).mockReturnValue({
      handleExportPdf: mockHandleExportPdf,
      loading: false,
    });

    const mockRef = {
      current: {
        innerHTML: "<p>Test CV Content</p>",
      } as HTMLDivElement,
    };

    render(<PreviewExportButton previewRef={mockRef} />);

    const button = screen.getByRole("button", { name: /export pdf/i });
    await user.click(button);

    expect(mockHandleExportPdf).toHaveBeenCalledTimes(1);
    expect(mockHandleExportPdf).toHaveBeenCalledWith("<p>Test CV Content</p>");
  });

  it("Does NOT call handleExportPdf on click if ref is null", async () => {
    const user = userEvent.setup();
    (useExportPdf as jest.Mock).mockReturnValue({
      handleExportPdf: mockHandleExportPdf,
      loading: false,
    });

    const mockRef = { current: null };

    render(<PreviewExportButton previewRef={mockRef} />);

    const button = screen.getByRole("button", { name: /export pdf/i });
    await user.click(button);

    expect(mockHandleExportPdf).not.toHaveBeenCalled();
  });
});
