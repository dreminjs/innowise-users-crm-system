import { act, renderHook } from "@testing-library/react";
import { useCreateUser } from "./useCreateUser";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";
import { UserRole } from "@/generated/graphql";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));

describe("useCreateUser", () => {
  const mutateMock = jest.fn();
  const addNotificationMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as unknown as jest.Mock).mockReturnValue(
      (key: string) => key,
    );
    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification: addNotificationMock,
      }),
    );
  });
  it("should call create user mutation", async () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useCreateUser());
    const dto = {
      email: "test@test.com",
      password: "123456",
      firstName: "John",
      lastName: "Doe",
      departmentId: "1",
      positionId: "2",
      role: UserRole.Employee,
    };

    await act(async () => {
      await result.current.submitAction(dto);
    });

    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        user: {
          auth: {
            email: dto.email,
            password: dto.password,
          },
          profile: {
            first_name: dto.firstName,
            last_name: dto.lastName,
          },
          cvsIds: [],
          departmentId: dto.departmentId,
          positionId: dto.positionId,
          role: dto.role,
        },
      },
    });
  });

  it("should return loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: true,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useCreateUser());
    expect(result.current.loading).toBe(true);
  });

  it("should return error state", () => {
    const error = new Error("Test error");

    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error,
      },
    ]);
    const { result } = renderHook(() => useCreateUser());
    expect(result.current.error).toBe(error);
  });
  it("should show success notification", () => {
    let options: {
      onCompleted: () => void;
      onError: (error: Error) => void;
    };
    (useMutation as unknown as jest.Mock).mockImplementation(
      (_mutation, config) => {
        options = config;
        return [
          mutateMock,
          {
            loading: false,
            error: null,
          },
        ];
      },
    );
    renderHook(() => useCreateUser());
    act(() => {
      options.onCompleted();
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "userCreatedSuccessfully",
      type: "success",
    });
  });
  it("should show error notification", () => {
    let options: {
      onCompleted: () => void;
      onError: (error: Error) => void;
    };
    (useMutation as unknown as jest.Mock).mockImplementation(
      (_mutation, config) => {
        options = config;

        return [
          mutateMock,
          {
            loading: false,
            error: null,
          },
        ];
      },
    );
    renderHook(() => useCreateUser());
    const error = new Error("Create user failed");
    act(() => {
      options.onError(error);
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Create user failed",
      type: "error",
    });
  });
});
