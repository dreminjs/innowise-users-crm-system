import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Mastery } from "@/generated/graphql";
import { SkillItem } from "./SkillItem";

jest.mock("@chakra-ui/react", () => ({
  Progress: {
    Root: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: number;
    }) => (
      <div>
        progress:
        {value}
        {children}
      </div>
    ),

    Track: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    Range: () => <div>range</div>,
  },
}));

jest.mock("../../../model/skill.constants", () => ({
  masteryValue: {
    Novice: 20,
    Competent: 40,
    Proficient: 60,
    Advanced: 80,
    Expert: 100,
  },

  masteryBgColor: {
    Novice: "gray",
    Competent: "green",
    Proficient: "yellow",
    Advanced: "blue",
    Expert: "red",
  },

  masteryColorPalette: {
    Novice: "darkgray",
    Competent: "darkgreen",
    Proficient: "gold",
    Advanced: "darkblue",
    Expert: "darkred",
  },
}));

describe("SkillItem", () => {
  it("renders skill name", () => {
    render(
      <SkillItem name="React" mastery={Mastery.Competent} isActive={false} />,
    );
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders progress value", () => {
    render(
      <SkillItem name="React" mastery={Mastery.Competent} isActive={false} />,
    );
    expect(screen.getByText(/progress:40/i)).toBeInTheDocument();
  });

  it("renders button", () => {
    render(
      <SkillItem name="React" mastery={Mastery.Novice} isActive={false} />,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onClick", async () => {
    const onClickMock = jest.fn();
    render(
      <SkillItem
        name="React"
        mastery={Mastery.Expert}
        isActive={false}
        onClick={onClickMock}
      />,
    );
    await userEvent.click(screen.getByRole("button"));
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders active class", () => {
    render(<SkillItem name="React" mastery={Mastery.Competent} isActive />);
    expect(screen.getByRole("button").className).toContain(
      "skillItemDeleteActive",
    );
  });

  it("does not render active class when inactive", () => {
    render(
      <SkillItem name="React" mastery={Mastery.Competent} isActive={false} />,
    );
    expect(screen.getByRole("button").className).not.toContain(
      "skillItemDeleteActive",
    );
  });

  it("renders novice mastery value", () => {
    render(<SkillItem name="HTML" mastery={Mastery.Novice} isActive={false} />);
    expect(screen.getByText(/progress:20/i)).toBeInTheDocument();
  });

  it("renders expert mastery value", () => {
    render(<SkillItem name="Node" mastery={Mastery.Expert} isActive={false} />);
    expect(screen.getByText(/progress:100/i)).toBeInTheDocument();
  });
});
