import { renderHook } from "@testing-library/react";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { DELETE_POSITION } from "../../api/mutations";
import { GET_POSITIONS } from "../../api/queries";
import { useDeletePosition } from "./useDeletePosition";

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
  DELETE_POSITION: "DELETE_POSITION_MUTATION",
}));

jest.mock("../../api/queries", () => ({
  GET_POSITIONS: "GET_POSITIONS_QUERY",
}));

describe("useDeletePosition Hook", () => {
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
    renderHook(() => useDeletePosition());
    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });

  it("should initialize mutation notifications with correct success and error messages", () => {
    renderHook(() => useDeletePosition());

    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "positionDeletedSuccessfully",
      errorMessage: "failedToDeletePosition",
    });
  });

  it("should call useMutation with DELETE_POSITION, notification callbacks, and correct refetchQueries", () => {
    renderHook(() => useDeletePosition());

    expect(useMutation).toHaveBeenCalledWith(DELETE_POSITION, {
      ...mockNotifications,
      refetchQueries: [GET_POSITIONS],
    });
  });

  it("should correctly map and return the mutation function alongside the result object", () => {
    const activeResultObj = { loading: true, data: undefined };
    (useMutation as jest.Mock).mockReturnValue([mockMutateFn, activeResultObj]);

    const { result } = renderHook(() => useDeletePosition());

    expect(result.current).toEqual({
      deletePosition: mockMutateFn,
      loading: true,
      data: undefined,
    });
  });
});
