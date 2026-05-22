import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RemoveSkillsButton } from "./RemoveSkillsButton";
const handleDeleteProfileSkillsMock = jest.fn();

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock("../../model/hooks/useDeleteProfileSkills", () => ({
  useDeleteProfileSkills: jest.fn(),
}));
jest.mock("../../model/skill.store", () => ({
  useSkillStore: jest.fn(),
}));
const { useDeleteProfileSkills } = jest.requireMock(
  "../../model/hooks/useDeleteProfileSkills",
);
const { useSkillStore } = jest.requireMock("../../model/skill.store");

describe("RemoveSkillsButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when deleteSkills is empty", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {},
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: false,
    });
    const { container } = render(<RemoveSkillsButton />);
    expect(container.firstChild).toBeNull();
  });

  it("renders delete button", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        "1": true,
      },
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: false,
    });
    render(<RemoveSkillsButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders selected skills count", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        "1": true,
        "2": true,
      },
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: false,
    });
    render(<RemoveSkillsButton />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders translated delete text", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        "1": true,
      },
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: false,
    });
    render(<RemoveSkillsButton />);
    expect(screen.getByText("delete")).toBeInTheDocument();
  });

  it("renders loading text", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        "1": true,
      },
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: true,
    });
    render(<RemoveSkillsButton />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables button while loading", () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        "1": true,
      },
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: true,
    });
    render(<RemoveSkillsButton />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("calls handleDeleteProfileSkills on click", async () => {
    useSkillStore.mockReturnValue({
      deleteSkills: {
        "1": true,
      },
    });
    useDeleteProfileSkills.mockReturnValue({
      handleDeleteProfileSkills: handleDeleteProfileSkillsMock,
      loading: false,
    });
    render(<RemoveSkillsButton />);
    await userEvent.click(screen.getByRole("button"));
    expect(handleDeleteProfileSkillsMock).toHaveBeenCalled();
  });
});
