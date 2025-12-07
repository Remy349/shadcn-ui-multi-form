import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FormElement } from "@/types/form-builder";
import { MailIcon } from "lucide-react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface EmailInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const EmailInputElement = ({
  element,
  field,
  fieldState,
}: EmailInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          {...field}
          id={element.name}
          aria-invalid={fieldState.invalid}
          placeholder={element.placeholder}
          autoComplete="off"
          disabled={element.disabled}
        />
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
