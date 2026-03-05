import { getFieldCodegen } from "@/lib/builder/field-codegen";
import type { FieldElement } from "@/types/form-builder";

export const generateFormElements = (element: FieldElement) => {
  const { element: renderer } = getFieldCodegen(element.type);

  return renderer(element);
};
