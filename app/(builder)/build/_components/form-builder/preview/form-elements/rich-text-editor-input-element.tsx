import { RichTextEditor } from "@/components/ui/editor/rich-text-editor";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FormElement } from "@/types/form-builder";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface RichTextEditorInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const RichTextEditorInputElement = ({
  element,
  field,
  fieldState,
}: RichTextEditorInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <RichTextEditor content={field.value} onChange={field.onChange} />
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
