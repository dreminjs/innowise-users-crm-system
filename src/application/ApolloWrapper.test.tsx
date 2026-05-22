import { render, screen } from "@testing-library/react";
import { ApolloWrapper } from "./ApolloWrapper";
const ApolloNextAppProviderMock = jest.fn();
jest.mock("@apollo/client-integration-nextjs", () => ({
  ApolloNextAppProvider: ({
    children,
    makeClient,
  }: {
    children: React.ReactNode;
    makeClient: unknown;
  }) => {
    ApolloNextAppProviderMock(makeClient);
    return <div data-testid="apollo-provider">{children}</div>;
  },
}));

jest.mock("./client", () => ({
  makeClient: jest.fn(),
}));
const { makeClient: makeClientMock } = jest.requireMock("./client");
describe("ApolloWrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <ApolloWrapper>
        <div>content</div>
      </ApolloWrapper>,
    );
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("renders ApolloNextAppProvider", () => {
    render(
      <ApolloWrapper>
        <div>child</div>
      </ApolloWrapper>,
    );
    expect(screen.getByTestId("apollo-provider")).toBeInTheDocument();
  });

  it("passes makeClient to ApolloNextAppProvider", () => {
    render(
      <ApolloWrapper>
        <div>child</div>
      </ApolloWrapper>,
    );
    expect(ApolloNextAppProviderMock).toHaveBeenCalledWith(makeClientMock);
  });

  it("renders multiple children", () => {
    render(
      <ApolloWrapper>
        <div>first</div>
        <div>second</div>
      </ApolloWrapper>,
    );
    expect(screen.getByText("first")).toBeInTheDocument();
    expect(screen.getByText("second")).toBeInTheDocument();
  });

  it("renders without crashing when children are empty", () => {
    render(<ApolloWrapper>{null}</ApolloWrapper>);
    expect(screen.getByTestId("apollo-provider")).toBeInTheDocument();
  });
});
