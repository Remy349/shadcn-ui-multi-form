import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
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

interface CheckboxInputElementProps {
  element: FormElement;
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
        name={element.name}
        disabled={element.disabled}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={fieldState.invalid}
      />
      <FieldContent>
        <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
        <FieldDescription>{element.description}</FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
    </Field>
  );
};
