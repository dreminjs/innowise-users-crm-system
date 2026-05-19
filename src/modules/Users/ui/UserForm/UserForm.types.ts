import { TUserFormMode, TUserFormValues } from "../../model/user-form.types";
import { SubmitHandler } from "react-hook-form";

export type TUserFormProps = {
  mode: TUserFormMode;
  defaultValues?: Partial<TUserFormValues>;
  loading?: boolean;
  submitAction: SubmitHandler<TUserFormValues>;
  cancelAction: () => void;
};
