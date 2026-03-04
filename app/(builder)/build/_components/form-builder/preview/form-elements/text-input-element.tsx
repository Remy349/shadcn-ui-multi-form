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
import { Input } from "@/components/ui/input";
import type { FieldElement } from "@/types/form-builder";

interface TextInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const TextInputElement = ({
  element,
  field,
  fieldState,
}: TextInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <Input
        {...field}
        id={element.name}
        autoComplete="off"
        aria-invalid={fieldState.invalid}
        placeholder={element.placeholder}
        disabled={element.disabled}
      />
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
