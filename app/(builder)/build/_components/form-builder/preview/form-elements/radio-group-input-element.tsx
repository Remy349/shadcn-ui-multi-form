import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormElement } from "@/types/form-builder";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface RadioGroupInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const RadioGroupInputElement = ({
  fieldState,
  field,
  element,
}: RadioGroupInputElementProps) => {
  return (
    <FieldSet data-invalid={fieldState.invalid}>
      <FieldLegend>{element.label}</FieldLegend>
      <FieldDescription>{element.description}</FieldDescription>
      <RadioGroup
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
        aria-invalid={fieldState.invalid}
        disabled={element.disabled}
      >
        {element.radioGroupOptions?.items.map((item) => (
          <FieldLabel key={item.value} htmlFor={item.value}>
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <FieldContent>
                <FieldTitle>{item.label}</FieldTitle>
              </FieldContent>
              <RadioGroupItem
                value={item.value}
                id={item.value}
                aria-invalid={fieldState.invalid}
              />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  );
};
