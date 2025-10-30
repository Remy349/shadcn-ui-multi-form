export type FormElementType =
  | "text"
  | "email"
  | "textarea"
  | "checkbox"
  | "switch"
  | "password"
  | "select";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: {
    selectLabel: string;
    selectItems: { label: string; value: string }[];
  };
}

export interface Form {
  id: string;
  title: string;
  description?: string;
  elements: FormElement[];
}

export type UpdateFormElement = Partial<FormElement>;

export type UpdateForm = Pick<Form, "title" | "description">;
