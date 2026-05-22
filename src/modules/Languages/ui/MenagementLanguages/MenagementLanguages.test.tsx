import { render, screen, fireEvent } from "@testing-library/react";
import { MenagementLanguages } from "./MenagementLanguages";
import { useLanguageStore } from "../../model/language.store";
const toggleDeleteMode = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("../../model/language.store", () => ({
  useLanguageStore: jest.fn(),
}));
jest.mock("@/shared/ui/AddNewButton", () => ({
  AddNewButton: ({
    onClick,
    label,
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <button type="button" onClick={onClick}>
      add:
      {label}
    </button>
  ),
}));
jest.mock("@/shared/ui/RemoveItemButton", () => ({
  RemoveItemButton: ({
    onClick,
    label,
  }: {
    onClick: () => void;
    label: string;
  }) => (
    <button type="button" onClick={onClick}>
      remove:
      {label}
    </button>
  ),
}));
jest.mock("./RemoveLanguagesButton", () => ({
  RemoveLanguagesButton: ({ userId }: { userId: string }) => (
    <div>
      remove-user:
      {userId}
    </div>
  ),
}));
jest.mock("./AddLanguageModal/AddLanguageModal", () => ({
  AddLanguageModal: ({
    userId,
    open,
    onToggle,
  }: {
    userId: string;
    open: boolean;
    onToggle: () => void;
  }) => (
    <div>
      <div>
        modal-user:
        {userId}
      </div>
      <div>
        modal-open:
        {String(open)}
      </div>
      <button type="button" onClick={onToggle}>
        toggle-modal
      </button>
    </div>
  ),
}));

jest.mock("../Languages.module.css", () => ({
  managementLanguages: "managementLanguages",
  menagementLanguages: "menagementLanguages",
  cancelDeleteButton: "cancelDeleteButton",
}));

describe("MenagementLanguages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      toggleDeleteMode,
      isDeleteMode: false,
    });
  });

  it("renders add button", () => {
    render(<MenagementLanguages userId="user-1" />);
    expect(screen.getByText("add:Languages.add")).toBeInTheDocument();
  });

  it("renders remove button", () => {
    render(<MenagementLanguages userId="user-1" />);
    expect(screen.getByText("remove:Languages.delete")).toBeInTheDocument();
  });

  it("opens modal on add click", () => {
    render(<MenagementLanguages userId="user-1" />);
    expect(screen.getByText("modal-open:false")).toBeInTheDocument();
    fireEvent.click(screen.getByText("add:Languages.add"));
    expect(screen.getByText("modal-open:true")).toBeInTheDocument();
  });

  it("toggles modal from modal action", () => {
    render(<MenagementLanguages userId="user-1" />);
    fireEvent.click(screen.getByText("toggle-modal"));
    expect(screen.getByText("modal-open:true")).toBeInTheDocument();
  });

  it("calls toggleDeleteMode on remove click", () => {
    render(<MenagementLanguages userId="user-1" />);
    fireEvent.click(screen.getByText("remove:Languages.delete"));
    expect(toggleDeleteMode).toHaveBeenCalled();
  });

  it("renders delete mode layout", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      toggleDeleteMode,
      isDeleteMode: true,
    });
    render(<MenagementLanguages userId="user-1" />);
    expect(screen.getByText("ConfirmButtons.cancel")).toBeInTheDocument();
    expect(screen.getByText("remove-user:user-1")).toBeInTheDocument();
  });

  it("calls toggleDeleteMode on cancel click", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      toggleDeleteMode,
      isDeleteMode: true,
    });
    render(<MenagementLanguages userId="user-1" />);
    fireEvent.click(screen.getByText("ConfirmButtons.cancel"));
    expect(toggleDeleteMode).toHaveBeenCalled();
  });

  it("passes userId to AddLanguageModal", () => {
    render(<MenagementLanguages userId="abc-123" />);
    expect(screen.getByText("modal-user:abc-123")).toBeInTheDocument();
  });

  it("passes userId to RemoveLanguagesButton", () => {
    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      toggleDeleteMode,
      isDeleteMode: true,
    });
    render(<MenagementLanguages userId="remove-id" />);
    expect(screen.getByText("remove-user:remove-id")).toBeInTheDocument();
  });

  it("applies managementLanguages class", () => {
    const { container } = render(<MenagementLanguages userId="user-1" />);
    expect(container.querySelector(".managementLanguages")).toBeInTheDocument();
  });

  it("renders modal closed initially", () => {
    render(<MenagementLanguages userId="user-1" />);
    expect(screen.getByText("modal-open:false")).toBeInTheDocument();
  });
});
