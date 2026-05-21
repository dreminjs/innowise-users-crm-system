import { fireEvent, render, screen } from "@testing-library/react";
import { SigninForm } from "./SigninForm";
import { useSignin } from "../model/hooks/useSignin";
import { useAuthForm } from "../model/hooks/useAuthForm";

jest.mock("../model/hooks/useSignin", () => ({
  useSignin: jest.fn(),
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

describe("SigninForm", () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useSignin as unknown as jest.Mock).mockReturnValue({
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
    render(<SigninForm />);

    expect(screen.getByText("title")).toBeInTheDocument();
  });

  it("should render email input", () => {
    render(<SigninForm />);

    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  it("should render password input", () => {
    render(<SigninForm />);

    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  it("should submit form", () => {
    render(<SigninForm />);

    const form = document.querySelector("form") as HTMLFormElement;

    fireEvent.submit(form);

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
