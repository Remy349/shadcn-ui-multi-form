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
import { SignatureInput } from "@/components/ui/signature-input";
import type { FieldElement } from "@/types/form-builder";

interface SignatureInputElementProps {
  element: FieldElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const SignatureInputElement = ({
  element,
  field,
  fieldState,
}: SignatureInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <SignatureInput
        value={field.value}
        onChange={field.onChange}
        disabled={element.disabled}
        height={element.signatureConfig?.height}
        penColor={element.signatureConfig?.penColor}
        backgroundColor={element.signatureConfig?.backgroundColor}
        strokeWidth={element.signatureConfig?.strokeWidth}
      />
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};
