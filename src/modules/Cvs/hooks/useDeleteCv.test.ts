import { renderHook } from "@testing-library/react";
import { useDeleteCv } from "./useDeleteCv";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("@apollo/client/react");
jest.mock("@/modules/Cvs/api/mutations", () => ({
  DELETE_CV: "DELETE_CV",
}));
jest.mock("@/modules/Cvs/api/queries", () => ({
  GET_CVS: "GET_CVS",
}));
jest.mock("@/shared/helpers/useMutationNotification");

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { DELETE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";

const mockUseTranslations = useTranslations as jest.Mock;
const mockUseMutation = useMutation as jest.Mock;
const mockUseMutationNotification = useMutationNotification as jest.Mock;

const mockMutationFn = jest.fn();
const mockNotifications = {
  onCompleted: jest.fn(),
  onError: jest.fn(),
};
const mockT = (key: string) => {
  const map: Record<string, string> = {
    cvDeletedSuccessfully: "CV deleted successfully",
    failedToDeleteCv: "Failed to delete CV",
  };
  return map[key] ?? key;
};

describe("useDeleteCv", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue(mockT);
    mockUseMutationNotification.mockReturnValue(mockNotifications);
    mockUseMutation.mockReturnValue([mockMutationFn, { loading: false }]);
  });

  describe("Initialization", () => {
    it("calls useTranslations with 'Notifications' namespace", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("calls useMutationNotification with correct success message", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          successMessage: "CV deleted successfully",
        }),
      );
    });

    it("calls useMutationNotification with correct error message", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          errorMessage: "Failed to delete CV",
        }),
      );
    });

    it("returns result of useMutation", () => {
      const { result } = renderHook(() => useDeleteCv());
      expect(result.current).toEqual([mockMutationFn, { loading: false }]);
    });
  });

  describe("useMutation call", () => {
    it("calls useMutation with DELETE_CV document", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        DELETE_CV,
        expect.any(Object),
      );
    });

    it("spreads notification handlers into useMutation options", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(mockNotifications),
      );
    });

    it("passes awaitRefetchQueries: true", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ awaitRefetchQueries: true }),
      );
    });

    it("passes refetchQueries with GET_CVS query", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          refetchQueries: [GET_CVS],
        }),
      );
    });

    it("calls useMutation exactly once on mount", () => {
      renderHook(() => useDeleteCv());
      expect(mockUseMutation).toHaveBeenCalledTimes(1);
    });
  });
});
