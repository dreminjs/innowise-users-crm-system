import { render, screen } from "@testing-library/react";
import { CvLayout } from "./CvLayout";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/cvs/cv-1/projects"),
}));

jest.mock("@/shared/config/tabs", () => ({
  tabs: [
    {
      label: "overview",
      href: "/overview",
    },
    {
      label: "projects",
      href: "/projects",
    },
    {
      label: "skills",
      href: "/skills",
    },
  ],
}));

type MockNavigationItemProps = {
  to: string;
  label: string;
  isActive: boolean;
};

jest.mock("@/components/Navigation", () => ({
  NavigationItem: ({ to, label, isActive }: MockNavigationItemProps) => (
    <div>
      <div>
        nav-label:
        {label}
      </div>

      <div>
        nav-to:
        {to}
      </div>

      <div>
        nav-active:
        {String(isActive)}
      </div>
    </div>
  ),
}));

jest.mock("./CvLayout.module.css", () => ({
  page: "page",
  tabs: "tabs",
  content: "content",
}));

describe("CvLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders navigation items", () => {
    render(<CvLayout cvId="cv-1">content</CvLayout>);
    expect(screen.getByText("nav-label:overview")).toBeInTheDocument();
    expect(screen.getByText("nav-label:projects")).toBeInTheDocument();
    expect(screen.getByText("nav-label:skills")).toBeInTheDocument();
  });

  it("renders correct navigation links", () => {
    render(<CvLayout cvId="cv-1">content</CvLayout>);
    expect(screen.getByText("nav-to:/cvs/cv-1/overview")).toBeInTheDocument();
    expect(screen.getByText("nav-to:/cvs/cv-1/projects")).toBeInTheDocument();
    expect(screen.getByText("nav-to:/cvs/cv-1/skills")).toBeInTheDocument();
  });

  it("marks active navigation item", () => {
    render(<CvLayout cvId="cv-1">content</CvLayout>);
    expect(screen.getByText("nav-active:true")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <CvLayout cvId="cv-1">
        <div>layout-content</div>
      </CvLayout>,
    );
    expect(screen.getByText("layout-content")).toBeInTheDocument();
  });

  it("renders page wrapper", () => {
    const { container } = render(<CvLayout cvId="cv-1">content</CvLayout>);
    expect(container.querySelector(".page")).toBeInTheDocument();
  });

  it("renders tabs container", () => {
    const { container } = render(<CvLayout cvId="cv-1">content</CvLayout>);
    expect(container.querySelector(".tabs")).toBeInTheDocument();
  });

  it("renders content container", () => {
    const { container } = render(<CvLayout cvId="cv-1">content</CvLayout>);
    expect(container.querySelector(".content")).toBeInTheDocument();
  });
});
