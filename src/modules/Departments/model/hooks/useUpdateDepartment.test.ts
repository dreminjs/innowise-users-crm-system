import { renderHook } from "@testing-library/react";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { UPDATE_DEPARTMENT } from "../../api/mutations";
import { GET_DEPARTMENTS } from "../../api/queries";
import { useUpdateDepartment } from "./useUpdateDepartment";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("../../api/mutations", () => ({
  UPDATE_DEPARTMENT: "UPDATE_DEPARTMENT_MUTATION",
}));

jest.mock("../../api/queries", () => ({
  GET_DEPARTMENTS: "GET_DEPARTMENTS_QUERY",
}));

describe("useUpdateDepartment Hook", () => {
  const mockTranslate = jest.fn((key: string) => key);
  const mockNotifications = { onCompleted: jest.fn(), onError: jest.fn() };
  const mockMutateFn = jest.fn();
  const mockResultObj = { loading: false, data: undefined, error: undefined };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(mockTranslate);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mockMutateFn,
      mockResultObj,
    ]);
  });

  it("should initialize translations with the 'Notifications' namespace", () => {
    renderHook(() => useUpdateDepartment());
    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });

  it("should initialize mutation notifications with correct success and error messages", () => {
    renderHook(() => useUpdateDepartment());

    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "departmentUpdatedSuccessfully",
      errorMessage: "failedToUpdateDepartment",
    });
  });

  it("should call useMutation with UPDATE_DEPARTMENT, notification callbacks, and correct refetchQueries", () => {
    renderHook(() => useUpdateDepartment());

    expect(useMutation).toHaveBeenCalledWith(UPDATE_DEPARTMENT, {
      ...mockNotifications,
      refetchQueries: [GET_DEPARTMENTS],
    });
  });

  it("should correctly map and return the mutation function alongside the result object", () => {
    const activeResultObj = { loading: true, data: undefined };
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mockMutateFn,
      activeResultObj,
    ]);

    const { result } = renderHook(() => useUpdateDepartment());

    expect(result.current).toEqual({
      updateDepartment: mockMutateFn,
      loading: true,
      data: undefined,
    });
  });
});
