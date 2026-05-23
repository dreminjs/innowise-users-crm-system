import { renderHook } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { useCreateProject } from "./useCreateProject";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("@/modules/Projects/api/mutations", () => ({
  CREATE_PROJECT: "MOCK_CREATE_PROJECT",
}));

jest.mock("@/modules/Projects/api/queries", () => ({
  GET_PROJECTS: "MOCK_GET_PROJECTS",
}));

describe("useCreateProject hook", () => {
  const mockT = jest.fn((key: string) => `translated_${key}`);
  const mockNotifications = {
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };
  const mockCreateProjectFn = jest.fn();
  const mockMutationResult = { loading: false, data: null, error: undefined };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
    (useMutation as jest.Mock).mockReturnValue([
      mockCreateProjectFn,
      mockMutationResult,
    ]);
  });

  it("should initialize translations with the 'Notifications' namespace", () => {
    renderHook(() => useCreateProject());

    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });

  it("should pass correctly translated messages to useMutationNotification", () => {
    renderHook(() => useCreateProject());

    expect(mockT).toHaveBeenCalledWith("projectCreatedSuccessfully");
    expect(mockT).toHaveBeenCalledWith("failedToCreateProject");

    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "translated_projectCreatedSuccessfully",
      errorMessage: "translated_failedToCreateProject",
    });
  });

  it("should call useMutation with CREATE_PROJECT, notifications, and refetchQueries", () => {
    renderHook(() => useCreateProject());

    expect(useMutation).toHaveBeenCalledWith("MOCK_CREATE_PROJECT", {
      ...mockNotifications,
      refetchQueries: ["MOCK_GET_PROJECTS"],
    });
  });

  it("should return the mutation function and the result properties correctly flattened", () => {
    const { result } = renderHook(() => useCreateProject());

    expect(result.current).toEqual({
      createProject: mockCreateProjectFn,
      loading: false,
      data: null,
      error: undefined,
    });
  });
});
