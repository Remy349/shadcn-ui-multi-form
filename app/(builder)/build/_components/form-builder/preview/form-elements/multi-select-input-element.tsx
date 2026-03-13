import * as React from "react";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import type { FieldElement } from "@/types/form-builder";

interface MultiSelectInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const MultiSelectInputElement = ({
  element,
  field,
  fieldState,
}: MultiSelectInputElementProps) => {
  const anchor = useComboboxAnchor();
  const items = React.useMemo(
    () => element.multiSelectOptions?.items ?? [],
    [element.multiSelectOptions],
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

  const selectedValues = React.useMemo(() => {
    if (!Array.isArray(field.value)) return [] as string[];
    return field.value.filter((value: string) => itemsValueSet.has(value));
  }, [field.value, itemsValueSet]);

  React.useEffect(() => {
    if (!Array.isArray(field.value)) return;
    if (selectedValues.length === field.value.length) return;
    field.onChange(selectedValues);
  }, [field, selectedValues]);

  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <Combobox
        multiple
        autoHighlight
        items={itemsValues}
        value={selectedValues}
        onValueChange={field.onChange}
        disabled={element.disabled}
      >
        <ComboboxChips ref={anchor} className="w-full">
          <ComboboxValue>
            {(values) => (
              <React.Fragment>
                {values.map((value: string) => (
                  <ComboboxChip key={value}>
                    {labelByValue.get(value) ?? value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  placeholder={element.placeholder}
                  aria-invalid={fieldState.invalid}
                />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
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
