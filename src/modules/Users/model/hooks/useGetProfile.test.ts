import { renderHook } from "@testing-library/react";
import { useGetProfile } from "./useGetProfile";
import { useQuery } from "@apollo/client/react";
import { useDynamicSegment } from "@/application/store/dynamicSegment.store";

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));
jest.mock("@/application/store/dynamicSegment.store", () => ({
  useDynamicSegment: jest.fn(),
}));
describe("useGetProfile", () => {
  const setSegmentMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useDynamicSegment as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        setSegment: setSegmentMock,
      }),
    );
  });
  it("should call query with user id", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });
    renderHook(() => useGetProfile("1"));
    expect(useQuery).toHaveBeenCalledWith(expect.anything(), {
      variables: {
        userId: "1",
      },
    });
  });
  it("should set full name segment", () => {
    const data = {
      user: {
        profile: {
          first_name: "John",
          last_name: "Doe",
        },
      },
    };
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data,
      loading: false,
      error: null,
    });
    renderHook(() => useGetProfile("1"));
    expect(setSegmentMock).toHaveBeenCalledWith("John Doe");
  });
  it("should set email segment", () => {
    const data = {
      user: {
        email: "test@test.com",
        profile: {
          first_name: null,
          last_name: null,
        },
      },
    };
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data,
      loading: false,
      error: null,
    });
    renderHook(() => useGetProfile("1"));
    expect(setSegmentMock).toHaveBeenCalledWith("test@test.com");
  });
  it("should not set segment when error exists", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error: new Error("Test error"),
    });
    renderHook(() => useGetProfile("1"));
    expect(setSegmentMock).not.toHaveBeenCalled();
  });

  it("should return loading state", () => {
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    const { result } = renderHook(() => useGetProfile("1"));
    expect(result.current.loading).toBe(true);
  });
  it("should return error state", () => {
    const error = new Error("Test error");
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data: null,
      loading: false,
      error,
    });
    const { result } = renderHook(() => useGetProfile("1"));
    expect(result.current.error).toBe(error);
  });
  it("should return data", () => {
    const data = {
      user: {
        email: "test@test.com",
        profile: {
          first_name: null,
          last_name: null,
        },
      },
    };
    (useQuery as unknown as jest.Mock).mockReturnValue({
      data,
      loading: false,
      error: null,
    });
    const { result } = renderHook(() => useGetProfile("1"));
    expect(result.current.data).toBe(data);
  });
});
