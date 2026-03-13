import * as React from "react";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldElement } from "@/types/form-builder";

interface ComboboxInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const ComboboxInputElement = ({
  element,
  field,
  fieldState,
}: ComboboxInputElementProps) => {
  const items = React.useMemo(
    () => element.comboboxOptions?.items ?? [],
    [element.comboboxOptions],
  );

  const itemsValues = React.useMemo(
    () => items.map((item) => item.value),
    [items],
  );

  const itemsValueSet = React.useMemo(
    () => new Set(itemsValues),
    [itemsValues],
  );

  const labelByValue = React.useMemo(
    () => new Map(items.map((item) => [item.value, item.label])),
    [items],
  );

  React.useEffect(() => {
    if (!field.value || itemsValueSet.has(field.value)) return;
    field.onChange("");
  }, [field, itemsValueSet]);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <Combobox
        items={itemsValues}
        value={field.value}
        onValueChange={field.onChange}
        disabled={element.disabled}
      >
        <ComboboxInput
          id={element.name}
          placeholder={element.placeholder}
          aria-invalid={fieldState.invalid}
          autoComplete="off"
          showClear
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxList>
            {(item) => (
              <ComboboxItem key={item} value={item}>
                {labelByValue.get(item) ?? item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
