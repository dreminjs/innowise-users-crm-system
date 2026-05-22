import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useForm } from "react-hook-form";
import { FormField } from "./FormField";

jest.mock("@/shared/ui/Icon/Icon", () => ({
  Icon: () => <div data-testid="icon">icon</div>,
}));

type FormValues = {
  email: string;
  password: string;
  name: string;
};

const TestComponent = ({
  type,
  error,
  isAvailable,
}: {
  type: "text" | "email" | "password";
  error?: string;
  isAvailable?: boolean;
}) => {
  const { register } = useForm<FormValues>();

  return (
    <FormField<FormValues>
      type={type}
      register={register}
      name={
        type === "password" ? "password" : type === "email" ? "email" : "name"
      }
      label="Label"
      error={error}
      isAvailable={isAvailable}
    />
  );
};

describe("FormField", () => {
  it("renders input", () => {
    render(<TestComponent type="text" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<TestComponent type="text" />);
    expect(screen.getByText("Label")).toBeInTheDocument();
  });

  it("renders error message", () => {
    render(<TestComponent type="text" error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("renders password toggle button", () => {
    render(<TestComponent type="password" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("toggles password visibility", async () => {
    render(<TestComponent type="password" />);
    const input = document.querySelector('input[name="password"]');
    expect(input).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button"));
    expect(input).toHaveAttribute("type", "text");
  });

  it("renders icon for password field", () => {
    render(<TestComponent type="password" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("disables input when isAvailable is false", () => {
    render(<TestComponent type="text" isAvailable={false} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("keeps input enabled by default", () => {
    render(<TestComponent type="text" />);
    expect(screen.getByRole("textbox")).not.toBeDisabled();
  });

  it("renders email input", () => {
    render(<TestComponent type="email" />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
