import { renderHook } from "@testing-library/react";
import { useUpdateCvSkill } from "./useUpdateCvSkill";

// --- Mocks ---

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("@/modules/Cvs/api/mutations", () => ({
  UPDATE_CV_SKILL: "UPDATE_CV_SKILL",
}));
jest.mock("@/modules/Cvs/api/queries", () => ({
  GET_CV_SKILLS: "GET_CV_SKILLS",
}));
jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { UPDATE_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";

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
    skillUpdatedSuccessfully: "Skill updated successfully",
    failedToUpdateSkill: "Failed to update skill",
  };
  return map[key] ?? key;
};

describe("useUpdateCvSkill", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue(mockT);
    mockUseMutationNotification.mockReturnValue(mockNotifications);
    mockUseMutation.mockReturnValue([mockMutationFn, { loading: false }]);
  });

  describe("Initialization", () => {
    it("calls useTranslations with 'Notifications' namespace", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("calls useMutationNotification with correct success message", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          successMessage: "Skill updated successfully",
        }),
      );
    });

    it("calls useMutationNotification with correct error message", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          errorMessage: "Failed to update skill",
        }),
      );
    });

    it("returns result of useMutation", () => {
      const { result } = renderHook(() => useUpdateCvSkill("cv-1"));
      expect(result.current).toEqual([mockMutationFn, { loading: false }]);
    });
  });

  describe("useMutation call", () => {
    it("calls useMutation with UPDATE_CV_SKILL document", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        UPDATE_CV_SKILL,
        expect.any(Object),
      );
    });

    it("spreads notification handlers into useMutation options", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(mockNotifications),
      );
    });

    it("passes awaitRefetchQueries: true", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ awaitRefetchQueries: true }),
      );
    });

    it("passes refetchQueries with GET_CV_SKILLS query", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          refetchQueries: expect.arrayContaining([
            expect.objectContaining({ query: GET_CV_SKILLS }),
          ]),
        }),
      );
    });

    it("passes correct cvId in refetchQueries variables", () => {
      renderHook(() => useUpdateCvSkill("cv-123"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          refetchQueries: [
            {
              query: GET_CV_SKILLS,
              variables: { cvId: "cv-123" },
            },
          ],
        }),
      );
    });

    it("calls useMutation exactly once on mount", () => {
      renderHook(() => useUpdateCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledTimes(1);
    });

    it("updates refetchQueries variables when cvId changes", () => {
      const { rerender } = renderHook(
        ({ cvId }: { cvId: string }) => useUpdateCvSkill(cvId),
        { initialProps: { cvId: "cv-1" } },
      );

      rerender({ cvId: "cv-2" });

      const lastCall = mockUseMutation.mock.calls.at(-1);
      expect(lastCall[1].refetchQueries).toEqual([
        {
          query: GET_CV_SKILLS,
          variables: { cvId: "cv-2" },
        },
      ]);
    });
  });
});
