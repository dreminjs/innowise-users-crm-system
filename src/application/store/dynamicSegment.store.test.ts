import { useDynamicSegment } from "./dynamicSegment.store";

describe("useDynamicSegment", () => {
  beforeEach(() => {
    useDynamicSegment.setState({
      segment: "",
    });
  });
  it("has initial state", () => {
    expect(useDynamicSegment.getState().segment).toBe("");
  });
  it("sets segment", () => {
    useDynamicSegment.getState().setSegment("employees");
    expect(useDynamicSegment.getState().segment).toBe("employees");
  });
  it("updates segment multiple times", () => {
    const store = useDynamicSegment.getState();
    store.setSegment("skills");
    expect(useDynamicSegment.getState().segment).toBe("skills");
    store.setSegment("projects");
    expect(useDynamicSegment.getState().segment).toBe("projects");
  });

  it("sets empty string", () => {
    useDynamicSegment.getState().setSegment("");
    expect(useDynamicSegment.getState().segment).toBe("");
  });

  it("overwrites previous segment", () => {
    const store = useDynamicSegment.getState();
    store.setSegment("first");
    store.setSegment("second");
    expect(useDynamicSegment.getState().segment).toBe("second");
  });
});
