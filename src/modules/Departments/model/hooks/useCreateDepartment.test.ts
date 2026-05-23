import { renderHook } from "@testing-library/react";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { CREATE_DEPARTMENT } from "../../api/mutations";
import { GET_DEPARTMENTS } from "../../api/queries";
import { useCreateDepartment } from "./useCreateDepartment";

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
  CREATE_DEPARTMENT: "CREATE_DEPARTMENT_MUTATION",
}));

jest.mock("../../api/queries", () => ({
  GET_DEPARTMENTS: "GET_DEPARTMENTS_QUERY",
}));

describe("useCreateDepartment Hook", () => {
  const mockTranslate = jest.fn((key: string) => key);
  const mockNotifications = { onCompleted: jest.fn(), onError: jest.fn() };
  const mockMutateFn = jest.fn();
  const mockResultObj = { loading: false, data: undefined, error: undefined };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(mockTranslate);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
    (useMutation as jest.Mock).mockReturnValue([mockMutateFn, mockResultObj]);
  });

  it("should initialize translations with the 'Notifications' namespace", () => {
    renderHook(() => useCreateDepartment());
    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });

  it("should initialize mutation notifications with correct success and error messages", () => {
    renderHook(() => useCreateDepartment());

    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "departmentCreatedSuccessfully",
      errorMessage: "failedToCreateDepartment",
    });
  });

  it("should call useMutation with CREATE_DEPARTMENT, notification callbacks, and correct refetchQueries", () => {
    renderHook(() => useCreateDepartment());

    expect(useMutation).toHaveBeenCalledWith(CREATE_DEPARTMENT, {
      ...mockNotifications,
      refetchQueries: [GET_DEPARTMENTS],
    });
  });

  it("should correctly map and return the mutation function alongside the result object", () => {
    const activeResultObj = { loading: true, data: undefined };
    (useMutation as jest.Mock).mockReturnValue([mockMutateFn, activeResultObj]);

    const { result } = renderHook(() => useCreateDepartment());

    expect(result.current).toEqual({
      createDepartment: mockMutateFn,
      loading: true,
      data: undefined,
    });
  });
});
