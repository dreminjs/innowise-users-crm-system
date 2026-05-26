import { renderHook } from "@testing-library/react";
import { useQuery } from "@apollo/client/react";
import { useGetProjects } from "./useGetProjects";

jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/modules/Projects/api/queries", () => ({
  GET_CV_PROJECTS: "MOCK_GET_CV_PROJECTS",
}));

describe("useGetProjects hook", () => {
  const mockCvId = "cv-12345";
  const mockQueryResult = {
    data: { projects: [] },
    loading: false,
    error: undefined,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useQuery as unknown as jest.Mock).mockReturnValue(mockQueryResult);
  });

  it("should call useQuery with GET_CV_PROJECTS and the correct cvId variable", () => {
    renderHook(() => useGetProjects(mockCvId));

    expect(useQuery).toHaveBeenCalledTimes(1);
    expect(useQuery).toHaveBeenCalledWith("MOCK_GET_CV_PROJECTS", {
      variables: {
        cvId: mockCvId,
      },
    });
  });

  it("should return the exact result provided by useQuery", () => {
    const { result } = renderHook(() => useGetProjects(mockCvId));

    expect(result.current).toEqual(mockQueryResult);
  });
});
