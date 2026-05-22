import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActionsMenu } from "./ActionsMenu";

jest.mock("next/link", () => {
  return ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
});

jest.mock("@chakra-ui/react", () => ({
  Popover: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Trigger: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Positioner: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Content: ({
      children,
      width,
      className,
    }: {
      children: React.ReactNode;
      width?: string;
      className?: string;
    }) => (
      <div
        data-testid="popover-content"
        style={{ width }}
        className={className}
      >
        {children}
      </div>
    ),
  },
}));

describe("ActionsMenu", () => {
  const linkItem = {
    type: "link" as const,
    label: "Profile",
    href: "/profile",
  };
  const buttonClickMock = jest.fn();
  const buttonItem = {
    type: "button" as const,
    label: "Delete",
    variant: "danger" as const,
    onClick: buttonClickMock,
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders trigger button", () => {
    render(<ActionsMenu items={[]} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders link item", () => {
    render(<ActionsMenu items={[linkItem]} />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/profile");
  });

  it("renders button item", () => {
    render(<ActionsMenu items={[buttonItem]} />);
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("calls button action on click", async () => {
    render(<ActionsMenu items={[buttonItem]} />);
    await userEvent.click(screen.getByText("Delete"));
    expect(buttonClickMock).toHaveBeenCalled();
  });

  it("supports async button action", async () => {
    const asyncMock = jest.fn(async () => await Promise.resolve());
    render(
      <ActionsMenu
        items={[
          {
            type: "button",
            label: "Async",
            onClick: asyncMock,
          },
        ]}
      />,
    );
    await userEvent.click(screen.getByText("Async"));
    await waitFor(() => {
      expect(asyncMock).toHaveBeenCalled();
    });
  });
  it("applies custom width", () => {
    render(<ActionsMenu items={[]} width="300px" />);
    expect(screen.getByTestId("popover-content")).toHaveStyle({
      width: "300px",
    });
  });

  it("uses default width", () => {
    render(<ActionsMenu items={[]} />);
    expect(screen.getByTestId("popover-content")).toHaveStyle({
      width: "160px",
    });
  });

  it("applies danger class for danger variant", () => {
    render(<ActionsMenu items={[buttonItem]} />);
    expect(screen.getByText("Delete")).toHaveClass("danger");
  });
});
