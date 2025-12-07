import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import { FormElement } from "@/types/form-builder";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

interface FileInputElementProps {
  element: FormElement;
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
}

export const FileInputElement = ({
  field,
  element,
  fieldState,
}: FileInputElementProps) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <FieldDescription>{element.description}</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      <FileInput
        {...field}
        id={element.name}
        aria-invalid={fieldState.invalid}
        maxFiles={element.fileConfig?.maxFiles}
        maxSize={element.fileConfig?.maxSize}
        variant={element.fileConfig?.variant}
        previewSize={element.fileConfig?.previewSize}
        multiple={element.fileConfig?.multiple}
        showPreview={element.fileConfig?.showPreview}
        accept={element.fileConfig?.accept}
        disabled={element.disabled}
      />
    </Field>
  );
};
