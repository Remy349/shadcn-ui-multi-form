import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldElement } from "@/types/form-builder";

interface CheckboxInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const CheckboxInputElement = ({
  element,
  field,
  fieldState,
}: CheckboxInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid} orientation="horizontal">
      <Checkbox
        id={element.name}
        name={field.name}
        disabled={element.disabled}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
      <FieldContent>
        <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
        <FieldDescription>{element.description}</FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
    </Field>
  );
};
