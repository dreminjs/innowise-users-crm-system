import "@testing-library/jest-dom";
jest.mock("next-intl");
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

if (typeof structuredClone === "undefined") {
  global.structuredClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
}
