import { useLanguageStore } from "./language.store";

describe("useLanguageStore", () => {
  beforeEach(() => {
    useLanguageStore.setState({
      isDeleteMode: false,
      deleteLanguages: {},
    });
  });

  it("has initial state", () => {
    const state = useLanguageStore.getState();
    expect(state.isDeleteMode).toBe(false);
    expect(state.deleteLanguages).toEqual({});
  });

  it("toggles delete mode", () => {
    const store = useLanguageStore.getState();
    store.toggleDeleteMode();
    expect(useLanguageStore.getState().isDeleteMode).toBe(true);
    store.toggleDeleteMode();
    expect(useLanguageStore.getState().isDeleteMode).toBe(false);
  });

  it("adds language to deleteLanguages", () => {
    useLanguageStore.getState().addDeleteLanguage("English");
    expect(useLanguageStore.getState().deleteLanguages).toEqual({
      English: "English",
    });
  });

  it("adds multiple languages", () => {
    const store = useLanguageStore.getState();
    store.addDeleteLanguage("English");
    store.addDeleteLanguage("German");
    expect(useLanguageStore.getState().deleteLanguages).toEqual({
      English: "English",
      German: "German",
    });
  });
  it("removes language from deleteLanguages", () => {
    useLanguageStore.setState({
      deleteLanguages: {
        English: "English",
        German: "German",
      },
    });
    useLanguageStore.getState().removeDeleteLanguage("English");
    expect(useLanguageStore.getState().deleteLanguages).toEqual({
      German: "German",
    });
  });

  it("does nothing when removing missing language", () => {
    useLanguageStore.setState({
      deleteLanguages: {
        English: "English",
      },
    });
    useLanguageStore.getState().removeDeleteLanguage("Spanish");
    expect(useLanguageStore.getState().deleteLanguages).toEqual({
      English: "English",
    });
  });

  it("clears deleteLanguages", () => {
    useLanguageStore.setState({
      deleteLanguages: {
        English: "English",
        German: "German",
      },
    });
    useLanguageStore.getState().clearDeleteLanguages();
    expect(useLanguageStore.getState().deleteLanguages).toEqual({});
  });

  it("overwrites existing language value", () => {
    const store = useLanguageStore.getState();
    store.addDeleteLanguage("English");
    store.addDeleteLanguage("English");
    expect(useLanguageStore.getState().deleteLanguages).toEqual({
      English: "English",
    });
  });

  it("preserves delete mode when modifying languages", () => {
    useLanguageStore.setState({
      isDeleteMode: true,
    });
    useLanguageStore.getState().addDeleteLanguage("English");
    expect(useLanguageStore.getState().isDeleteMode).toBe(true);
  });
});
