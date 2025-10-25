import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { FormElement } from "@/types/form-builder";

interface TextareaInputElementProps {
  element: FormElement;
}

export const TextareaInputElement = ({
  element,
}: TextareaInputElementProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
      <Textarea
        id={element.id}
        autoComplete="off"
        placeholder={element.placeholder}
        disabled={element.disabled}
      />
      <FieldDescription>{element.description}</FieldDescription>
    </Field>
  );
};
