import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FormElement } from "@/types/form-builder";
import { MailIcon } from "lucide-react";

interface TextInputElementProps {
  element: FormElement;
}

export const EmailInputElement = ({ element }: TextInputElementProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={element.id}
          placeholder={element.placeholder}
          autoComplete="off"
          disabled={element.disabled}
        />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{element.description}</FieldDescription>
    </Field>
  );
};
