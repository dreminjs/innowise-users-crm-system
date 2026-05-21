import { act, renderHook } from "@testing-library/react";
import { useSettingsStore } from "./settings.store";

describe("useSettingsStore", () => {
  beforeEach(() => {
    useSettingsStore.setState({
      language: "en",
      resumeLanguage: "en",
    });
  });

  it("should have default language", () => {
    const { result } = renderHook(() => useSettingsStore());
    expect(result.current.language).toBe("en");
  });

  it("should set language", () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setLanguage("ru");
    });
    expect(result.current.language).toBe("ru");
  });

  it("should have default resume language", () => {
    const { result } = renderHook(() => useSettingsStore());
    expect(result.current.resumeLanguage).toBe("en");
  });

  it("should set resume language", () => {
    const { result } = renderHook(() => useSettingsStore());
    act(() => {
      result.current.setResumeLanguage("de");
    });
    expect(result.current.resumeLanguage).toBe("de");
  });
});
