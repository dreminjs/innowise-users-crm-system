import { renderHook } from "@testing-library/react";
import { useUpdateCv } from "./useUpdateCv";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("@apollo/client/react");
jest.mock("@/modules/Cvs/api/mutations", () => ({
  UPDATE_CV: "UPDATE_CV",
}));
jest.mock("@/modules/Cvs/api/queries", () => ({
  GET_CVS: "GET_CVS",
}));
jest.mock("@/shared/helpers/useMutationNotification");

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { UPDATE_CV } from "@/modules/Cvs/api/mutations";
import { GET_CVS } from "@/modules/Cvs/api/queries";

const mockUseTranslations = useTranslations as jest.Mock;
const mockUseMutation = useMutation as unknown as jest.Mock;
const mockUseMutationNotification = useMutationNotification as jest.Mock;

const mockMutationFn = jest.fn();
const mockNotifications = {
  onCompleted: jest.fn(),
  onError: jest.fn(),
};
const mockT = (key: string) => {
  const map: Record<string, string> = {
    cvUpdatedSuccessfully: "CV updated successfully",
    failedToUpdateCv: "Failed to update CV",
  };
  return map[key] ?? key;
};

describe("useUpdateCv", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue(mockT);
    mockUseMutationNotification.mockReturnValue(mockNotifications);
    mockUseMutation.mockReturnValue([mockMutationFn, { loading: false }]);
  });

  describe("Initialization", () => {
    it("calls useTranslations with 'Notifications' namespace", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("calls useMutationNotification with correct success message", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          successMessage: "CV updated successfully",
        }),
      );
    });

    it("calls useMutationNotification with correct error message", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          errorMessage: "Failed to update CV",
        }),
      );
    });

    it("returns result of useMutation", () => {
      const { result } = renderHook(() => useUpdateCv());
      expect(result.current).toEqual([mockMutationFn, { loading: false }]);
    });
  });

  describe("useMutation call", () => {
    it("calls useMutation with UPDATE_CV document", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        UPDATE_CV,
        expect.any(Object),
      );
    });

    it("spreads notification handlers into useMutation options", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(mockNotifications),
      );
    });

    it("passes awaitRefetchQueries: true", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ awaitRefetchQueries: true }),
      );
    });

    it("passes refetchQueries with GET_CVS query", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          refetchQueries: [GET_CVS],
        }),
      );
    });

    it("calls useMutation exactly once on mount", () => {
      renderHook(() => useUpdateCv());
      expect(mockUseMutation).toHaveBeenCalledTimes(1);
    });
  });
});
