import { useFormBuilderStore } from "@/stores/form-builder-store";
import { InputField } from "./input-fields/input-field";
import { EmptyState } from "./empty-state";

interface IProps {
  formId: string;
}

export const FormContent = ({ formId }: IProps) => {
  const { forms } = useFormBuilderStore();

  const form = forms.find((f) => f.id === formId);

  if (!form) return null;

  return (
    <div className="space-y-4">
      {form.inputs.length === 0 && <EmptyState />}
      {form.inputs.map((input) => (
        <InputField key={input.id} formId={formId} input={input} />
      ))}
    </div>
  );
};
