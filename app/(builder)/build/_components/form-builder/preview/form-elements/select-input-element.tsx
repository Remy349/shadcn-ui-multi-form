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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FieldElement } from "@/types/form-builder";

interface SelectInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const SelectInputElement = ({
  element,
  field,
  fieldState,
}: SelectInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
        disabled={element.disabled}
      >
        <SelectTrigger id={element.name} aria-invalid={fieldState.invalid}>
          <SelectValue placeholder={element.placeholder} />
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{element.options?.selectLabel}</SelectLabel>
              {element.options?.selectItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
