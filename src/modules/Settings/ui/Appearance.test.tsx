import { render, screen, fireEvent } from "@testing-library/react";
import { Appearance } from "./Appearance";
import { useTheme } from "next-themes";
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({
    label,
    value,
    onChange,
    options,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: {
      label: string;
      value: string;
    }[];
  }) => (
    <div>
      <span>{label}</span>
      <span data-testid="current-theme">{value}</span>
      <select
        aria-label="appearance-select"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe("Appearance", () => {
  const setThemeMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as unknown as jest.Mock).mockReturnValue({
      theme: "dark",
      setTheme: setThemeMock,
    });
  });
  it("should render label", () => {
    render(<Appearance label="Appearance" />);
    expect(screen.getByText("Appearance")).toBeInTheDocument();
  });
  it("should render current theme", () => {
    render(<Appearance label="Appearance" />);
    expect(screen.getByTestId("current-theme")).toHaveTextContent("dark");
  });

  it("should change theme", () => {
    render(<Appearance label="Appearance" />);
    fireEvent.change(screen.getByLabelText("appearance-select"), {
      target: {
        value: "light",
      },
    });
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
  it("should render options", () => {
    render(<Appearance label="Appearance" />);
    expect(screen.getByText("system")).toBeInTheDocument();
    expect(screen.getByText("light")).toBeInTheDocument();
    expect(screen.getAllByText("dark").length).toBeGreaterThan(0);
  });
});
