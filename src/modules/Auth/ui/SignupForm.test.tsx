import { fireEvent, render, screen } from "@testing-library/react";
import { SignupForm } from "./SignupForm";
import { useSignup } from "../model/hooks/useSignup";
import { useAuthForm } from "../model/hooks/useAuthForm";

jest.mock("../model/hooks/useSignup", () => ({
  useSignup: jest.fn(),
}));

jest.mock("../model/hooks/useAuthForm", () => ({
  useAuthForm: jest.fn(),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/shared/ui/FormField", () => ({
  FormField: ({
    label,
    name,
    type,
    register,
  }: {
    label: string;
    name: string;
    type: string;
    register: (name: string) => object;
  }) => <input aria-label={label} type={type} {...register(name)} />,
}));

describe("SignupForm", () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSignup as unknown as jest.Mock).mockReturnValue({
      onSubmit: onSubmitMock,
      loading: false,
    });

    (useAuthForm as unknown as jest.Mock).mockReturnValue({
      register: jest.fn(() => ({})),
      handleSubmit: (callback: (...args: any[]) => void) => () => callback(),
      errors: {},
    });
  });

  it("should render form", () => {
    render(<SignupForm />);

    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("should render email input", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  it("should render password input", () => {
    render(<SignupForm />);

    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  it("should submit form", () => {
    render(<SignupForm />);

    const form = document.querySelector("form") as HTMLFormElement;

    fireEvent.submit(form);

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
