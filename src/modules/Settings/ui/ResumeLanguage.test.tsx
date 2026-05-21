import { fireEvent, render, screen } from "@testing-library/react";
import { ResumeLanguage } from "./ResumeLanguage";
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
      <span>{value}</span>
      <select
        aria-label="resume-language-select"
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

describe("ResumeLanguage", () => {
  const setResumeLanguageMock = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useSettingsStore as unknown as jest.Mock).mockReturnValue({
      resumeLanguage: "en",
      setResumeLanguage: setResumeLanguageMock,
    });
  });

  it("should render label", () => {
    render(<ResumeLanguage label="Resume language" />);
    expect(screen.getByText("Resume language")).toBeInTheDocument();
  });

  it("should render current language", () => {
    render(<ResumeLanguage label="Resume language" />);
    expect(screen.getByText("en")).toBeInTheDocument();
  });

  it("should render options", () => {
    render(<ResumeLanguage label="Resume language" />);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Russian")).toBeInTheDocument();
  });

  it("should change resume language", () => {
    render(<ResumeLanguage label="Resume language" />);

    fireEvent.change(screen.getByLabelText("resume-language-select"), {
      target: {
        value: "ru",
      },
    });
    expect(setResumeLanguageMock).toHaveBeenCalledWith("ru");
  });
});
