import { renderHook, act } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Proficiency } from "@/generated/graphql";
import { useLanguageForm } from "./useLanguageForm";
import { languageSchema } from "../languages.schema";

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@hookform/resolvers/zod", () => ({
  zodResolver: jest.fn(),
}));

jest.mock("../languages.schema", () => ({
  languageSchema: "languageSchema",
}));

describe("useLanguageForm", () => {
  const control = {};
  const handleSubmit = jest.fn();
  const reset = jest.fn();
  const setValue = jest.fn();
  const watch = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (zodResolver as jest.Mock).mockReturnValue("resolver");
    (useForm as jest.Mock).mockReturnValue({
      control,
      handleSubmit,
      reset,
      setValue,
      watch,
    });
    watch.mockReturnValue("English");
  });

  it("calls useForm with resolver and defaultValues", () => {
    renderHook(() =>
      useLanguageForm({
        name: "English",
        proficiency: Proficiency.B2,
      }),
    );

    expect(useForm).toHaveBeenCalledWith({
      resolver: "resolver",
      defaultValues: {
        name: "English",
        proficiency: Proficiency.B2,
      },
    });
  });

  it("calls zodResolver with languageSchema", () => {
    renderHook(() => useLanguageForm());
    expect(zodResolver).toHaveBeenCalledWith(languageSchema);
  });

  it("returns form methods", () => {
    const { result } = renderHook(() => useLanguageForm());
    expect(result.current.control).toBe(control);
    expect(result.current.handleSubmit).toBe(handleSubmit);
    expect(result.current.reset).toBe(reset);
  });

  it("returns currentName from watch", () => {
    const { result } = renderHook(() => useLanguageForm());
    expect(watch).toHaveBeenCalledWith("name");
    expect(result.current.currentName).toBe("English");
  });

  it("changes name", () => {
    const { result } = renderHook(() => useLanguageForm());
    act(() => {
      result.current.handleChangeName("German");
    });
    expect(setValue).toHaveBeenCalledWith("name", "German");
  });

  it("changes proficiency", () => {
    const { result } = renderHook(() => useLanguageForm());
    act(() => {
      result.current.handleChangeProficiency(Proficiency.C1);
    });
    expect(setValue).toHaveBeenCalledWith("proficiency", Proficiency.C1);
  });

  it("works without defaultValues", () => {
    renderHook(() => useLanguageForm());
    expect(useForm).toHaveBeenCalledWith({
      resolver: "resolver",
      defaultValues: undefined,
    });
  });
  it("handles different watched name", () => {
    watch.mockReturnValue("Spanish");
    const { result } = renderHook(() => useLanguageForm());
    expect(result.current.currentName).toBe("Spanish");
  });
});
