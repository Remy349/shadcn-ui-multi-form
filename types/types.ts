export type TInputType = "input" | "textarea" | "password";

export type TInput = {
  id: string;
  type: TInputType;
  label: string;
  placeholder: string | null;
};

export type TUpdateInput = Pick<TInput, "label" | "placeholder">;

export type TForm = {
  id: string;
  inputs: TInput[];
};
