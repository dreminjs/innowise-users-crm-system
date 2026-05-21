import { fireEvent, render, screen } from "@testing-library/react";
import { Language } from "./Language";
import { useSettingsStore } from "../model/settings.store";

jest.mock("../model/settings.store", () => ({
  useSettingsStore: jest.fn(),
}));

jest.mock("../model/settings.data", () => ({
  languageOptions: [
    {
      label: "English",
      value: "en",
    },
    {
      label: "Russian",
      value: "ru",
    },
  ],
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
      <span data-testid="current-language">{value}</span>
      <select
        aria-label="language-select"
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

describe("Language", () => {
  const setLanguageMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
    (useSettingsStore as unknown as jest.Mock).mockReturnValue({
      language: "en",
      setLanguage: setLanguageMock,
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render label", () => {
    render(<Language label="Language" />);
    expect(screen.getByText("Language")).toBeInTheDocument();
  });

  it("should render current language", () => {
    render(<Language label="Language" />);
    expect(screen.getByTestId("current-language")).toHaveTextContent("en");
  });

  it("should render options", () => {
    render(<Language label="Language" />);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Russian")).toBeInTheDocument();
  });

  it("should change language", () => {
    render(<Language label="Language" />);
    fireEvent.change(screen.getByLabelText("language-select"), {
      target: {
        value: "ru",
      },
    });
    expect(setLanguageMock).toHaveBeenCalledWith("ru");
  });
});
