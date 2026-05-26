import { renderHook } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { useDeleteDepartment } from "./useDeleteDepartment";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("../../api/queries", () => ({
  GET_DEPARTMENTS: "MOCK_GET_DEPARTMENTS",
}));

jest.mock("../../api/mutations", () => ({
  DELETE_DEPARTMENT: "MOCK_DELETE_DEPARTMENT",
}));

describe("useDeleteDepartment hook", () => {
  const mockT = jest.fn((key: string) => `translated_${key}`);
  const mockNotifications = {
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };
  const mockDeleteDepartmentFn = jest.fn();
  const mockMutationResult = { loading: false, data: null, error: undefined };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mockDeleteDepartmentFn,
      mockMutationResult,
    ]);
  });

  it("should initialize translations with the 'Notifications' namespace", () => {
    renderHook(() => useDeleteDepartment());

    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });

  it("should pass correctly translated messages to useMutationNotification", () => {
    renderHook(() => useDeleteDepartment());

    expect(mockT).toHaveBeenCalledWith("departmentDeletedSuccessfully");
    expect(mockT).toHaveBeenCalledWith("failedToDeleteDepartment");

    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "translated_departmentDeletedSuccessfully",
      errorMessage: "translated_failedToDeleteDepartment",
    });
  });

  it("should call useMutation with DELETE_DEPARTMENT, notifications, and refetchQueries", () => {
    renderHook(() => useDeleteDepartment());

    expect(useMutation).toHaveBeenCalledWith("MOCK_DELETE_DEPARTMENT", {
      ...mockNotifications,
      refetchQueries: ["MOCK_GET_DEPARTMENTS"],
    });
  });

  it("should return the mutation function and the result properties correctly flattened", () => {
    const { result } = renderHook(() => useDeleteDepartment());

    expect(result.current).toEqual({
      deleteDepartment: mockDeleteDepartmentFn,
      loading: false,
      data: null,
      error: undefined,
    });
  });
});
