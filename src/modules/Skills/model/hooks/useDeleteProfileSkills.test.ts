import { renderHook, act } from "@testing-library/react";
import { useDeleteProfileSkills } from "./useDeleteProfileSkills";
const mutateMock = jest.fn();
const addNotificationMock = jest.fn();
const clearDeleteSkillsMock = jest.fn();
const toggleDeleteModeMock = jest.fn();
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@apollo/client/react", () => ({
  useMutation: jest.fn(),
}));
jest.mock("@/modules/Notifications", () => ({
  useNotification: jest.fn(),
}));
jest.mock("../skill.store", () => ({
  useSkillStore: jest.fn(),
}));
jest.mock("../../api/mutations", () => ({
  DELETE_PROFILE_SKILL: "DELETE_PROFILE_SKILL",
}));
jest.mock("../../api/queries", () => ({
  GET_PROFILE_SKILLS: "GET_PROFILE_SKILLS",
}));
const { useMutation } = jest.requireMock("@apollo/client/react");
const { useNotification } = jest.requireMock("@/modules/Notifications");
const { useSkillStore } = jest.requireMock("../skill.store");
describe("useDeleteProfileSkills", () => {
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
    useSkillStore.mockReturnValue({
      deleteSkills: {
        react: "React",
        node: "Node",
      },
      clearDeleteSkills: clearDeleteSkillsMock,
      toggleDeleteMode: toggleDeleteModeMock,
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
    const { result } = renderHook(() => useDeleteProfileSkills("user-1"));
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("error");
  });

  it("calls mutate with correct variables", () => {
    const { result } = renderHook(() => useDeleteProfileSkills("user-1"));
    act(() => {
      result.current.handleDeleteProfileSkills();
    });
    expect(mutateMock).toHaveBeenCalledWith({
      variables: {
        dto: {
          name: ["React", "Node"],
          userId: "user-1",
        },
      },
    });
  });

  it("does not call mutate without userId", () => {
    const { result } = renderHook(() =>
      useDeleteProfileSkills(undefined as never),
    );
    act(() => {
      result.current.handleDeleteProfileSkills();
    });
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it("calls success notification", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onCompleted();
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "skillDeletedSuccessfully",
      type: "success",
    });
  });

  it("clears delete skills on success", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onCompleted();
    expect(clearDeleteSkillsMock).toHaveBeenCalled();
  });

  it("toggles delete mode on success", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onCompleted();
    expect(toggleDeleteModeMock).toHaveBeenCalled();
  });

  it("calls error notification", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onError();
    expect(addNotificationMock).toHaveBeenCalledWith({
      message: "failedToDeleteSkill",
      type: "error",
    });
  });

  it("clears delete skills on error", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onError();
    expect(clearDeleteSkillsMock).toHaveBeenCalled();
  });

  it("toggles delete mode on error", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    mutationConfig.onError();
    expect(toggleDeleteModeMock).toHaveBeenCalled();
  });
  it("passes refetchQueries", () => {
    renderHook(() => useDeleteProfileSkills("user-1"));
    const mutationConfig = useMutation.mock.calls[0][1];
    expect(mutationConfig.refetchQueries).toEqual([
      {
        query: "GET_PROFILE_SKILLS",
        variables: {
          userId: "user-1",
        },
      },
    ]);
  });
});
