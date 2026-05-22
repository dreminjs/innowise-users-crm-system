import { render, screen, fireEvent } from "@testing-library/react";
import { AddLanguageModal } from "./AddLanguageModal";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));
jest.mock("./AddLanguageForm", () => ({
  AddLanguageForm: ({
    onToggle,
    currentUserId,
  }: {
    onToggle: () => void;
    currentUserId: string;
  }) => (
    <div>
      <div>
        user:
        {currentUserId}
      </div>
      <button type="button" onClick={onToggle}>
        form-toggle
      </button>
    </div>
  ),
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({
    open,
    toggleAction,
    title,
    children,
  }: {
    open: boolean;
    toggleAction: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <div>
        open:
        {String(open)}
      </div>
      <div>
        title:
        {title}
      </div>
      <button type="button" onClick={toggleAction}>
        modal-toggle
      </button>
      {children}
    </div>
  ),
}));

describe("AddLanguageModal", () => {
  const onToggle = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("renders FormModal", () => {
    render(
      <AddLanguageModal open={true} onToggle={onToggle} userId="user-1" />,
    );
    expect(screen.getByText("open:true")).toBeInTheDocument();
  });

  it("passes translated title", () => {
    render(
      <AddLanguageModal open={true} onToggle={onToggle} userId="user-1" />,
    );
    expect(screen.getByText("title:add")).toBeInTheDocument();
  });

  it("renders AddLanguageForm when userId exists", () => {
    render(
      <AddLanguageModal open={true} onToggle={onToggle} userId="user-1" />,
    );
    expect(screen.getByText("user:user-1")).toBeInTheDocument();
  });

  it("does not render AddLanguageForm when userId empty", () => {
    render(<AddLanguageModal open={true} onToggle={onToggle} userId="" />);
    expect(screen.queryByText(/user:/)).not.toBeInTheDocument();
  });

  it("passes open prop to FormModal", () => {
    render(
      <AddLanguageModal open={false} onToggle={onToggle} userId="user-1" />,
    );
    expect(screen.getByText("open:false")).toBeInTheDocument();
  });
  it("calls onToggle from modal", () => {
    render(
      <AddLanguageModal open={true} onToggle={onToggle} userId="user-1" />,
    );
    fireEvent.click(screen.getByText("modal-toggle"));
    expect(onToggle).toHaveBeenCalled();
  });
  it("passes onToggle to AddLanguageForm", () => {
    render(
      <AddLanguageModal open={true} onToggle={onToggle} userId="user-1" />,
    );
    fireEvent.click(screen.getByText("form-toggle"));
    expect(onToggle).toHaveBeenCalled();
  });
  it("passes currentUserId to AddLanguageForm", () => {
    render(
      <AddLanguageModal open={true} onToggle={onToggle} userId="abc-123" />,
    );
    expect(screen.getByText("user:abc-123")).toBeInTheDocument();
  });
});
