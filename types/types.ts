export type TInputType =
  | "input"
  | "textarea"
  | "password"
  | "checkbox"
  | "switch"
  | "file-input"
  | "rich-text-editor";

export type TInput = {
  id: string;
  type: TInputType;
  label: string;
  placeholder: string;
  description: string;
};

export type TUpdateInput = Pick<
  TInput,
  "label" | "placeholder" | "description"
>;

export type TForm = {
  id: string;
  inputs: TInput[];
};
