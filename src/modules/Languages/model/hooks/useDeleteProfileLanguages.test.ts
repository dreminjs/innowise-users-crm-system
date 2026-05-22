import { renderHook, act } from "@testing-library/react";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";
import { useLanguageStore } from "../language.store";
import { useDeleteProfileLanguages } from "./useDeleteProfileLanguages";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));

jest.mock("../language.store", () => ({
  useLanguageStore: jest.fn(),
}));

jest.mock("../../api/mutations", () => ({
  DELETE_PROFILE_LANGUAGE: "DELETE_PROFILE_LANGUAGE",
}));

jest.mock("../../api/queries", () => ({
  GET_PROFILE_LANGUAGES: "GET_PROFILE_LANGUAGES",
}));

describe("useDeleteProfileLanguages", () => {
  const mutateMock = jest.fn();
  const addNotification = jest.fn();
  const clearDeleteLanguages = jest.fn();
  const toggleDeleteMode = jest.fn();
  const tMock = jest.fn((key) => key);
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as jest.Mock).mockReturnValue(tMock);
    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification,
      }),
    );

    (useLanguageStore as unknown as jest.Mock).mockReturnValue({
      clearDeleteLanguages,
      toggleDeleteMode,
      deleteLanguages: {
        English: "English",
        German: "German",
      },
    });
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);
  });

  it("returns handler and mutation state", () => {
    const { result } = renderHook(() => useDeleteProfileLanguages("user-1"));
    expect(typeof result.current.handleDeleteProfileLanguages).toBe("function");
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("calls mutate with correct variables", () => {
    const { result } = renderHook(() => useDeleteProfileLanguages("user-1"));
    act(() => {
      result.current.handleDeleteProfileLanguages();
    });
    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          name: ["English", "German"],
          userId: "user-1",
        },
      },
    });
  });

  it("shows success notification and clears state on completed", () => {
    renderHook(() => useDeleteProfileLanguages("user-1"));
    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];
    mutationConfig.onCompleted();
    expect(addNotification).toHaveBeenCalledWith({
      message: "languagesDeletedSuccessfully",
      type: "success",
    });
    expect(clearDeleteLanguages).toHaveBeenCalled();
    expect(toggleDeleteMode).toHaveBeenCalled();
  });

  it("shows error notification and clears state on error", () => {
    renderHook(() => useDeleteProfileLanguages("user-1"));
    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];
    mutationConfig.onError();
    expect(addNotification).toHaveBeenCalledWith({
      message: "failedToDeleteLanguages",
      type: "error",
    });
    expect(clearDeleteLanguages).toHaveBeenCalled();
    expect(toggleDeleteMode).toHaveBeenCalled();
  });

  it("passes correct refetchQueries", () => {
    renderHook(() => useDeleteProfileLanguages("user-77"));
    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];
    expect(mutationConfig.refetchQueries).toEqual([
      {
        query: "GET_PROFILE_LANGUAGES",
        variables: {
          userId: "user-77",
        },
      },
    ]);
  });

  it("uses Notifications namespace", () => {
    renderHook(() => useDeleteProfileLanguages("user-1"));
    expect(useTranslations).toHaveBeenCalledWith("Notifications");
  });
  it("passes through loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: true,
        error: null,
      },
    ]);
    const { result } = renderHook(() => useDeleteProfileLanguages("user-1"));
    expect(result.current.loading).toBe(true);
  });

  it("passes through error state", () => {
    const error = new Error("Mutation error");
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
        error,
      },
    ]);
    const { result } = renderHook(() => useDeleteProfileLanguages("user-1"));
    expect(result.current.error).toBe(error);
  });
});
