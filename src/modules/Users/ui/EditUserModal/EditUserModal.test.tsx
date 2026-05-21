import { act, fireEvent, render, screen } from "@testing-library/react";
import { EditUserModal } from "./EditUserModal";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../UserForm/UserForm", () => ({
  UserForm: ({
    submitAction,
    defaultValues,
  }: {
    submitAction: (values: unknown) => Promise<void>;
    defaultValues?: {
      firstName?: string;
    };
  }) => (
    <div>
      <button
        onClick={() =>
          submitAction({
            firstName: "John",
          })
        }
      >
        submit
      </button>
      <span>{defaultValues?.firstName}</span>
    </div>
  ),
}));

jest.mock("@/shared/ui/AddItemModal", () => ({
  AddItemModal: ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) => (
    <div>
      <span>{title}</span>
      {children}
    </div>
  ),
}));

describe("EditUserModal", () => {
  const closeActionMock = jest.fn();
  const submitActionMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render modal title", () => {
    render(
      <EditUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("edit.title")).toBeInTheDocument();
  });
  it("should render default values", () => {
    render(
      <EditUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
        defaultValues={{
          firstName: "John",
        }}
      />,
    );
    expect(screen.getByText("John")).toBeInTheDocument();
  });
  it("should call submit action", async () => {
    submitActionMock.mockResolvedValue(undefined);
    render(
      <EditUserModal
        open={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    await act(async () => {
      fireEvent.click(screen.getByText("submit"));
    });
    expect(submitActionMock).toHaveBeenCalledWith({
      firstName: "John",
    });
  });
  it("should pass loading prop", () => {
    render(
      <EditUserModal
        open={true}
        loading={true}
        closeAction={closeActionMock}
        submitAction={submitActionMock}
      />,
    );
    expect(screen.getByText("submit")).toBeInTheDocument();
  });
});
