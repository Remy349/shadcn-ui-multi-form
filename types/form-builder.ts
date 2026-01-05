export type FormElementType =
  | "text"
  | "email"
  | "textarea"
  | "checkbox"
  | "switch"
  | "password"
  | "select"
  | "file"
  | "rich-text-editor"
  | "date-picker"
  | "input-otp";

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  name: string;
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
  fileConfig?: {
    accept?: string;
    multiple?: boolean;
    maxSize?: number;
    maxFiles?: number;
    showPreview?: boolean;
    previewSize?: "sm" | "md" | "lg";
    variant?: "default" | "compact" | "minimal";
  };
  otpConfig?: {
    length?: number;
    pattern?: string;
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
