export type FormElementType =
  | "text"
  | "email"
  | "textarea"
  | "checkbox"
  | "switch";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  description?: string;
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  elements: FormElement[];
}

export type UpdateFormElement = Partial<FormElement>;

export type UpdateForm = Pick<Form, "title" | "description">;
