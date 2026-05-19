import { TUserFormMode, TUserFormValues } from "../../model/user-form.types";

export type TUserFormProps = {
  mode: TUserFormMode;
  defaultValues?: Partial<TUserFormValues>;
  loading?: boolean;
  serverError?: string;
  submitAction: (values: TUserFormValues) => Promise<void>;
  cancelAction: () => void;
};
