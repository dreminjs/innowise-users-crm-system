import { translateText } from "./translateText";

describe("translateText", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return translated text", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        translatedText: "Привет",
      }),
    });
    const result = await translateText("Hello", "ru");
    expect(result).toBe("Привет");
  });

  it("should call fetch with correct params", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        translatedText: "Привет",
      }),
    });

    await translateText("Hello", "ru");
    expect(fetch).toHaveBeenCalledWith("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Hello",
        target: "ru",
      }),
    });
  });

  it("should return original text when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });
    const result = await translateText("Hello", "ru");
    expect(result).toBe("Hello");
  });

  it("should return original text when translatedText is missing", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    const result = await translateText("Hello", "ru");
    expect(result).toBe("Hello");
  });

  it("should return original text on fetch error", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
    const result = await translateText("Hello", "ru");
    expect(result).toBe("Hello");
  });
});
