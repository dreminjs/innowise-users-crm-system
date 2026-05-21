import { act, renderHook } from "@testing-library/react";
import { useUploadAvatar } from "./useUploadAvatar";
import { useMutation } from "@apollo/client/react";
import { useTranslations } from "next-intl";
import { useNotification } from "@/modules/Notifications";
jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));
jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
describe("useUploadAvatar", () => {
  const mutateMock = jest.fn();
  const addNotificationMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as unknown as jest.Mock).mockReturnValue(
      (key: string) => key,
    );
    (useNotification as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        addNotification: addNotificationMock,
      }),
    );
  });
  it("should call upload avatar mutation", async () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: false,
      },
    ]);
    const { result } = renderHook(() => useUploadAvatar("1"));
    const dto = {
      userId: "1",
      base64: "base64string",
      size: 123,
      type: "image/png",
    };
    await act(async () => {
      await result.current.onSubmit(dto);
    });
    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto,
      },
    });
  });
  it("should return loading state", () => {
    (useMutation as unknown as jest.Mock).mockReturnValue([
      mutateMock,
      {
        loading: true,
      },
    ]);
    const { result } = renderHook(() => useUploadAvatar("1"));
    expect(result.current.loading).toBe(true);
  });
  it("should show success notification", () => {
    let options: {
      onCompleted: () => void;
      onError: () => void;
    };
    (useMutation as unknown as jest.Mock).mockImplementation(
      (_mutation, config) => {
        options = config;
        return [
          mutateMock,
          {
            loading: false,
          },
        ];
      },
    );
    renderHook(() => useUploadAvatar("1"));
    act(() => {
      options.onCompleted();
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      type: "success",
      message: "avatarUploadedSuccessfully",
    });
  });
  it("should show error notification", () => {
    let options: {
      onCompleted: () => void;
      onError: () => void;
    };
    (useMutation as unknown as jest.Mock).mockImplementation(
      (_mutation, config) => {
        options = config;

        return [
          mutateMock,
          {
            loading: false,
          },
        ];
      },
    );
    renderHook(() => useUploadAvatar("1"));
    act(() => {
      options.onError();
    });
    expect(addNotificationMock).toHaveBeenCalledWith({
      type: "error",
      message: "failedToUploadAvatar",
    });
  });
});
