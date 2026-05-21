import { act, fireEvent, render, screen } from "@testing-library/react";
import { UploadInfo } from "./UploadInfo";
import { useQuery } from "@apollo/client/react";
import { useUpdateProfile } from "@/modules/Users/model/hooks/useUpdateProfile";
import { useUpdateUser } from "@/modules/Users/model/hooks/useUpdateUser";

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/modules/Users/model/hooks/useUpdateProfile", () => ({
  useUpdateProfile: jest.fn(),
}));
jest.mock("@/modules/Users/model/hooks/useUpdateUser", () => ({
  useUpdateUser: jest.fn(),
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
describe("UploadInfo", () => {
  const updateProfileMock = jest.fn();
  const updateUserMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useUpdateProfile as unknown as jest.Mock).mockReturnValue({
      onSubmit: updateProfileMock,
      loading: false,
    });
    (useUpdateUser as unknown as jest.Mock).mockReturnValue({
      onSubmit: updateUserMock,
      loading: false,
    });
  });
  it("should render loading", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      data: null,
    });
    render(
      <UploadInfo
        userId="1"
        isAvailable={true}
        firstName="John"
        lastName="Doe"
        positionId="10"
        departmentId="20"
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
      <UploadInfo
        userId="1"
        isAvailable={true}
        firstName="John"
        lastName="Doe"
        positionId="10"
        departmentId="20"
      />,
    );
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
  });
  it("should render fields", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UploadInfo
        userId="1"
        isAvailable={true}
        firstName="John"
        lastName="Doe"
        positionId="10"
        departmentId="20"
      />,
    );
    expect(screen.getByText("firstName")).toBeInTheDocument();
    expect(screen.getByText("lastName")).toBeInTheDocument();
    expect(screen.getByText("department")).toBeInTheDocument();
    expect(screen.getByText("position")).toBeInTheDocument();
  });

  it("should render submit button", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UploadInfo
        userId="1"
        isAvailable={true}
        firstName="John"
        lastName="Doe"
        positionId="10"
        departmentId="20"
      />,
    );
    expect(screen.getByText("SUBMIT")).toBeInTheDocument();
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
      <UploadInfo
        userId="1"
        isAvailable={true}
        firstName="John"
        lastName="Doe"
        positionId="10"
        departmentId="20"
      />,
    );
    await act(async () => {
      fireEvent.submit(
        screen.getByRole("button").closest("form") as HTMLFormElement,
      );
    });
    expect(updateProfileMock).toHaveBeenCalled();
    expect(updateUserMock).toHaveBeenCalled();
  });
  it("should hide submit button when unavailable", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      data: {
        departments: [],
        positions: [],
      },
    });
    render(
      <UploadInfo
        userId="1"
        isAvailable={false}
        firstName="John"
        lastName="Doe"
        positionId="10"
        departmentId="20"
      />,
    );
    expect(screen.queryByText("SUBMIT")).not.toBeInTheDocument();
  });
});
