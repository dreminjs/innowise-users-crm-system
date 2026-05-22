import { icons } from "./icons";

describe("icons", () => {
  it("contains employees icon", () => {
    expect(icons.employees).toBeDefined();
  });

  it("contains skills icon", () => {
    expect(icons.skills).toBeDefined();
  });

  it("contains languages icon", () => {
    expect(icons.languages).toBeDefined();
  });

  it("contains cvs icon", () => {
    expect(icons.cvs).toBeDefined();
  });

  it("contains arrow icon", () => {
    expect(icons.arrow).toBeDefined();
  });

  it("contains trash icon", () => {
    expect(icons.trash).toBeDefined();
  });

  it("contains account icon", () => {
    expect(icons.account).toBeDefined();
  });

  it("contains settings icon", () => {
    expect(icons.settings).toBeDefined();
  });

  it("contains logout icon", () => {
    expect(icons.logout).toBeDefined();
  });

  it("contains upload icon", () => {
    expect(icons.upload).toBeDefined();
  });

  it("contains password icon", () => {
    expect(icons.password).toBeDefined();
  });

  it("contains search icon", () => {
    expect(icons.search).toBeDefined();
  });

  it("contains projects icon", () => {
    expect(icons.projects).toBeDefined();
  });

  it("contains positions icon", () => {
    expect(icons.positions).toBeDefined();
  });

  it("contains departments icon", () => {
    expect(icons.departments).toBeDefined();
  });

  it("contains all expected keys", () => {
    expect(Object.keys(icons)).toEqual([
      "employees",
      "skills",
      "languages",
      "cvs",
      "arrow",
      "trash",
      "account",
      "settings",
      "logout",
      "upload",
      "password",
      "search",
      "projects",
      "positions",
      "departments",
    ]);
  });
});
