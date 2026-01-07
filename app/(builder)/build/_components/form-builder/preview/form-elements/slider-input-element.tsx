import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import type { FormElement } from "@/types/form-builder";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface SliderInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const SliderInputElement = ({
  element,
  field,
  fieldState,
}: SliderInputElementProps) => {
  const currentValue =
    typeof field.value === "number"
      ? field.value
      : element.sliderConfig?.defaultValue;

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="flex items-center space-x-2">
        <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
        <span className="text-xs text-muted-foreground">({currentValue})</span>
      </div>
      <FieldDescription>{element.description}</FieldDescription>
      <Slider
        id={element.name}
        value={[field.value || element.sliderConfig?.defaultValue]}
        onValueChange={(val) => field.onChange(val[0])}
        onBlur={field.onBlur}
        aria-invalid={fieldState.invalid}
        min={element.sliderConfig?.min}
        max={element.sliderConfig?.max}
        step={element.sliderConfig?.step}
        orientation={element.sliderConfig?.orientation}
        defaultValue={[element.sliderConfig?.defaultValue || 0]}
        disabled={element.disabled}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
