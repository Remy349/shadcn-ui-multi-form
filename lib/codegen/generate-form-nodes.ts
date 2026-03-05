import { buildRenderPlan } from "@/lib/builder/render-plan";
import type {
  BuilderElement,
  FieldElement,
  LayoutElement,
} from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";
import { generateFormElements } from "./generate-form-elements";

const renderSeparatorNode = (layout: LayoutElement) => {
  if (layout.type !== "separator") return "";

  const label = layout.label?.trim();

  return label
    ? `<FieldSeparator>${label}</FieldSeparator>`
    : `<FieldSeparator />`;
};

const renderTwoColumnNode = (
  layout: LayoutElement,
  fieldById: Map<string, FieldElement>,
) => {
  if (layout.type !== "two-columns") return "";

  const leftElements = layout.columns.left
    .map((id) => fieldById.get(id))
    .filter(Boolean) as FieldElement[];
  const rightElements = layout.columns.right
    .map((id) => fieldById.get(id))
    .filter(Boolean) as FieldElement[];

  const leftCode = leftElements
    .map((element) => generateFormElements(element))
    .join("\n");
  const rightCode = rightElements
    .map((element) => generateFormElements(element))
    .join("\n");

  return `
<div className="grid gap-6 md:grid-cols-2">
  <div className="space-y-6">
    ${leftCode}
  </div>
  <div className="space-y-6">
    ${rightCode}
  </div>
</div>
`;
};

const renderLayoutNode = (
  layout: LayoutElement,
  fieldById: Map<string, FieldElement>,
) => {
  if (layout.type === "separator") {
    return renderSeparatorNode(layout);
  }

  if (layout.type === "two-columns") {
    return renderTwoColumnNode(layout, fieldById);
  }

  return "";
};

const renderNode = (
  element: BuilderElement,
  fieldById: Map<string, FieldElement>,
) => {
  if (isFieldElement(element)) {
    return generateFormElements(element);
  }

  if (isLayoutElement(element)) {
    return renderLayoutNode(element, fieldById);
  }

  return "";
};

export const generateFormNodes = (elements: BuilderElement[]) => {
  const { roots, fieldById } = buildRenderPlan(elements);

  return roots.map((element) => renderNode(element, fieldById)).join("\n");
};
