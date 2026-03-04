import type { BuilderElement, FieldElement } from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";

export type RenderPlan = {
  roots: BuilderElement[];
  fieldById: Map<string, FieldElement>;
};

export const buildRenderPlan = (elements: BuilderElement[]): RenderPlan => {
  const fieldById = new Map<string, FieldElement>();
  const referencedIds = new Set<string>();

  for (const element of elements) {
    if (isFieldElement(element)) {
      fieldById.set(element.id, element);
      continue;
    }

    if (isLayoutElement(element) && element.type === "two-columns") {
      for (const id of element.columns.left) referencedIds.add(id);
      for (const id of element.columns.right) referencedIds.add(id);
    }
  }

  const roots = elements.filter((element) => !referencedIds.has(element.id));

  return { roots, fieldById };
};
