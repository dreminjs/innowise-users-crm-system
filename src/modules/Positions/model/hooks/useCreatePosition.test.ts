import { renderHook } from "@testing-library/react";
import { useCreatePosition } from "./useCreatePosition";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { GET_POSITIONS } from "../../api/queries";
import { CREATE_POSITION } from "../../api/mutations";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../api/queries", () => ({
  GET_POSITIONS: "MOCK_GET_POSITIONS",
}));

jest.mock("../../api/mutations", () => ({
  CREATE_POSITION: "MOCK_CREATE_POSITION",
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

describe("Hook useCreatePosition", () => {
  const mockCreatePositionFn = jest.fn();
  const mockMutationResult = { loading: false, data: null, error: undefined };
  const mockNotificationsConfig = {
    onCompleted: jest.fn(),
    onError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useMutationNotification as jest.Mock).mockReturnValue(
      mockNotificationsConfig,
    );

    (useMutation as unknown as jest.Mock).mockReturnValue([
      mockCreatePositionFn,
      mockMutationResult,
    ]);
  });

  it("must call useMutationNotification with the correct translation keys", () => {
    renderHook(() => useCreatePosition());

    expect(useMutationNotification).toHaveBeenCalledTimes(1);
    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "positionCreatedSuccessfully",
      errorMessage: "failedToCreatePosition",
    });
  });

  it("must initialize useMutation with the correct mutation and parameters", () => {
    renderHook(() => useCreatePosition());

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(useMutation).toHaveBeenCalledWith(CREATE_POSITION, {
      ...mockNotificationsConfig,
      refetchQueries: [GET_POSITIONS],
    });
  });

  it("must return the creation function and the mutation result", () => {
    const { result } = renderHook(() => useCreatePosition());

    expect(result.current).toEqual({
      createPosition: mockCreatePositionFn,
      loading: false,
      data: null,
      error: undefined,
    });
  });
});
