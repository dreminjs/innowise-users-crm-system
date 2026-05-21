import { render, screen } from "@testing-library/react";
import { Settings } from "./Settings";
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("./Appearance", () => ({
  Appearance: ({ label }: { label: string }) => <div>{label}</div>,
}));
jest.mock("./Language", () => ({
  Language: ({ label }: { label: string }) => <div>{label}</div>,
}));
jest.mock("./ResumeLanguage", () => ({
  ResumeLanguage: ({ label }: { label: string }) => <div>{label}</div>,
}));
describe("Settings", () => {
  it("should render appearance", () => {
    render(<Settings />);
    expect(screen.getByText("appearance")).toBeInTheDocument();
  });
  it("should render language", () => {
    render(<Settings />);
    expect(screen.getByText("language")).toBeInTheDocument();
  });
  it("should render resume language", () => {
    render(<Settings />);
    expect(screen.getByText("resumeLanguage")).toBeInTheDocument();
  });
});
