import { renderHook } from "@testing-library/react";
import { useAuthForm } from "./useAuthForm";

describe("useAuthForm", () => {
  it("should return register function", () => {
    const { result } = renderHook(() => useAuthForm());
    expect(result.current.register).toBeDefined();
  });

  it("should return handleSubmit function", () => {
    const { result } = renderHook(() => useAuthForm());
    expect(result.current.handleSubmit).toBeDefined();
  });

  it("should return errors object", () => {
    const { result } = renderHook(() => useAuthForm());
    expect(result.current.errors).toEqual({});
  });
});
