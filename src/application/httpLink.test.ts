describe("httpLink", () => {
  const HttpLinkMock = jest.fn();
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("creates HttpLink with GRAPHQL_URL from env", async () => {
    process.env.GRAPHQL_URL = "https://test-api.com/graphql";
    jest.doMock("@apollo/client", () => ({
      HttpLink: HttpLinkMock,
    }));
    await import("./httpLink");
    expect(HttpLinkMock).toHaveBeenCalledWith({
      uri: "https://test-api.com/graphql",
    });
  });

  it("uses localhost fallback when GRAPHQL_URL is missing", async () => {
    delete process.env.GRAPHQL_URL;

    jest.doMock("@apollo/client", () => ({
      HttpLink: HttpLinkMock,
    }));
    await import("./httpLink");
    expect(HttpLinkMock).toHaveBeenCalledWith({
      uri: "http://localhost:3001/api/graphql",
    });
  });

  it("exports created HttpLink instance", async () => {
    const linkInstance = {
      link: true,
    };
    HttpLinkMock.mockReturnValue(linkInstance);
    jest.doMock("@apollo/client", () => ({
      HttpLink: HttpLinkMock,
    }));
    const importedModule = await import("./httpLink");
    expect(importedModule.httpLink).toBe(linkInstance);
  });

  it("creates HttpLink only once per module import", async () => {
    process.env.GRAPHQL_URL = "https://api.test/graphql";
    jest.doMock("@apollo/client", () => ({
      HttpLink: HttpLinkMock,
    }));
    await import("./httpLink");
    expect(HttpLinkMock).toHaveBeenCalledTimes(1);
  });
});
