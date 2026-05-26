import { render, screen, fireEvent } from "@testing-library/react";
import { DashboardLayout } from "./DashboardLayout";

type MockDesktopSidebarProps = {
  collapsed: boolean;
  toggleAction: () => void;
};

jest.mock("../DesktopSidebar", () => ({
  DesktopSidebar: ({ collapsed, toggleAction }: MockDesktopSidebarProps) => (
    <div>
      <div>
        collapsed:
        {String(collapsed)}
      </div>
      <button type="button" onClick={toggleAction}>
        toggle-sidebar
      </button>
    </div>
  ),
}));

jest.mock("../MobileBottomNav", () => ({
  MobileBottomNav: () => <div>mobile-nav</div>,
}));

jest.mock("./DashboardLayout.module.css", () => ({
  layout: "layout",
  collapsed: "collapsed",
  content: "content",
}));

describe("DashboardLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children", () => {
    render(
      <DashboardLayout>
        <div>dashboard-content</div>
      </DashboardLayout>,
    );
    expect(screen.getByText("dashboard-content")).toBeInTheDocument();
  });

  it("renders DesktopSidebar", () => {
    render(<DashboardLayout>content</DashboardLayout>);
    expect(screen.getByText("collapsed:false")).toBeInTheDocument();
  });

  it("renders MobileBottomNav", () => {
    render(<DashboardLayout>content</DashboardLayout>);
    expect(screen.getByText("mobile-nav")).toBeInTheDocument();
  });

  it("toggles collapsed state", () => {
    render(<DashboardLayout>content</DashboardLayout>);
    expect(screen.getByText("collapsed:false")).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", {
        name: "toggle-sidebar",
      }),
    );
    expect(screen.getByText("collapsed:true")).toBeInTheDocument();
  });

  it("renders layout class", () => {
    const { container } = render(<DashboardLayout>content</DashboardLayout>);
    expect(container.querySelector(".layout")).toBeInTheDocument();
  });

  it("renders collapsed class after toggle", () => {
    const { container } = render(<DashboardLayout>content</DashboardLayout>);
    fireEvent.click(
      screen.getByRole("button", {
        name: "toggle-sidebar",
      }),
    );
    expect(container.querySelector(".collapsed")).toBeInTheDocument();
  });

  it("renders content container", () => {
    const { container } = render(<DashboardLayout>content</DashboardLayout>);
    expect(container.querySelector(".content")).toBeInTheDocument();
  });
});
