import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CvDetailsPage } from "./CvDetailsPage";
import { useGetCv } from "../../hooks/useGetCv";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../model/cvDetails.schema.ts", () => ({
  createCvDetailsSchema: jest.fn(() => {
    const { z } = require("zod");
    return z.object({
      name: z.string().optional(),
      education: z.string().optional(),
      description: z.string().optional(),
    });
  }),
}));

const mockUpdateCv = jest.fn();
jest.mock("../../hooks//useGetCv", () => ({
  useGetCv: jest.fn(),
}));
jest.mock("../../hooks/useUpdateCv", () => ({
  useUpdateCv: jest.fn(() => [mockUpdateCv, { loading: false }]),
}));

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div data-testid="loading-indicator">Loading...</div>,
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({
    confirmLabel,
    cancelAction,
    disabled,
  }: {
    confirmLabel: string;
    cancelAction?: () => void;
    disabled?: boolean;
  }) => (
    <div>
      <button type="button" onClick={cancelAction}>
        Cancel
      </button>
      <button type="submit" disabled={disabled}>
        {confirmLabel}
      </button>
    </div>
  ),
}));

describe("CvDetailsPage", () => {
  const mockCvId = "cv-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loading state initially", () => {
    (useGetCv as jest.Mock).mockReturnValue({ loading: true, data: null });

    render(<CvDetailsPage cvId={mockCvId} />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  it("populates the form with fetched CV data", async () => {
    const mockCvData = {
      cv: {
        name: "John Doe",
        education: "BSc Computer Science",
        description: "Experienced Software Engineer",
      },
    };
    (useGetCv as jest.Mock).mockReturnValue({
      loading: false,
      data: mockCvData,
    });

    render(<CvDetailsPage cvId={mockCvId} />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("BSc Computer Science"),
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue("Experienced Software Engineer"),
      ).toBeInTheDocument();
    });
  });

  it("submits the form with updated data and redirects to /cvs", async () => {
    const user = userEvent.setup();
    const mockCvData = {
      cv: {
        name: "Old Name",
        education: "Old Education",
        description: "Old Description",
      },
    };
    (useGetCv as jest.Mock).mockReturnValue({
      loading: false,
      data: mockCvData,
    });
    mockUpdateCv.mockResolvedValueOnce({});

    render(<CvDetailsPage cvId={mockCvId} />);

    const nameInput = await screen.findByDisplayValue("Old Name");

    await user.clear(nameInput);
    await user.type(nameInput, "New Name");

    const submitButton = screen.getByRole("button", { name: "update" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateCv).toHaveBeenCalledWith({
        variables: {
          cv: {
            cvId: mockCvId,
            name: "New Name",
            education: "Old Education",
            description: "Old Description",
          },
        },
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/cvs");
  });

  it("navigates back to /cvs when cancel is clicked", async () => {
    const user = userEvent.setup();
    (useGetCv as jest.Mock).mockReturnValue({
      loading: false,
      data: { cv: null },
    });

    render(<CvDetailsPage cvId={mockCvId} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelButton);

    expect(mockPush).toHaveBeenCalledWith("/cvs");
  });
});
