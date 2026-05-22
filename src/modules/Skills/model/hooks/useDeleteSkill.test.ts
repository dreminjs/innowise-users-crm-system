import { renderHook } from "@testing-library/react";
import { useDeleteSkill } from "./useDeleteSkill";
const mutationMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));
jest.mock("../../api/mutations", () => ({
  DELETE_SKILL: "DELETE_SKILL",
}));
jest.mock("../../api/queries", () => ({
  GET_SKILLS: "GET_SKILLS",
}));
const { useMutation } = jest.requireMock("@apollo/client/react");
const { useMutationNotification } = jest.requireMock(
  "@/shared/helpers/useMutationNotification",
);
describe("useDeleteSkill", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useMutationNotification.mockReturnValue({
      onCompleted: jest.fn(),
      onError: jest.fn(),
    });

    useMutation.mockReturnValue([
      mutationMock,
      {
        loading: false,
        error: null,
        data: null,
      },
    ]);
  });

  it("returns deleteSkill mutation", () => {
    const { result } = renderHook(() => useDeleteSkill());
    expect(result.current.deleteSkill).toBe(mutationMock);
  });
  it("returns mutation result", () => {
    useMutation.mockReturnValue([
      mutationMock,
      {
        loading: true,
        error: "error",
        data: {
          id: "1",
        },
      },
    ]);
    const { result } = renderHook(() => useDeleteSkill());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("error");
    expect(result.current.data).toEqual({
      id: "1",
    });
  });
  it("calls useMutationNotification with translated messages", () => {
    renderHook(() => useDeleteSkill());
    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "skillDeletedSuccessfully",
      errorMessage: "failedToDeleteSkill",
    });
  });

  it("calls useMutation with correct config", () => {
    const notifications = {
      onCompleted: jest.fn(),
      onError: jest.fn(),
    };
    useMutationNotification.mockReturnValue(notifications);
    renderHook(() => useDeleteSkill());
    expect(useMutation).toHaveBeenCalledWith("DELETE_SKILL", {
      ...notifications,
      refetchQueries: ["GET_SKILLS"],
    });
  });
  it("returns loading state", () => {
    useMutation.mockReturnValue([
      mutationMock,
      {
        loading: true,
      },
    ]);
    const { result } = renderHook(() => useDeleteSkill());
    expect(result.current.loading).toBe(true);
  });

  it("returns error state", () => {
    useMutation.mockReturnValue([
      mutationMock,
      {
        error: "mutation-error",
      },
    ]);
    const { result } = renderHook(() => useDeleteSkill());
    expect(result.current.error).toBe("mutation-error");
  });
  it("returns data state", () => {
    useMutation.mockReturnValue([
      mutationMock,
      {
        data: {
          success: true,
        },
      },
    ]);
    const { result } = renderHook(() => useDeleteSkill());
    expect(result.current.data).toEqual({
      success: true,
    });
  });
});
