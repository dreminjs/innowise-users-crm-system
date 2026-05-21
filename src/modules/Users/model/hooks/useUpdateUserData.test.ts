import { act, renderHook } from "@testing-library/react";
import { useUpdateUserData } from "./useUpdateUserData";
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

describe("useUpdateUserData", () => {
  const updateUserMock = jest.fn();
  const updateProfileMock = jest.fn();
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
  it("should call update profile and update user mutations", async () => {
    (useMutation as unknown as jest.Mock)
      .mockReturnValueOnce([
        updateUserMock,
        {
          loading: false,
        },
      ])
      .mockReturnValueOnce([
        updateProfileMock,
        {
          loading: false,
        },
      ]);

    const { result } = renderHook(() =>
      useUpdateUserData({
        userId: "1",
      }),
    );
    const dto = {
      firstName: "John",
      lastName: "Doe",
      departmentId: "10",
      positionId: "20",
      role: UserRole.Employee,
    };

    await act(async () => {
      await result.current.submitAction(dto);
    });

    expect(updateProfileMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          first_name: "John",
          last_name: "Doe",
          userId: "1",
        },
      },
    });

    expect(updateUserMock).toHaveBeenCalledWith({
      variables: {
        user: {
          userId: "1",
          departmentId: "10",
          positionId: "20",
          role: UserRole.Employee,
        },
      },
      refetchQueries: expect.any(Array),
      awaitRefetchQueries: true,
    });
  });
  it("should show success notification", async () => {
    (useMutation as unknown as jest.Mock)
      .mockReturnValueOnce([
        updateUserMock,
        {
          loading: false,
        },
      ])
      .mockReturnValueOnce([
        updateProfileMock,
        {
          loading: false,
        },
      ]);
    const { result } = renderHook(() =>
      useUpdateUserData({
        userId: "1",
      }),
    );
    const dto = {
      firstName: "John",
      lastName: "Doe",
      departmentId: "10",
      positionId: "20",
      role: UserRole.Employee,
    };

    await act(async () => {
      await result.current.submitAction(dto);
    });

    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "userUpdatedSuccessfully",
      type: "success",
    });
  });
  it("should show error notification", async () => {
    const error = new Error("Update failed");
    updateProfileMock.mockRejectedValue(error);
    (useMutation as unknown as jest.Mock)
      .mockReturnValueOnce([
        updateUserMock,
        {
          loading: false,
        },
      ])
      .mockReturnValueOnce([
        updateProfileMock,
        {
          loading: false,
        },
      ]);
    const { result } = renderHook(() =>
      useUpdateUserData({
        userId: "1",
      }),
    );
    const dto = {
      firstName: "John",
      lastName: "Doe",
      departmentId: "10",
      positionId: "20",
      role: UserRole.Employee,
    };
    await expect(result.current.submitAction(dto)).rejects.toThrow(
      "Update failed",
    );
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "Update failed",
      type: "error",
    });
  });
  it("should return loading state", () => {
    (useMutation as unknown as jest.Mock)
      .mockReturnValueOnce([
        updateUserMock,
        {
          loading: true,
        },
      ])
      .mockReturnValueOnce([
        updateProfileMock,
        {
          loading: false,
        },
      ]);
    const { result } = renderHook(() =>
      useUpdateUserData({
        userId: "1",
      }),
    );
    expect(result.current.loading).toBe(true);
  });
  it("should return loading state when profile loading", () => {
    (useMutation as unknown as jest.Mock)
      .mockReturnValueOnce([
        updateUserMock,
        {
          loading: false,
        },
      ])
      .mockReturnValueOnce([
        updateProfileMock,
        {
          loading: true,
        },
      ]);
    const { result } = renderHook(() =>
      useUpdateUserData({
        userId: "1",
      }),
    );
    expect(result.current.loading).toBe(true);
  });
});
