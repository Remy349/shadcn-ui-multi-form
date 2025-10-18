import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { FormElement } from "@/types/form-builder";

interface SwitchInputElementProps {
  element: FormElement;
}

export const SwitchInputElement = ({ element }: SwitchInputElementProps) => {
  return (
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
        <FieldDescription>{element.description}</FieldDescription>
      </FieldContent>
      <Switch id={element.id} disabled checked />
    </Field>
  );
};
