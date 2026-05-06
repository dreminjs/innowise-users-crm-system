import { useForm } from "react-hook-form";
import { TAuthFormData } from "../auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../auth.schema";

export const useAuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthFormData>({
    resolver: zodResolver(authSchema),
  });

  return {
    register,
    handleSubmit,
    errors,
  };
};
