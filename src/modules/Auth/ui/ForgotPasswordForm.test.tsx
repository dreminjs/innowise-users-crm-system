import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useForgotPassword } from "../model/hooks/useForgotPassword";

jest.mock("../model/hooks/useForgotPassword", () => ({
  useForgotPassword: jest.fn(),
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

describe("ForgotPasswordForm", () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useForgotPassword as unknown as jest.Mock).mockReturnValue({
      onSubmit: onSubmitMock,
      loading: false,
    });
  });

  it("should render form", () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByText("ForgotPassword.title")).toBeInTheDocument();
  });

  it("should render email input", () => {
    render(<ForgotPasswordForm />);

    expect(screen.getByLabelText("Login.email")).toBeInTheDocument();
  });

  it("should submit form", async () => {
    render(<ForgotPasswordForm />);

    fireEvent.change(screen.getByLabelText("Login.email"), {
      target: {
        value: "test@test.com",
      },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });
});
