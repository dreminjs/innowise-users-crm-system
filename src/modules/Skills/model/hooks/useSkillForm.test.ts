import { renderHook, act } from "@testing-library/react";
import { Mastery } from "@/generated/graphql";
import { useSkillForm } from "./useSkillForm";
jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(() => "resolver"),
}));
jest.mock("../skill.schema", () => ({
  skillSchema: "skillSchema",
}));
describe("useSkillForm", () => {
  it("returns form methods", () => {
    const { result } = renderHook(() => useSkillForm());
    expect(result.current.control).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.reset).toBeDefined();
    expect(result.current.handleChangeSkill).toBeDefined();
    expect(result.current.handleChangeMastery).toBeDefined();
  });

  it("uses default values", () => {
    const { result } = renderHook(() =>
      useSkillForm({
        categoryId: "1",
        mastery: Mastery.Expert,
      }),
    );
    expect(result.current.currentCategoryId).toBe("1");
  });

  it("changes categoryId", () => {
    const { result } = renderHook(() => useSkillForm());
    act(() => {
      result.current.handleChangeSkill("new-category");
    });
    expect(result.current.currentCategoryId).toBe("new-category");
  });

  it("changes mastery", () => {
    const { result } = renderHook(() => useSkillForm());
    act(() => {
      result.current.handleChangeMastery(Mastery.Advanced);
    });
    expect(result.current.currentCategoryId).toBeUndefined();
  });

  it("resets form values", () => {
    const { result } = renderHook(() =>
      useSkillForm({
        categoryId: "1",
        mastery: Mastery.Expert,
      }),
    );
    act(() => {
      result.current.handleChangeSkill("2");
    });
    expect(result.current.currentCategoryId).toBe("2");
    act(() => {
      result.current.reset();
    });
    expect(result.current.currentCategoryId).toBe("1");
  });

  it("handleSubmit exists and is callable", () => {
    const { result } = renderHook(() => useSkillForm());
    const submitHandler = jest.fn();
    const wrappedHandler = result.current.handleSubmit(submitHandler);
    expect(typeof wrappedHandler).toBe("function");
  });

  it("initial currentCategoryId is undefined without defaults", () => {
    const { result } = renderHook(() => useSkillForm());
    expect(result.current.currentCategoryId).toBeUndefined();
  });

  it("keeps latest categoryId after multiple updates", () => {
    const { result } = renderHook(() => useSkillForm());
    act(() => {
      result.current.handleChangeSkill("1");
      result.current.handleChangeSkill("2");
      result.current.handleChangeSkill("3");
    });
    expect(result.current.currentCategoryId).toBe("3");
  });
});
