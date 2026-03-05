import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { PhoneInput } from "@/components/ui/phone-input";
import type { FieldElement } from "@/types/form-builder";

interface PhoneInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const PhoneInputElement = ({
  element,
  field,
  fieldState,
}: PhoneInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <PhoneInput
        {...field}
        id={element.name}
        placeholder={element.placeholder}
        aria-invalid={fieldState.invalid}
        autoComplete="off"
        disabled={element.disabled}
      />
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
