export type TInputType = "input" | "textarea" | "password";

export type TInput = {
  id: string;
  type: TInputType;
  label: string;
};

export type TForm = {
  id: string;
  inputs: TInput[];
};
