import { tabs } from "./tabs";

describe("tabs", () => {
  it("should contain tabs", () => {
    expect(tabs.length).toBeGreaterThan(0);
  });
  it("should contain details tab", () => {
    expect(tabs).toContainEqual({
      label: "DETAILS",
      href: "",
    });
  });
  it("should contain skills tab", () => {
    expect(tabs).toContainEqual({
      label: "SKILLS",
      href: "/skills",
    });
  });
  it("should contain projects tab", () => {
    expect(tabs).toContainEqual({
      label: "PROJECTS",
      href: "/projects",
    });
  });
  it("should contain preview tab", () => {
    expect(tabs).toContainEqual({
      label: "PREVIEW",
      href: "/preview",
    });
  });
  it("should have labels", () => {
    tabs.forEach((tab) => {
      expect(tab.label).toBeTruthy();
    });
  });
  it("should have href", () => {
    tabs.forEach((tab) => {
      expect(tab).toHaveProperty("href");
    });
  });
});
