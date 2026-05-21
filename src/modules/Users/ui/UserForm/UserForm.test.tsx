import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { UserForm } from "./UserForm";
import { useQuery } from "@apollo/client/react";
import { useUserStore } from "@/application/store/user.store";
import { useUserForm } from "@/modules/Users/model/hooks/useUserForm";
import { UserRole } from "@/generated/graphql";

jest.mock("react-hook-form", () => ({
  Controller: ({
    render,
  }: {
    render: ({
      field,
    }: {
      field: {
        value: string;
      };
    }) => React.ReactNode;
  }) =>
    render({
      field: {
        value: "",
      },
    }),
}));

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("@/modules/Users/model/hooks/useUserForm", () => ({
  useUserForm: jest.fn(),
}));

jest.mock("@/shared/ui/Loading", () => ({
  Loading: () => <div>Loading...</div>,
}));

jest.mock("@/shared/ui/FormField", () => ({
  FormField: ({ label }: { label: string }) => <div>{label}</div>,
}));

jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({ label }: { label: string }) => <div>{label}</div>,
}));

jest.mock("@/shared/ui/ConfirmButtons", () => ({
  ConfirmButtons: ({ confirmLabel }: { confirmLabel: string }) => (
    <button type="submit">{confirmLabel}</button>
  ),
}));

describe("UserForm", () => {
  const submitActionMock = jest.fn();
  const cancelActionMock = jest.fn();
  const handleSubmitMock = jest.fn((callback) => async () => {
    await callback({});
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Admin,
      }),
    );
    (useUserForm as unknown as jest.Mock).mockReturnValue({
      register: jest.fn(),
      control: {},
      handleSubmit: handleSubmitMock,
      setValue: jest.fn(),
      formState: {
        errors: {},
      },
    });
  });
  it("should render loading", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("should render error", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: new Error("Test error"),
      data: null,
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
  });
  it("should render create fields", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.getByText("fields.email")).toBeInTheDocument();
    expect(screen.getByText("fields.password")).toBeInTheDocument();
    expect(screen.getByText("fields.firstName")).toBeInTheDocument();
    expect(screen.getByText("fields.lastName")).toBeInTheDocument();
  });

  it("should render edit fields", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UserForm
        mode="edit"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.queryByText("fields.email")).not.toBeInTheDocument();
    expect(screen.queryByText("fields.password")).not.toBeInTheDocument();
  });
  it("should render role field for admin", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.getByText("fields.role")).toBeInTheDocument();
  });
  it("should hide role field for employee", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        role: UserRole.Employee,
      }),
    );
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.queryByText("fields.role")).not.toBeInTheDocument();
  });
  it("should submit form", async () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    await act(async () => {
      fireEvent.submit(
        screen.getByRole("button").closest("form") as HTMLFormElement,
      );
    });
    expect(submitActionMock).toHaveBeenCalled();
  });
  it("should render confirm button", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UserForm
        mode="create"
        loading={false}
        submitAction={submitActionMock}
        cancelAction={cancelActionMock}
      />,
    );
    expect(screen.getByText("create.submit")).toBeInTheDocument();
  });
});
