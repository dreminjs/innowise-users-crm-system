import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { useMutation } from "@apollo/client/react";
import { renderHook } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { useAddCvProject } from "./useAddCvProject";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("@/modules/Projects/api/mutations", () => ({
  ADD_CV_PROJECT: "MOCK_ADD_CV_PROJECT",
}));

jest.mock("@/modules/Projects/api/queries", () => ({
  GET_CV_PROJECTS: "MOCK_GET_CV_PROJECTS",
}));

describe("useAddCvProject", () => {
  const mockCvId = "cv-123";
  const mockT = jest.fn((key: string) => `translated_${key}`);
  const mockNotifications = {
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(mockT);
    (useMutationNotification as jest.Mock).mockReturnValue(mockNotifications);
    (useMutation as jest.Mock).mockReturnValue([
      "mockMutationFunction",
      { loading: false },
    ]);
  });

  it("must come up with translations with the appropriate namespace", () => {
    renderHook(() => useAddCvProject(mockCvId));

    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });

  it("must pass the correct messages to useMutationNotification", () => {
    renderHook(() => useAddCvProject(mockCvId));

    expect(mockT).toHaveBeenCalledWith("projectAddedSuccessfully");
    expect(mockT).toHaveBeenCalledWith("failedToAddProject");

    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "translated_projectAddedSuccessfully",
      errorMessage: "translated_failedToAddProject",
    });
  });

  it("must call useMutation with the correct query, notifications, and refetchQueries", () => {
    renderHook(() => useAddCvProject(mockCvId));

    expect(useMutation).toHaveBeenCalledWith("MOCK_ADD_CV_PROJECT", {
      ...mockNotifications,
      refetchQueries: [
        {
          query: "MOCK_GET_CV_PROJECTS",
          variables: {
            cvId: mockCvId,
          },
        },
      ],
    });
  });

  it("must return the result of executing useMutation", () => {
    const { result } = renderHook(() => useAddCvProject(mockCvId));

    expect(result.current).toEqual([
      "mockMutationFunction",
      { loading: false },
    ]);
  });
});
