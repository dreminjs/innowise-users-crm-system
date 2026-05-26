import { renderHook } from "@testing-library/react";
import { useUserForm } from "./useUserForm";
import { useTranslations } from "next-intl";
import { UserRole } from "@/generated/graphql";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

describe("useUserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTranslations as unknown as jest.Mock).mockReturnValue(
      (key: string) => key,
    );
  });
  it("should return create form default values", () => {
    const { result } = renderHook(() =>
      useUserForm({
        mode: "create",
      }),
    );
    expect(result.current.getValues()).toEqual({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      departmentId: "",
      positionId: "",
      role: UserRole.Employee,
    });
  });
  it("should return edit form default values", () => {
    const { result } = renderHook(() =>
      useUserForm({
        mode: "edit",
      }),
    );
    expect(result.current.getValues()).toEqual({
      firstName: "",
      lastName: "",
      departmentId: "",
      positionId: "",
      role: UserRole.Employee,
    });
  });
  it("should use create default values", () => {
    const { result } = renderHook(() =>
      useUserForm({
        mode: "create",
        defaultValues: {
          email: "test@test.com",
          password: "123456",
          firstName: "John",
          lastName: "Doe",
          departmentId: "10",
          positionId: "20",
          role: UserRole.Admin,
        },
      }),
    );
    expect(result.current.getValues()).toEqual({
      email: "test@test.com",
      password: "123456",
      firstName: "John",
      lastName: "Doe",
      departmentId: "10",
      positionId: "20",
      role: UserRole.Admin,
    });
  });

  it("should use edit default values", () => {
    const { result } = renderHook(() =>
      useUserForm({
        mode: "edit",
        defaultValues: {
          firstName: "John",
          lastName: "Doe",
          departmentId: "10",
          positionId: "20",
          role: UserRole.Admin,
        },
      }),
    );
    expect(result.current.getValues()).toEqual({
      firstName: "John",
      lastName: "Doe",
      departmentId: "10",
      positionId: "20",
      role: UserRole.Admin,
    });
  });
  it("should use onBlur mode", () => {
    const { result } = renderHook(() =>
      useUserForm({
        mode: "create",
      }),
    );
    expect(result.current.control._options.mode).toBe("onBlur");
  });
  it("should return form methods", () => {
    const { result } = renderHook(() =>
      useUserForm({
        mode: "create",
      }),
    );
    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.setValue).toBeDefined();
    expect(result.current.getValues).toBeDefined();
  });
});
