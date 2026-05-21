import { act, renderHook } from "@testing-library/react";
import { useTableState } from "./useTableState";

describe("useTableState", () => {
  it("should initialize state", () => {
    const { result } = renderHook(() =>
      useTableState({
        defaultField: "name",
      }),
    );
    expect(result.current.search).toBe("");
    expect(result.current.sortField).toBe("name");
    expect(result.current.sortOrder).toBe("asc");
  });

  it("should initialize custom sort order", () => {
    const { result } = renderHook(() =>
      useTableState({
        defaultField: "email",
        defaultOrder: "desc",
      }),
    );

    expect(result.current.sortOrder).toBe("desc");
  });
  it("should update search", () => {
    const { result } = renderHook(() =>
      useTableState({
        defaultField: "name",
      }),
    );

    act(() => {
      result.current.setSearch("john");
    });
    expect(result.current.search).toBe("john");
  });
  it("should toggle sort order", () => {
    const { result } = renderHook(() =>
      useTableState({
        defaultField: "name",
      }),
    );
    act(() => {
      result.current.handleSort("name");
    });
    expect(result.current.sortOrder).toBe("desc");
    act(() => {
      result.current.handleSort("name");
    });
    expect(result.current.sortOrder).toBe("asc");
  });

  it("should change sort field", () => {
    const { result } = renderHook(() =>
      useTableState({
        defaultField: "email",
      }),
    );
    act(() => {
      result.current.handleSort("email");
    });
    expect(result.current.sortField).toBe("email");
    expect(result.current.sortOrder).toBe("desc");
  });
});
