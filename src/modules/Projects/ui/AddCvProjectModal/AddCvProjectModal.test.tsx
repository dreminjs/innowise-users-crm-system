import { render, screen, fireEvent } from "@testing-library/react";
import { AddCvProjectModal } from "./AddCvProjectModal";

const mockCloseAction = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

type MockAddCvProjectFormProps = {
  cvId: string;
  closeAction: () => void;
};

jest.mock("./AddCvProjectForm", () => ({
  AddCvProjectForm: ({ cvId, closeAction }: MockAddCvProjectFormProps) => (
    <div>
      <div>
        form-cvId:
        {cvId}
      </div>
      <button type="button" onClick={closeAction}>
        form-close
      </button>
    </div>
  ),
}));

jest.mock("./AddCvProjectModal.module.css", () => ({
  backdrop: "backdrop",
  modal: "modal",
  header: "header",
  title: "title",
  close: "close",
}));

describe("AddCvProjectModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null when modal is closed", () => {
    const { container } = render(
      <AddCvProjectModal
        cvId="cv-1"
        open={false}
        closeAction={mockCloseAction}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders title", () => {
    render(
      <AddCvProjectModal cvId="cv-1" open closeAction={mockCloseAction} />,
    );
    expect(screen.getByText("title")).toBeInTheDocument();
  });
  it("renders AddCvProjectForm", () => {
    render(
      <AddCvProjectModal cvId="cv-123" open closeAction={mockCloseAction} />,
    );
    expect(screen.getByText("form-cvId:cv-123")).toBeInTheDocument();
  });

  it("calls closeAction on backdrop click", () => {
    const { container } = render(
      <AddCvProjectModal cvId="cv-1" open closeAction={mockCloseAction} />,
    );
    fireEvent.click(container.querySelector(".backdrop") as HTMLElement);
    expect(mockCloseAction).toHaveBeenCalled();
  });

  it("calls closeAction on close button click", () => {
    render(
      <AddCvProjectModal cvId="cv-1" open closeAction={mockCloseAction} />,
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "×",
      }),
    );
    expect(mockCloseAction).toHaveBeenCalled();
  });

  it("passes closeAction to AddCvProjectForm", () => {
    render(
      <AddCvProjectModal cvId="cv-1" open closeAction={mockCloseAction} />,
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "form-close",
      }),
    );
    expect(mockCloseAction).toHaveBeenCalled();
  });
  it("renders modal container", () => {
    const { container } = render(
      <AddCvProjectModal cvId="cv-1" open closeAction={mockCloseAction} />,
    );
    expect(container.querySelector(".modal")).toBeInTheDocument();
  });
});
