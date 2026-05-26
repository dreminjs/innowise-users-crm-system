import { act, renderHook } from "@testing-library/react";
import { useUsersTable } from "./useUsersTable";
import { filterUsers } from "../utils/filterUsers";
import { sortUsers } from "../utils/sortUsers";
jest.mock("../utils/filterUsers", () => ({
  filterUsers: jest.fn(),
}));

jest.mock("../utils/sortUsers", () => ({
  sortUsers: jest.fn(),
}));

describe("useUsersTable", () => {
  const usersMock = [
    {
      id: "1",
      profile: {
        first_name: "John",
        last_name: "Doe",
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (filterUsers as unknown as jest.Mock).mockReturnValue(usersMock);
    (sortUsers as unknown as jest.Mock).mockReturnValue(usersMock);
  });
  it("should return default values", () => {
    const { result } = renderHook(() => useUsersTable(usersMock as never));
    expect(result.current.search).toBe("");
    expect(result.current.sortField).toBe("first_name");
    expect(result.current.sortOrder).toBe("asc");
    expect(result.current.users).toEqual(usersMock);
  });
  it("should set search value", () => {
    const { result } = renderHook(() => useUsersTable(usersMock as never));
    act(() => {
      result.current.setSearch("john");
    });
    expect(result.current.search).toBe("john");
  });

  it("should toggle sort order", () => {
    const { result } = renderHook(() => useUsersTable(usersMock as never));
    act(() => {
      result.current.handleSort("first_name");
    });
    expect(result.current.sortOrder).toBe("desc");
  });

  it("should change sort field", () => {
    const { result } = renderHook(() => useUsersTable(usersMock as never));
    act(() => {
      result.current.handleSort("last_name");
    });
    expect(result.current.sortField).toBe("last_name");
    expect(result.current.sortOrder).toBe("asc");
  });

  it("should call filterUsers", () => {
    renderHook(() => useUsersTable(usersMock as never));
    expect(filterUsers).toHaveBeenCalledWith(usersMock, "");
  });
  it("should call sortUsers", () => {
    renderHook(() => useUsersTable(usersMock as never));
    expect(sortUsers).toHaveBeenCalledWith(usersMock, "first_name", "asc");
  });
  it("should return empty array without users", () => {
    const { result } = renderHook(() => useUsersTable(undefined));
    expect(result.current.users).toEqual([]);
  });
});
