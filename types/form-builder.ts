export type FieldElementType =
  | "text"
  | "email"
  | "textarea"
  | "checkbox"
  | "switch"
  | "password"
  | "select"
  | "combobox"
  | "multi-select"
  | "file"
  | "rich-text-editor"
  | "date-picker"
  | "input-otp"
  | "slider"
  | "phone-input"
  | "radio-group"
  | "signature";

export type LayoutElementType = "two-columns" | "separator";

interface BuilderElementBase {
  id: string;
}

export interface FieldElement extends BuilderElementBase {
  kind: "field";
  type: FieldElementType;
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
  sliderConfig?: {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
    orientation?: "horizontal" | "vertical";
  };
  radioGroupOptions?: {
    items: {
      label: string;
      value: string;
    }[];
  };
  comboboxOptions?: {
    items: {
      label: string;
      value: string;
    }[];
  };
  multiSelectOptions?: {
    items: {
      label: string;
      value: string;
    }[];
  };
  signatureConfig?: {
    height?: number;
    penColor?: string;
    backgroundColor?: string;
    strokeWidth?: number;
  };
}

export interface TwoColumnsLayoutElement extends BuilderElementBase {
  kind: "layout";
  type: "two-columns";
  columns: {
    left: string[];
    right: string[];
  };
}

export interface SeparatorLayoutElement extends BuilderElementBase {
  kind: "layout";
  type: "separator";
  label?: string;
}

export type LayoutElement = TwoColumnsLayoutElement | SeparatorLayoutElement;

export type BuilderElement = FieldElement | LayoutElement;

export const isFieldElement = (
  element: BuilderElement,
): element is FieldElement => element.kind === "field";

export const isLayoutElement = (
  element: BuilderElement,
): element is LayoutElement => element.kind === "layout";

export interface Form {
  id: string;
  title: string;
  description?: string;
  elements: BuilderElement[];
}

export type UpdateFormElement = Partial<BuilderElement>;

export type UpdateForm = Pick<Form, "title" | "description">;
