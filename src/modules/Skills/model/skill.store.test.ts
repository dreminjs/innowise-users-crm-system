import { act } from "@testing-library/react";
import { useSkillStore } from "./skill.store";

describe("useSkillStore", () => {
  beforeEach(() => {
    act(() => {
      useSkillStore.setState({
        isDeleteMode: false,
        deleteSkills: {},
      });
    });
  });

  it("has initial state", () => {
    const state = useSkillStore.getState();
    expect(state.isDeleteMode).toBe(false);
    expect(state.deleteSkills).toEqual({});
  });

  it("toggles delete mode on", () => {
    act(() => {
      useSkillStore.getState().toggleDeleteMode();
    });
    expect(useSkillStore.getState().isDeleteMode).toBe(true);
  });

  it("toggles delete mode off", () => {
    act(() => {
      useSkillStore.setState({
        isDeleteMode: true,
      });
    });
    act(() => {
      useSkillStore.getState().toggleDeleteMode();
    });
    expect(useSkillStore.getState().isDeleteMode).toBe(false);
  });

  it("adds skill to deleteSkills", () => {
    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({
      React: "React",
    });
  });

  it("removes skill from deleteSkills when toggled again", () => {
    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({
      React: "React",
    });

    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({});
  });

  it("adds multiple skills", () => {
    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
      useSkillStore.getState().toggleDeleteSkill("Node");
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({
      React: "React",
      Node: "Node",
    });
  });

  it("removes only selected skill", () => {
    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
      useSkillStore.getState().toggleDeleteSkill("Node");
    });

    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({
      Node: "Node",
    });
  });
  it("clears deleteSkills", () => {
    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
      useSkillStore.getState().toggleDeleteSkill("Node");
    });

    expect(useSkillStore.getState().deleteSkills).toEqual({
      React: "React",
      Node: "Node",
    });
    act(() => {
      useSkillStore.getState().clearDeleteSkills();
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({});
  });
  it("keeps delete mode after clearing skills", () => {
    act(() => {
      useSkillStore.setState({
        isDeleteMode: true,
      });
    });
    act(() => {
      useSkillStore.getState().toggleDeleteSkill("React");
    });
    act(() => {
      useSkillStore.getState().clearDeleteSkills();
    });
    expect(useSkillStore.getState().isDeleteMode).toBe(true);
  });

  it("handles clearing empty deleteSkills", () => {
    act(() => {
      useSkillStore.getState().clearDeleteSkills();
    });
    expect(useSkillStore.getState().deleteSkills).toEqual({});
  });
});
