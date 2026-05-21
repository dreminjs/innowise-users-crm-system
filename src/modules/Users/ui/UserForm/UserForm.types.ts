import {
  TCreateUserFormValues,
  TEditUserFormValues,
} from "@/modules/Users/model/user-form.schema";

type BaseProps = {
  loading?: boolean;
  serverError?: string;
  cancelAction: () => void;
};

type CreateProps = BaseProps & {
  mode: "create";
  defaultValues?: Partial<TCreateUserFormValues>;
  submitAction: (values: TCreateUserFormValues) => Promise<void>;
};

type EditProps = BaseProps & {
  mode: "edit";
  defaultValues?: Partial<TEditUserFormValues>;
  submitAction: (values: TEditUserFormValues) => Promise<void>;
};

export type TUserFormProps = CreateProps | EditProps;
