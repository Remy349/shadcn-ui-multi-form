import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { FormElement } from "@/types/form-builder";

interface PasswordInputElementProps {
  element: FormElement;
}

export const PasswordInputElement = ({
  element,
}: PasswordInputElementProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
      <PasswordInput
        id={element.id}
        placeholder={element.placeholder}
        autoComplete="off"
        disabled
      />
      <FieldDescription>{element.description}</FieldDescription>
    </Field>
  );
};
