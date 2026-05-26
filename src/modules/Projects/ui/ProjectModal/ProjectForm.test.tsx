import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProjectForm } from "./ProjectForm";

jest.mock("@apollo/client/react", () => ({
  useQuery: () => ({
    data: {
      skills: [
        {
          name: "dev",
        },
        {
          name: "staging",
        },
        {
          name: "prod",
        },
      ],
    },
  }),
}));

jest.mock("@/shared/ui/DatePicker/DatePicker", () => ({
  DatePicker: (props: {
    value?: string;
    changeAction?: (value: string) => void;
  }) => (
    <input
      data-testid="mock-datepicker"
      value={props.value || ""}
      onChange={(e) => {
        if (props.changeAction) {
          props.changeAction(e.target.value);
        }
      }}
    />
  ),
}));

jest.mock("@/shared/ui/CustomSelect", () => ({
  CustomSelect: ({
    onChange,
    options,
  }: {
    onChange: (value: string) => void;
    options: {
      label: string;
      value: string;
    }[];
  }) => (
    <select
      data-testid="environment-select"
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

describe("ProjectForm", () => {
  const defaultProps = {
    closeAction: jest.fn(),
    submitAction: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should transform environment string to array and submit correctly", async () => {
    render(<ProjectForm {...defaultProps} mode="edit" />);

    const nameInput = screen.getByText("name")
      .previousElementSibling as HTMLInputElement;

    fireEvent.change(nameInput, {
      target: {
        value: "New Project",
      },
    });

    const domainInput = screen.getByText("domain")
      .previousElementSibling as HTMLInputElement;

    fireEvent.change(domainInput, {
      target: {
        value: "example.com",
      },
    });

    const datePickers = screen.getAllByTestId("mock-datepicker");

    if (datePickers[0]) {
      fireEvent.change(datePickers[0], {
        target: {
          value: "2026-05-22",
        },
      });
    }

    if (datePickers[1]) {
      fireEvent.change(datePickers[1], {
        target: {
          value: "2026-06-01",
        },
      });
    }

    const descInput = screen.getByText("description")
      .previousElementSibling as HTMLTextAreaElement;

    fireEvent.change(descInput, {
      target: {
        value: "Test description for the project",
      },
    });

    const select = screen.getByTestId("environment-select");

    fireEvent.change(select, {
      target: {
        value: "dev",
      },
    });

    fireEvent.change(select, {
      target: {
        value: "staging",
      },
    });

    fireEvent.change(select, {
      target: {
        value: "prod",
      },
    });

    const submitButton = screen.getByRole("button", {
      name: /save/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(defaultProps.submitAction).toHaveBeenCalledTimes(1);
    });

    expect(defaultProps.submitAction).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "New Project",
        domain: "example.com",
        description: "Test description for the project",
        environment: ["dev", "staging", "prod"],
        start_date: "2026-05-22",
        end_date: "2026-06-01",
      }),
    );
  });
});
