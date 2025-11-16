import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import { FormElement } from "@/types/form-builder";

interface FileInputElementProps {
  element: FormElement;
}

export const FileInputElement = ({ element }: FileInputElementProps) => {
  return (
    <Field>
      <FieldLabel htmlFor={element.name}>{element.label}</FieldLabel>
      <FieldDescription>{element.description}</FieldDescription>
      <FileInput
        id={element.name}
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
