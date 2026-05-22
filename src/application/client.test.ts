import { ApolloClient, InMemoryCache } from "@apollo/client-integration-nextjs";
import { from } from "@apollo/client";
import { makeClient } from "./client";
import { errorLink } from "@/application/errorLink";
import { authLink } from "@/application/authLink";
import { httpLink } from "@/application/httpLink";

jest.mock("@apollo/client", () => ({
  from: jest.fn(),
}));

jest.mock("@apollo/client-integration-nextjs", () => ({
  ApolloClient: jest.fn(),

  InMemoryCache: jest.fn(),
}));

jest.mock("@/application/errorLink", () => ({
  errorLink: "error-link",
}));

jest.mock("@/application/authLink", () => ({
  authLink: "auth-link",
}));

jest.mock("@/application/httpLink", () => ({
  httpLink: "http-link",
}));

describe("makeClient", () => {
  const cacheMock = {
    type: "cache",
  };

  const linkMock = {
    type: "link",
  };

  const clientMock = {
    type: "client",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (InMemoryCache as unknown as jest.Mock).mockReturnValue(cacheMock);
    (from as jest.Mock).mockReturnValue(linkMock);
    (ApolloClient as unknown as jest.Mock).mockReturnValue(clientMock);
  });

  it("creates InMemoryCache", () => {
    makeClient();
    expect(InMemoryCache).toHaveBeenCalledTimes(1);
  });

  it("creates link chain with errorLink authLink and httpLink", () => {
    makeClient();
    expect(from).toHaveBeenCalledWith([errorLink, authLink, httpLink]);
  });

  it("creates ApolloClient with cache and link", () => {
    makeClient();

    expect(ApolloClient).toHaveBeenCalledWith({
      cache: cacheMock,
      link: linkMock,
    });
  });

  it("returns ApolloClient instance", () => {
    const result = makeClient();
    expect(result).toBe(clientMock);
  });

  it("creates new cache on every call", () => {
    makeClient();
    makeClient();
    expect(InMemoryCache).toHaveBeenCalledTimes(2);
  });

  it("creates new ApolloClient on every call", () => {
    makeClient();
    makeClient();
    expect(ApolloClient).toHaveBeenCalledTimes(2);
  });

  it("creates link chain on every call", () => {
    makeClient();
    makeClient();
    expect(from).toHaveBeenCalledTimes(2);
  });
});
