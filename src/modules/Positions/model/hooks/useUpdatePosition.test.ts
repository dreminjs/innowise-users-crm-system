import { renderHook } from "@testing-library/react";
import { useUpdatePosition } from "./useUpdatePosition";
import { useMutation } from "@apollo/client/react";
import { useMutationNotification } from "@/shared/helpers/useMutationNotification";
import { GET_POSITIONS } from "../../api/queries";
import { UPDATE_POSITION } from "../../api/mutations";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("../../api/queries", () => ({
  GET_POSITIONS: "MOCK_GET_POSITIONS",
}));

jest.mock("../../api/mutations", () => ({
  UPDATE_POSITION: "MOCK_UPDATE_POSITION",
}));

jest.mock("@/shared/helpers/useMutationNotification", () => ({
  useMutationNotification: jest.fn(),
}));

jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));

describe("useUpdatePosition", () => {
  const mockUpdatePositionFn = jest.fn();
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
      mockUpdatePositionFn,
      mockMutationResult,
    ]);
  });

  it("calls useMutationNotification with correct translation keys", () => {
    renderHook(() => useUpdatePosition());

    expect(useMutationNotification).toHaveBeenCalledTimes(1);
    expect(useMutationNotification).toHaveBeenCalledWith({
      successMessage: "positionUpdatedSuccessfully",
      errorMessage: "failedToUpdatePosition",
    });
  });

  it("initializes useMutation with correct mutation and options", () => {
    renderHook(() => useUpdatePosition());

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(useMutation).toHaveBeenCalledWith(UPDATE_POSITION, {
      ...mockNotificationsConfig,
      refetchQueries: [GET_POSITIONS],
    });
  });

  it("returns the update function and mutation result", () => {
    const { result } = renderHook(() => useUpdatePosition());

    expect(result.current).toEqual({
      updatePosition: mockUpdatePositionFn,
      loading: false,
      data: null,
      error: undefined,
    });
  });
});
