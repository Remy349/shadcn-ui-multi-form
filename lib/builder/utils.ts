import type { Form } from "@/types/form-builder";

export const getFormTemplateType = (forms: Form[]): "single" | "multi" => {
  return forms.length > 1 ? "multi" : "single";
};
