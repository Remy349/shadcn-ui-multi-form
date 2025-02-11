import { useFormBuilderStore } from "@/stores/form-builder-store";
import { InputField } from "./input-field";
import { EmptyState } from "./empty-state";
import { InputFieldsMenu } from "./input-fields-menu";

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
        <InputField
          key={input.id}
          formId={formId}
          inputs={form.inputs}
          input={input}
        />
      ))}
      <InputFieldsMenu formId={form.id} />
    </div>
  );
};
