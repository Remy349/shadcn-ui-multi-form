import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldElement } from "@/types/form-builder";

interface DatePickerInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const DatePickerInputElement = ({
  element,
  field,
  fieldState,
}: DatePickerInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <DatePicker
        id={element.name}
        value={field.value}
        onChange={field.onChange}
        aria-invalid={fieldState.invalid}
        placeholder={element.placeholder}
        disabled={element.disabled}
      />
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
