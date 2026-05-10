import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { languageSchema } from "../languages.schema";
import { TLanguageForm } from "../languages.interface";
import { Proficiency } from "@/generated/graphql";
import { useEffect } from "react";

export const useLanguageForm = (defaultValues?: TLanguageForm) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TLanguageForm>({
    resolver: zodResolver(languageSchema),
    defaultValues,
  });

  useEffect(() => {
    console.log(errors);
  }, [Object.values(errors)]);

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
