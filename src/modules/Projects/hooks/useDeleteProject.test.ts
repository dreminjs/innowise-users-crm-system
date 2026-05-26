import { renderHook } from "@testing-library/react";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { DELETE_PROJECT, REMOVE_CV_PROJECT } from "../api/mutations";
import { GET_CV_PROJECTS, GET_PROJECTS } from "../api/queries";
import { useDeleteProject, useRemoveCvProject } from "./useDeleteProject";

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
  DELETE_PROJECT: "DELETE_PROJECT_MUTATION",
  REMOVE_CV_PROJECT: "REMOVE_CV_PROJECT_MUTATION",
}));

jest.mock("../api/queries", () => ({
  GET_CV_PROJECTS: "GET_CV_PROJECTS_QUERY",
  GET_PROJECTS: "GET_PROJECTS_QUERY",
}));

describe("Project Mutation Hooks", () => {
  const mockTranslate = jest.fn((key) => key);
  const mockNotifications = { onCompleted: jest.fn(), onError: jest.fn() };
  const mockMutationResult = [jest.fn(), { loading: false, data: {} }];

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(mockTranslate);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
    (useMutation as unknown as jest.Mock).mockReturnValue(mockMutationResult);
  });

  describe("useRemoveCvProject", () => {
    const mockCvId = "123-abc";

    it("should initialize translations with the 'Notifications' namespace", () => {
      renderHook(() => useRemoveCvProject(mockCvId));
      expect(useTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("should initialize mutation notifications with correct messages", () => {
      renderHook(() => useRemoveCvProject(mockCvId));
      expect(useMutationNotification).toHaveBeenCalledWith({
        successMessage: "projectRemovedSuccessfully",
        errorMessage: "failedToRemoveProject",
      });
    });

    it("should call useMutation with REMOVE_CV_PROJECT, notification callbacks, and correct refetchQueries", () => {
      renderHook(() => useRemoveCvProject(mockCvId));

      expect(useMutation).toHaveBeenCalledWith(REMOVE_CV_PROJECT, {
        ...mockNotifications,
        refetchQueries: [
          {
            query: GET_CV_PROJECTS,
            variables: {
              cvId: mockCvId,
            },
          },
        ],
      });
    });

    it("should return the result directly from useMutation", () => {
      const { result } = renderHook(() => useRemoveCvProject(mockCvId));
      expect(result.current).toEqual(mockMutationResult);
    });
  });

  describe("useDeleteProject", () => {
    it("should initialize translations with the 'Notifications' namespace", () => {
      renderHook(() => useDeleteProject());
      expect(useTranslations).toHaveBeenCalledWith("Notifications");
    });

    it("should initialize mutation notifications with correct messages", () => {
      renderHook(() => useDeleteProject());
      expect(useMutationNotification).toHaveBeenCalledWith({
        successMessage: "projectDeletedSuccessfully",
        errorMessage: "failedToDeleteProject",
      });
    });

    it("should call useMutation with DELETE_PROJECT, notification callbacks, and correct refetchQueries", () => {
      renderHook(() => useDeleteProject());

      expect(useMutation).toHaveBeenCalledWith(DELETE_PROJECT, {
        ...mockNotifications,
        refetchQueries: [GET_PROJECTS],
      });
    });

    it("should return the mutation function mapped as deleteProject along with the rest of the result object", () => {
      const mockMutateFn = jest.fn();
      const mockResultObj = { loading: true, error: undefined };

      (useMutation as unknown as jest.Mock).mockReturnValue([
        mockMutateFn,
        mockResultObj,
      ]);

      const { result } = renderHook(() => useDeleteProject());

      expect(result.current).toEqual({
        deleteProject: mockMutateFn,
        loading: true,
        error: undefined,
      });
    });
  });
});
