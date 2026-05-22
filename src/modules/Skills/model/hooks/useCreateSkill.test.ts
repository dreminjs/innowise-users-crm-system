import { renderHook } from "@testing-library/react";
import { useCreateSkill } from "./useCreateSkill";
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
  CREATE_SKILL: "CREATE_SKILL",
}));

jest.mock("../../api/queries", () => ({
  GET_SKILLS: "GET_SKILLS",
}));
const { useMutation } = jest.requireMock("@apollo/client/react");
const { useMutationNotification } = jest.requireMock(
  "@/shared/helpers/useMutationNotification",
);

describe("useCreateSkill", () => {
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

  it("returns createSkill mutation", () => {
    const { result } = renderHook(() => useCreateSkill());
    expect(result.current.createSkill).toBe(mutationMock);
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
    const { result } = renderHook(() => useCreateSkill());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("error");
    expect(result.current.data).toEqual({
      id: "1",
    });
  });

  it("calls useMutationNotification with translated messages", () => {
    renderHook(() => useCreateSkill());
    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "skillCreatedSuccessfully",
      errorMessage: "failedToCreateSkill",
    });
  });

  it("calls useMutation with correct config", () => {
    const notifications = {
      onCompleted: jest.fn(),
      onError: jest.fn(),
    };
    useMutationNotification.mockReturnValue(notifications);
    renderHook(() => useCreateSkill());
    expect(useMutation).toHaveBeenCalledWith("CREATE_SKILL", {
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
    const { result } = renderHook(() => useCreateSkill());
    expect(result.current.loading).toBe(true);
  });

  it("returns error state", () => {
    useMutation.mockReturnValue([
      mutationMock,
      {
        error: "mutation-error",
      },
    ]);
    const { result } = renderHook(() => useCreateSkill());
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
    const { result } = renderHook(() => useCreateSkill());
    expect(result.current.data).toEqual({
      success: true,
    });
  });
});
