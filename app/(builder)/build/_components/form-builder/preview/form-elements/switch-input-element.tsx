import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { FormElement } from "@/types/form-builder";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface SwitchInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const SwitchInputElement = ({
  element,
  field,
  fieldState,
}: SwitchInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid} orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
        <FieldDescription>{element.description}</FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Switch
        id={element.name}
        name={field.name}
        disabled={element.disabled}
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </Field>
  );
};
