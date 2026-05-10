import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { languageSchema } from "../languages.schema";
import { TLanguageForm } from "../languages.interface";
import { Proficiency } from "@/generated/graphql";

export const useLanguageForm = (defaultValues?: TLanguageForm) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<TLanguageForm>({
      resolver: zodResolver(languageSchema),
      defaultValues,
    });

  const currentName = watch("name");

  const handleChangeName = (newValue: string) => {
    setValue("name", newValue);
  };

  const handleChangeProficiency = (newValue: Proficiency) => {
    setValue("proficiency", newValue);
  };

  return {
    control,
    handleSubmit,
    reset,
    handleChangeName,
    handleChangeProficiency,
    currentName,
  };
};
