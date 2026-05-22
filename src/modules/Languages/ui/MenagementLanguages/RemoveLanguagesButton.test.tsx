import { render, screen, fireEvent } from "@testing-library/react";
import { RemoveLanguagesButton } from "./RemoveLanguagesButton";
import { useLanguageStore } from "../../model/language.store";
import { useDeleteProfileLanguages } from "../../model/hooks/useDeleteProfileLanguages";
const handleDeleteProfileLanguages = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));
jest.mock("../../model/language.store", () => ({
  useLanguageStore: jest.fn(),
}));
jest.mock("../../model/hooks/useDeleteProfileLanguages", () => ({
  useDeleteProfileLanguages: jest.fn(),
}));
jest.mock("../Languages.module.css", () => ({
  removeLanguagesButton: "removeLanguagesButton",
  deleteConfirmButtonAmount: "deleteConfirmButtonAmount",
}));
describe("RemoveLanguagesButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDeleteProfileLanguages as jest.Mock).mockReturnValue({
      handleDeleteProfileLanguages,
      loading: false,
    });
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      deleteLanguages: {
        English: "English",
        German: "German",
      },
    });
  });

  it("renders delete button", () => {
    render(<RemoveLanguagesButton userId="user-1" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders delete amount", () => {
    render(<RemoveLanguagesButton userId="user-1" />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders translated delete text", () => {
    render(<RemoveLanguagesButton userId="user-1" />);
    expect(screen.getByText("delete")).toBeInTheDocument();
  });

  it("calls handleDeleteProfileLanguages", () => {
    render(<RemoveLanguagesButton userId="user-1" />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleDeleteProfileLanguages).toHaveBeenCalled();
  });

  it("passes userId to hook", () => {
    render(<RemoveLanguagesButton userId="abc-123" />);
    expect(useDeleteProfileLanguages).toHaveBeenCalledWith("abc-123");
  });

  it("renders loading state", () => {
    (useDeleteProfileLanguages as jest.Mock).mockReturnValue({
      handleDeleteProfileLanguages,
      loading: true,
    });
    render(<RemoveLanguagesButton userId="user-1" />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables button while loading", () => {
    (useDeleteProfileLanguages as jest.Mock).mockReturnValue({
      handleDeleteProfileLanguages,
      loading: true,
    });
    render(<RemoveLanguagesButton userId="user-1" />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("returns null when deleteLanguages empty", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      deleteLanguages: {},
    });
    const { container } = render(<RemoveLanguagesButton userId="user-1" />);
    expect(container.firstChild).toBeNull();
  });

  it("renders correct amount for one language", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      deleteLanguages: {
        English: "English",
      },
    });
    render(<RemoveLanguagesButton userId="user-1" />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("applies styles", () => {
    const { container } = render(<RemoveLanguagesButton userId="user-1" />);
    expect(
      container.querySelector(".removeLanguagesButton"),
    ).toBeInTheDocument();
    expect(
      container.querySelector(".deleteConfirmButtonAmount"),
    ).toBeInTheDocument();
  });
});
