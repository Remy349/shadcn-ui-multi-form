import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { InputField } from "./input-field";

interface IProps {
  formId: string;
}

export const FormContent = ({ formId }: IProps) => {
  const { forms, addInput, removeForm } = useFormBuilderStore();
  const form = forms.find((f) => f.id === formId);

  if (!form) return null;

  return (
    <div>
      {form.inputs.map((input) => (
        <InputField
          key={input.id}
          formId={formId}
          inputs={form.inputs}
          input={input}
        />
      ))}
      <div className="flex space-x-2">
        <Button
          className="font-medium"
          size="sm"
          onClick={() => addInput(formId)}
        >
          Add input
        </Button>
        {forms.length > 1 && (
          <Button
            size="sm"
            className="font-medium"
            variant="destructive"
            onClick={() => removeForm(formId)}
          >
            Remove form step
          </Button>
        )}
      </div>
    </div>
  );
};
