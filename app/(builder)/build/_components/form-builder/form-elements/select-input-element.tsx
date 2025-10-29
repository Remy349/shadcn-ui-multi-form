import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormElement } from "@/types/form-builder";

interface SelectInputElementProps {
  element: FormElement;
}

export const SelectInputElement = ({ element }: SelectInputElementProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={element.id}>{element.label}</FieldLabel>
      <Select disabled={element.disabled}>
        <SelectTrigger id={element.id}>
          <SelectValue placeholder={element.placeholder} />
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{element.options?.selectLabel}</SelectLabel>
              {element.options?.selectItems.map((item, index) => (
                <SelectItem key={index} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </SelectTrigger>
      </Select>
      <FieldDescription>{element.description}</FieldDescription>
    </Field>
  );
};
