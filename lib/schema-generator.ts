import z from "zod";
import { getFieldRegistryItem } from "@/lib/builder/registry";
import type { BuilderElement } from "@/types/form-builder";
import { isFieldElement } from "@/types/form-builder";

export const generateZodSchema = (elements: BuilderElement[]) => {
  const shape: Record<string, z.ZodType> = {};
  const defaultValues: Record<string, unknown> = {};

  elements.forEach((element) => {
    if (!isFieldElement(element)) return;

    const registryItem = getFieldRegistryItem(element.type);
    const { schema, defaultValue } = registryItem.buildSchema(element);

    shape[element.name] = schema;
    defaultValues[element.name] = defaultValue;
  });

  const schema = z.object(shape);

  return { schema, defaultValues };
};
