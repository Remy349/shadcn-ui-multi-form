import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { FormElement } from "@/types/form-builder";

interface CheckboxInputElementProps {
  element: FormElement;
}

export const CheckboxInputElement = ({
  element,
}: CheckboxInputElementProps) => {
  return (
    <Field orientation="horizontal">
      <Checkbox id={element.id} disabled={element.disabled} checked />
      <FieldContent>
        <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
        <FieldDescription>{element.description}</FieldDescription>
      </FieldContent>
    </Field>
  );
};
