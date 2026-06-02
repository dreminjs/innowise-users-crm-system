import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => {
    const t = ((key: string) => `translated-${key}`) as ((
      key: string,
    ) => string) & {
      has: (key: string) => boolean;
    };
    t.has = (key: string) => key === "dashboard";
    return t;
  }),
}));

jest.mock("@/application/store/dynamicSegment.store", () => ({
  useDynamicSegment: jest.fn(),
}));

type MockNavigationItemProps = {
  label: string;
  href: string;
  isActive: boolean;
};

jest.mock("./NavigationItem", () => ({
  NavigationItem: ({ label, href, isActive }: MockNavigationItemProps) => (
    <li>
      <div>
        nav-label:
        {label}
      </div>

      <div>
        nav-href:
        {href}
      </div>

      <div>
        nav-active:
        {String(isActive)}
      </div>
    </li>
  ),
}));

type MockIconProps = {
  name: string;
  size: number;
  className?: string;
};

jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: ({ name, size }: MockIconProps) => (
    <div>
      icon:
      {name}:{size}
    </div>
  ),
}));

jest.mock("./Navigation.module.css", () => ({
  navigationList: "navigationList",
  arrow: "arrow",
}));

jest.mock("clsx", () => ({
  __esModule: true,
  default: (...classes: string[]) => classes.join(" "),
}));

jest.mock("../../../../../public/user-icon.svg", () => ({
  __esModule: true,
  default: () => <div>user-icon</div>,
}));

describe("Navigation", () => {
  const { usePathname } = jest.requireMock("next/navigation");
  const { useDynamicSegment } = jest.requireMock(
    "@/application/store/dynamicSegment.store",
  );

  beforeEach(() => {
    jest.clearAllMocks();
    usePathname.mockReturnValue("/dashboard/users/123");
    useDynamicSegment.mockImplementation(
      (selector: (state: { segment: string }) => string) =>
        selector({
          segment: "dynamic-user",
        }),
    );
  });

  it("renders navigation container", () => {
    render(<Navigation />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders translated segment", () => {
    render(<Navigation />);
    expect(
      screen.getByText("nav-label:translated-dashboard"),
    ).toBeInTheDocument();
  });

  it("renders segment", () => {
    render(<Navigation />);
    expect(screen.getByText("nav-label:users")).toBeInTheDocument();
    expect(screen.getByText("nav-label:123")).toBeInTheDocument();
  });

  it("renders correct hrefs", () => {
    render(<Navigation />);
    expect(screen.getByText("nav-href:/dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("nav-href:/dashboard/users/123"),
    ).toBeInTheDocument();
  });

  it("marks second segment as active", () => {
    render(<Navigation />);
    expect(screen.getByText("nav-active:true")).toBeInTheDocument();
  });

  it("renders user icon for second segment", () => {
    render(<Navigation />);
    expect(screen.getByText("user-icon")).toBeInTheDocument();
  });

  it("renders arrow icons", () => {
    render(<Navigation />);
    expect(screen.getAllByText("icon:arrow:10")).toHaveLength(2);
  });

  it("renders navigation list", () => {
    const { container } = render(<Navigation />);
    expect(container.querySelector(".navigationList")).toBeInTheDocument();
  });
});
