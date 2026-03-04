import {
  type Control,
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
} from "react-hook-form";
import { FieldSeparator } from "@/components/ui/field";
import type { BuilderElement, FieldElement } from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";

type RenderContext = {
  fieldById: Map<string, FieldElement>;
  getController: (element: FieldElement) => React.ReactElement | null;
};

export const renderPreviewNode = (
  element: BuilderElement,
  context: RenderContext,
): React.ReactElement | null => {
  if (isFieldElement(element)) {
    return context.getController(element);
  }

  if (!isLayoutElement(element)) {
    return null;
  }

  if (element.type === "separator") {
    const label = element.label?.trim();

    return <FieldSeparator>{label ? label : null}</FieldSeparator>;
  }

  if (element.type === "two-columns") {
    const left = element.columns.left
      .map((id) => context.fieldById.get(id))
      .filter(Boolean) as FieldElement[];
    const right = element.columns.right
      .map((id) => context.fieldById.get(id))
      .filter(Boolean) as FieldElement[];

    return (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          {left.map((field) => (
            <div key={field.id}>{context.getController(field)}</div>
          ))}
        </div>
        <div className="space-y-6">
          {right.map((field) => (
            <div key={field.id}>{context.getController(field)}</div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export const createControllerRenderer = (
  control: Control<FieldValues>,
  renderField: (
    element: FieldElement,
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState,
  ) => React.ReactElement,
) => {
  return (element: FieldElement) => (
    <Controller
      key={element.id}
      name={element.name}
      control={control}
      render={({ field, fieldState }) =>
        renderField(element, field, fieldState)
      }
    />
  );
};
