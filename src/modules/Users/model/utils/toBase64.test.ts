import { toBase64 } from "./toBase64";

describe("toBase64", () => {
  const readAsDataURLMock = jest.fn();
  class FileReaderMock {
    result: string | ArrayBuffer | null = "base64-result";
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    readAsDataURL = readAsDataURLMock;
  }

  beforeEach(() => {
    jest.clearAllMocks();
    global.FileReader = FileReaderMock as never;
  });

  it("should convert file to base64", async () => {
    const file = new File(["test"], "test.png", {
      type: "image/png",
    });
    const promise = toBase64(file);
    const reader = readAsDataURLMock.mock.instances[0];
    reader.onload();
    const result = await promise;
    expect(result).toBe("base64-result");
  });

  it("should call readAsDataURL", () => {
    const file = new File(["test"], "test.png", {
      type: "image/png",
    });
    toBase64(file);
    expect(readAsDataURLMock).toHaveBeenCalledWith(file);
  });

  it("should reject on error", async () => {
    const file = new File(["test"], "test.png", {
      type: "image/png",
    });
    const promise = toBase64(file);
    const reader = readAsDataURLMock.mock.instances[0];
    reader.onerror();
    await expect(promise).rejects.toBeUndefined();
  });
});
