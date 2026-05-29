import { renderHook, act } from "@testing-library/react";
import { Mastery } from "@/generated/graphql";
import { useAddProfileSkill } from "./useAddProfileSkill";
const mutateMock = jest.fn();
const addNotificationMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@apollo/client/react", () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));
jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
jest.mock("../../api/mutations", () => ({
  ADD_PROFILE_SKILL: "ADD_PROFILE_SKILL",
}));
jest.mock("../../api/queries", () => ({
  GET_PROFILE_SKILLS: "GET_PROFILE_SKILLS",
  GET_SKILL_CATEGORIES: "GET_SKILL_CATEGORIES",
  GET_SKILLS: "GET_SKILLS",
}));
const { useQuery, useMutation } = jest.requireMock("@apollo/client/react");
const { useNotification } = jest.requireMock("@/modules/Notifications");
describe("useAddProfileSkill", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useNotification.mockImplementation(
      (
        selector: (state: {
          addNotification: typeof addNotificationMock;
        }) => unknown,
      ) =>
        selector({
          addNotification: addNotificationMock,
        }),
    );
    useQuery.mockReturnValue({
      data: {
        skills: [
          {
            id: "1",
            name: "React",
          },
        ],
      },
    });
    useMutation.mockReturnValue([
      mutateMock,
      {
        loading: false,
        error: null,
      },
    ]);
  });
  it("returns loading and error", () => {
    useMutation.mockReturnValue([
      mutateMock,
      {
        loading: true,
        error: "error",
      },
    ]);
    const { result } = renderHook(() => useAddProfileSkill("user-1"));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("error");
  });

  it("calls mutate with correct variables", async () => {
    mutateMock.mockResolvedValue(undefined);
    const { result } = renderHook(() => useAddProfileSkill("user-1"));
    await act(async () => {
      await result.current.handleAddProfileSkill({
        categoryId: "1",
        mastery: Mastery.Expert,
      });
    });
    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          categoryId: "1",
          mastery: Mastery.Expert,
          userId: "user-1",
          name: "React",
        },
      },
    });
  });

  it("uses Unknown when skill is not found", async () => {
    mutateMock.mockResolvedValue(undefined);
    const { result } = renderHook(() => useAddProfileSkill("user-1"));
    await act(async () => {
      await result.current.handleAddProfileSkill({
        categoryId: "999",
        mastery: Mastery.Expert,
      });
    });
    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          categoryId: "999",
          mastery: Mastery.Expert,
          userId: "user-1",
          name: "Unknown",
        },
      },
    });
  });
  it("does not call mutate without userId", async () => {
    const { result } = renderHook(() => useAddProfileSkill(undefined as never));
    await act(async () => {
      await result.current.handleAddProfileSkill({
        categoryId: "1",
        mastery: Mastery.Expert,
      });
    });
    expect(mutateMock).not.toHaveBeenCalled();
  });
  it("does not call mutate without skillsData", async () => {
    useQuery.mockReturnValue({
      data: null,
    });
    const { result } = renderHook(() => useAddProfileSkill("user-1"));
    await act(async () => {
      await result.current.handleAddProfileSkill({
        categoryId: "1",
        mastery: Mastery.Expert,
      });
    });
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("calls success notification", () => {
    renderHook(() => useAddProfileSkill("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onCompleted();
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "skillAddedSuccessfully",
      type: "success",
    });
  });
  it("calls error notification", () => {
    renderHook(() => useAddProfileSkill("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onError();
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "failedToAddSkill",
      type: "error",
    });
  });

  it("passes refetchQueries", () => {
    renderHook(() => useAddProfileSkill("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    expect(mutationConfig.refetchQueries).toEqual([
      {
        query: "GET_PROFILE_SKILLS",
        variables: {
          userId: "user-1",
        },
      },
      {
        query: "GET_SKILL_CATEGORIES",
      },
    ]);
  });
});
