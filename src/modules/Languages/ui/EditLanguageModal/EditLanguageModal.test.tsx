import { render, screen } from "@testing-library/react";
import { EditLanguageModal } from "./EditLanguageModal";
import { useUserStore } from "@/application/store/user.store";
import { Proficiency } from "@/generated/graphql";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock("@/application/store/user.store", () => ({
  useUserStore: jest.fn(),
}));

jest.mock("./EditLanguageForm", () => ({
  EditLanguageForm: ({
    toggleAction,
    name,
    proficiency,
  }: {
    toggleAction: () => void;
    name: string;
    proficiency: string;
  }) => (
    <div>
      <div>
        name:
        {name}
      </div>

      <div>
        proficiency:
        {proficiency}
      </div>
      <button onClick={toggleAction}>toggle</button>
    </div>
  ),
}));

jest.mock("@/shared/ui/FormModal", () => ({
  FormModal: ({
    open,
    toggleAction,
    title,
    children,
  }: {
    open: boolean;
    toggleAction: () => void;
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <div>
        open:
        {String(open)}
      </div>

      <div>
        title:
        {title}
      </div>
      <button type="button" onClick={toggleAction}>
        modal-toggle
      </button>
      {children}
    </div>
  ),
}));

describe("EditLanguageModal", () => {
  const toggleAction = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: "user-1",
      }),
    );
  });
  it("renders FormModal", () => {
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(screen.getByText("open:true")).toBeInTheDocument();
  });
  it("passes translated title to FormModal", () => {
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(screen.getByText("title:edit")).toBeInTheDocument();
  });
  it("renders EditLanguageForm when currentUserId exists", () => {
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.C1}
      />,
    );
    expect(screen.getByText("name:English")).toBeInTheDocument();
    expect(screen.getByText("proficiency:C1")).toBeInTheDocument();
  });

  it("does not render EditLanguageForm when currentUserId is null", () => {
    (useUserStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        userId: null,
      }),
    );
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(screen.queryByText("name:English")).not.toBeInTheDocument();
  });

  it("passes toggleAction to EditLanguageForm", () => {
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    screen.getByText("toggle").click();
    expect(toggleAction).toHaveBeenCalled();
  });

  it("passes open prop to FormModal", () => {
    render(
      <EditLanguageModal
        open={false}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    expect(screen.getByText("open:false")).toBeInTheDocument();
  });

  it("passes toggleAction to FormModal", () => {
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="English"
        proficiency={Proficiency.B2}
      />,
    );
    screen.getByText("modal-toggle").click();
    expect(toggleAction).toHaveBeenCalled();
  });
  it("passes name and proficiency to EditLanguageForm", () => {
    render(
      <EditLanguageModal
        open={true}
        toggleAction={toggleAction}
        name="German"
        proficiency={Proficiency.Native}
      />,
    );
    expect(screen.getByText("name:German")).toBeInTheDocument();
    expect(screen.getByText("proficiency:Native")).toBeInTheDocument();
  });
});
