import { zodResolver } from "@hookform/resolvers/zod";
import { TSkillForm } from "../skill.interface";
import { useForm } from "react-hook-form";
import { skillSchema } from "../skill.schema";
import { Mastery } from "@/generated/graphql";
import { useEffect } from "react";

export const useSkillForm = (defaultValues?: TSkillForm) => {
  const { control, handleSubmit, reset, setValue, watch } = useForm<TSkillForm>(
    {
      resolver: zodResolver(skillSchema),
      defaultValues,
    },
  );

  const currentCategoryId = watch("categoryId");

  const handleChangeSkill = (newValue: string) => {
    setValue("categoryId", newValue);
  };

  const handleChangeMastery = (newValue: Mastery) => {
    setValue("mastery", newValue);
  };

  return {
    control,
    handleSubmit,
    reset,
    handleChangeSkill,
    handleChangeMastery,
    currentCategoryId,
  };
};
