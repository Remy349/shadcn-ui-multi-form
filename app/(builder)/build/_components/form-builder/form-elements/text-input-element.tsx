import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormElement } from "@/types/form-builder";

interface TextInputElementProps {
  element: FormElement;
}

export const TextInputElement = ({ element }: TextInputElementProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
      <Input
        id={element.id}
        autoComplete="off"
        placeholder={element.placeholder}
        disabled
      />
      <FieldDescription>{element.description}</FieldDescription>
    </Field>
  );
};
