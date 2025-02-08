export type TInputType = "text" | "email" | "password";

export type TInput = {
  id: string;
  label: string;
  type: TInputType;
};

export type TForm = {
  id: string;
  inputs: TInput[];
};
