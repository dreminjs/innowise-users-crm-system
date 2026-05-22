import { renderHook, act } from "@testing-library/react";
import { useMutation, useQuery } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";
import { useUserStore } from "@/application/store/user.store";
import { useEditProfileLanguage } from "./useEditProfileLanguage";
import { Proficiency } from "@/generated/graphql";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("../../api/queries", () => ({
  GET_LANGUAGES: "GET_LANGUAGES",
  GET_PROFILE_LANGUAGES: "GET_PROFILE_LANGUAGES",
}));

jest.mock("../../api/mutations", () => ({
  UPDATE_PROFILE_LANGUAGE: "UPDATE_PROFILE_LANGUAGE",
}));

describe("useEditProfileLanguage", () => {
  const mutateMock = jest.fn();

  const addNotification = jest.fn();

  const tMock = jest.fn((key) => key);

  beforeEach(() => {
    jest.clearAllMocks();

    (useTranslations as jest.Mock).mockReturnValue(tMock);

    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification,
      }),
    );

    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: "user-1",
      }),
    );

    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        languages: [
          {
            id: "1",
            name: "English",
          },
        ],
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
    const { result } = renderHook(() => useEditProfileLanguage());

    expect(typeof result.current.handleEditProfileLanguage).toBe("function");

    expect(result.current.loading).toBe(false);

    expect(result.current.error).toBeNull();
  });

  it("calls mutate with correct variables", async () => {
    const { result } = renderHook(() => useEditProfileLanguage());

    await act(async () => {
      await result.current.handleEditProfileLanguage({
        name: "English",
        proficiency: Proficiency.B2,
      });
    });

    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          name: "English",
          proficiency: "B2",
          userId: "user-1",
        },
      },
    });
  });

  it("does not call mutate without currentUserId", async () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: null,
      }),
    );

    const { result } = renderHook(() => useEditProfileLanguage());

    await act(async () => {
      await result.current.handleEditProfileLanguage({
        name: "English",
        proficiency: Proficiency.C1,
      });
    });

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("does not call mutate when languages are missing", async () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
    });

    const { result } = renderHook(() => useEditProfileLanguage());

    await act(async () => {
      await result.current.handleEditProfileLanguage({
        name: "English",
        proficiency: Proficiency.B1,
      });
    });

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("shows success notification on completed", () => {
    renderHook(() => useEditProfileLanguage());

    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];

    mutationConfig.onCompleted();

    expect(addNotification).toHaveBeenCalledWith({
      message: "languageUpdatedSuccessfully",
      type: "success",
    });
  });

  it("shows error notification on error", () => {
    renderHook(() => useEditProfileLanguage());

    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];

    mutationConfig.onError();

    expect(addNotification).toHaveBeenCalledWith({
      message: "failedToUpdateLanguage",
      type: "error",
    });
  });

  it("passes correct refetchQueries", () => {
    renderHook(() => useEditProfileLanguage());

    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];

    expect(mutationConfig.refetchQueries).toEqual([
      {
        query: "GET_PROFILE_LANGUAGES",
        variables: {
          userId: "user-1",
        },
      },
    ]);
  });

  it("uses Notifications namespace", () => {
    renderHook(() => useEditProfileLanguage());

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

    const { result } = renderHook(() => useEditProfileLanguage());

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
    const { result } = renderHook(() => useEditProfileLanguage());
    expect(result.current.error).toBe(error);
  });
});
