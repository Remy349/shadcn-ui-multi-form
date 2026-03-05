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
import { PasswordInput } from "@/components/ui/password-input";
import type { FieldElement } from "@/types/form-builder";

interface PasswordInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const PasswordInputElement = ({
  element,
  field,
  fieldState,
}: PasswordInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <PasswordInput
        {...field}
        id={element.name}
        aria-invalid={fieldState.invalid}
        placeholder={element.placeholder}
        autoComplete="off"
        disabled={element.disabled}
      />
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
