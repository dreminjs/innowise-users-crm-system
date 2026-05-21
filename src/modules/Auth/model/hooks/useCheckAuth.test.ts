import { renderHook } from "@testing-library/react";
import { useCheckAuth } from "./useCheckAuth";
import { useRouter } from "next/navigation";
import { useTokens } from "@/modules/Tokens";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/modules/Tokens", () => ({
  useTokens: jest.fn(),
}));
describe("useCheckAuth", () => {
  const push = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });
  it("should redirect to login if token is required and token does not exist", () => {
    (useTokens as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        accessToken: null,
      }),
    );
    renderHook(() => useCheckAuth(true));
    expect(push).toHaveBeenCalledWith("/login");
  });

  it("should redirect to home if token is not required and token exists", () => {
    (useTokens as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        accessToken: "token",
      }),
    );
    renderHook(() => useCheckAuth(false));
    expect(push).toHaveBeenCalledWith("/");
  });

  it("should not redirect if token is required and token exists", () => {
    (useTokens as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        accessToken: "token",
      }),
    );
    renderHook(() => useCheckAuth(true));
    expect(push).not.toHaveBeenCalled();
  });

  it("should not redirect if token is not required and token does not exist", () => {
    (useTokens as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        accessToken: null,
      }),
    );
    renderHook(() => useCheckAuth(false));
    expect(push).not.toHaveBeenCalled();
  });
});
