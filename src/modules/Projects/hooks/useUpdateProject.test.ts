import { renderHook } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { useUpdateCvProject, useUpdateProject } from "./useUpdateProject";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("../api/mutations", () => ({
  UPDATE_CV_PROJECT: "MOCK_UPDATE_CV_PROJECT",
  UPDATE_PROJECT: "MOCK_UPDATE_PROJECT",
}));

jest.mock("../api/queries", () => ({
  GET_CV_PROJECTS: "MOCK_GET_CV_PROJECTS",
  GET_PROJECTS: "MOCK_GET_PROJECTS",
}));

describe("Project Mutation Hooks", () => {
  const mockT = jest.fn((key: string) => `translated_${key}`);
  const mockNotifications = {
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
  });

  describe("useUpdateCvProject", () => {
    const mockCvId = "cv-999";
    const mockMutationTuple = [jest.fn(), { loading: false }];

    beforeEach(() => {
      (useMutation as jest.Mock).mockReturnValue(mockMutationTuple);
    });

    it("should initialize translations with 'Notifications' namespace", () => {
      renderHook(() => useUpdateCvProject(mockCvId));
      expect(useTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("should pass update messages to useMutationNotification", () => {
      renderHook(() => useUpdateCvProject(mockCvId));
      expect(mockT).toHaveBeenCalledWith("projectUpdatedSuccessfully");
      expect(mockT).toHaveBeenCalledWith("failedToUpdateProject");
    });

    it("should invoke useMutation with UPDATE_CV_PROJECT and specific refetch variables", () => {
      renderHook(() => useUpdateCvProject(mockCvId));

      expect(useMutation).toHaveBeenCalledWith("MOCK_UPDATE_CV_PROJECT", {
        ...mockNotifications,
        refetchQueries: [
          {
            query: "MOCK_GET_CV_PROJECTS",
            variables: { cvId: mockCvId },
          },
        ],
      });
    });

    it("should return the unmodified useMutation response array", () => {
      const { result } = renderHook(() => useUpdateCvProject(mockCvId));
      expect(result.current).toEqual(mockMutationTuple);
    });
  });

  describe("useUpdateProject", () => {
    const mockUpdateProjectFn = jest.fn();
    const mockMutationResult = { loading: true, data: null };

    beforeEach(() => {
      (useMutation as jest.Mock).mockReturnValue([
        mockUpdateProjectFn,
        mockMutationResult,
      ]);
    });

    it("should initialize translations with 'Notifications' namespace", () => {
      renderHook(() => useUpdateProject());
      expect(useTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("should invoke useMutation with UPDATE_PROJECT and flat refetch array", () => {
      renderHook(() => useUpdateProject());

      expect(useMutation).toHaveBeenCalledWith("MOCK_UPDATE_PROJECT", {
        ...mockNotifications,
        refetchQueries: ["MOCK_GET_PROJECTS"],
      });
    });

    it("should return a flattened object containing the mutation function and results", () => {
      const { result } = renderHook(() => useUpdateProject());

      expect(result.current).toEqual({
        updateProject: mockUpdateProjectFn,
        loading: true,
        data: null,
      });
    });
  });
});
