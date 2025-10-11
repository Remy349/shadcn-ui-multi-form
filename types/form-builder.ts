export type FormElementType = "text" | "email";

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
  elements: FormElement[];
}
