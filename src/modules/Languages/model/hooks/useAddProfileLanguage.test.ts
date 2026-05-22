import { renderHook, act } from "@testing-library/react";
import { useAddProfileLanguage } from "./useAddProfileLanguage";
import { useMutation, useQuery } from "@apollo/client/react";
import { useNotification } from "@/modules/Notifications";
import { useTranslations } from "next-intl";
import { Proficiency } from "@/generated/graphql";

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
  useQuery: jest.fn(),
}));
jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("../../api/queries", () => ({
  GET_LANGUAGES: "GET_LANGUAGES",
  GET_PROFILE_LANGUAGES: "GET_PROFILE_LANGUAGES",
}));
jest.mock("../../api/mutations", () => ({
  ADD_PROFILE_LANGUAGE: "ADD_PROFILE_LANGUAGE",
}));

describe("useAddProfileLanguage", () => {
  const mutateMock = jest.fn();
  const addNotification = jest.fn();
  const tMock = jest.fn((key) => key);
  beforeEach(() => {
    jest.clearAllMocks();
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

    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification,
      }),
    );

    (useTranslations as jest.Mock).mockReturnValue(tMock);
  });

  it("returns handler and mutation state", () => {
    const { result } = renderHook(() => useAddProfileLanguage("user-1"));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.handleAddProfileLanguage).toBe("function");
  });

  it("calls mutate with correct variables", async () => {
    const { result } = renderHook(() => useAddProfileLanguage("user-1"));

    await act(async () => {
      await result.current.handleAddProfileLanguage({
        name: "English",
        proficiency: Proficiency.A1,
      });
    });

    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          userId: "user-1",
          name: "English",
          proficiency: Proficiency.A1,
        },
      },
    });
  });

  it("does not call mutate without currentUserId", async () => {
    const { result } = renderHook(() => useAddProfileLanguage(""));

    await act(async () => {
      await result.current.handleAddProfileLanguage({
        name: "English",
        proficiency: Proficiency.A1,
      });
    });

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("does not call mutate when languages are missing", async () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
    });

    const { result } = renderHook(() => useAddProfileLanguage("user-1"));

    await act(async () => {
      await result.current.handleAddProfileLanguage({
        name: "English",
        proficiency: Proficiency.A1,
      });
    });

    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("passes success notification callback", () => {
    renderHook(() => useAddProfileLanguage("user-1"));

    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];

    mutationConfig.onCompleted();

    expect(addNotification).toHaveBeenCalledWith({
      message: "languageAddedSuccessfully",
      type: "success",
    });
  });

  it("passes error notification callback", () => {
    renderHook(() => useAddProfileLanguage("user-1"));

    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];

    mutationConfig.onError();

    expect(addNotification).toHaveBeenCalledWith({
      message: "failedToAddLanguage",
      type: "error",
    });
  });

  it("passes correct refetchQueries", () => {
    renderHook(() => useAddProfileLanguage("user-55"));

    const mutationConfig = (useMutation as unknown as jest.Mock).mock
      .calls[0][1];

    expect(mutationConfig.refetchQueries).toEqual([
      {
        query: "GET_PROFILE_LANGUAGES",
        variables: {
          userId: "user-55",
        },
      },
    ]);
  });
});
