import { renderHook } from "@testing-library/react";
import { useAddCvSkill } from "./useAddCvSkill";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { ADD_CV_SKILL } from "@/modules/Cvs/api/mutations";
import { GET_CV_SKILLS } from "@/modules/Cvs/api/queries";
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("@/modules/Cvs/api/mutations", () => ({
  ADD_CV_SKILL: "ADD_CV_SKILL",
}));
jest.mock("@/modules/Cvs/api/queries", () => ({
  GET_CV_SKILLS: "GET_CV_SKILLS",
}));
jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

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
    skillAddedSuccessfully: "Skill added successfully",
    failedToAddSkill: "Failed to add skill",
  };
  return map[key] ?? key;
};

describe("useAddCvSkill", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTranslations.mockReturnValue(mockT);
    mockUseMutationNotification.mockReturnValue(mockNotifications);
    mockUseMutation.mockReturnValue([mockMutationFn, { loading: false }]);
  });

  describe("Initialization", () => {
    it("calls useTranslations with 'Notifications' namespace", () => {
      renderHook(() => useAddCvSkill("cv-1"));
      expect(mockUseTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("calls useMutationNotification with correct success message", () => {
      renderHook(() => useAddCvSkill("cv-1"));
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          successMessage: "Skill added successfully",
        }),
      );
    });

    it("calls useMutationNotification with correct error message", () => {
      renderHook(() => useAddCvSkill("cv-1"));
      expect(mockUseMutationNotification).toHaveBeenCalledWith(
        expect.objectContaining({
          errorMessage: "Failed to add skill",
        }),
      );
    });

    it("returns result of useMutation", () => {
      const { result } = renderHook(() => useAddCvSkill("cv-1"));
      expect(result.current).toEqual([mockMutationFn, { loading: false }]);
    });
  });

  describe("useMutation call", () => {
    it("calls useMutation with ADD_CV_SKILL document", () => {
      renderHook(() => useAddCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        ADD_CV_SKILL,
        expect.any(Object),
      );
    });

    it("spreads notification handlers into useMutation options", () => {
      renderHook(() => useAddCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining(mockNotifications),
      );
    });

    it("passes awaitRefetchQueries: true", () => {
      renderHook(() => useAddCvSkill("cv-1"));
      expect(mockUseMutation).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ awaitRefetchQueries: true }),
      );
    });

    it("passes refetchQueries with GET_CV_SKILLS query", () => {
      renderHook(() => useAddCvSkill("cv-1"));
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
      renderHook(() => useAddCvSkill("cv-123"));
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

    it("updates refetchQueries variables when cvId changes", () => {
      const { rerender } = renderHook(
        ({ cvId }: { cvId: string }) => useAddCvSkill(cvId),
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
