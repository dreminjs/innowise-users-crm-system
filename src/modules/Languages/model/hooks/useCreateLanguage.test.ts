import { renderHook } from "@testing-library/react";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useCreateLanguage } from "./useCreateLanguage";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("../../api/queries", () => ({
  GET_LANGUAGES: "GET_LANGUAGES",
}));

jest.mock("../../api/mutations", () => ({
  CREATE_LANGUAGE: "CREATE_LANGUAGE",
}));

describe("useCreateLanguage", () => {
  const createLanguageMock = jest.fn();

  const mutationResult = {
    loading: false,
    error: null,
    data: undefined,
  };

  const notifications = {
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };
  const tMock = jest.fn((key) => key);
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(tMock);
    (useMutationNotification as jest.Mock).mockReturnValue(notifications);
    (useMutation as unknown as jest.Mock).mockReturnValue([
      createLanguageMock,
      mutationResult,
    ]);
  });

  it("returns mutation function", () => {
    const { result } = renderHook(() => useCreateLanguage());
    expect(result.current.createLanguage).toBe(createLanguageMock);
  });

  it("returns mutation result", () => {
    const { result } = renderHook(() => useCreateLanguage());
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeUndefined();
  });

  it("calls useMutationNotification with translated messages", () => {
    renderHook(() => useCreateLanguage());
    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "languageCreatedSuccessfully",
      errorMessage: "failedToCreateLanguage",
    });
  });

  it("calls useMutation with correct arguments", () => {
    renderHook(() => useCreateLanguage());
    expect(useMutation).toHaveBeenCalledWith("CREATE_LANGUAGE", {
      ...notifications,
      refetchQueries: ["GET_LANGUAGES"],
    });
  });
  it("uses Notifications namespace for translations", () => {
    renderHook(() => useCreateLanguage());
    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });
  it("passes through mutation loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      createLanguageMock,
      {
        loading: true,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useCreateLanguage());
    expect(result.current.loading).toBe(true);
  });

  it("passes through mutation error state", () => {
    const error = new Error("Mutation failed");
    (useMutation as unknown as jest.Mock).mockReturnValue([
      createLanguageMock,
      {
        loading: false,
        error,
      },
    ]);
    const { result } = renderHook(() => useCreateLanguage());
    expect(result.current.error).toBe(error);
  });
});
