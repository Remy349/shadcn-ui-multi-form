import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { TInput } from "@/types/types";

interface IProps {
  formId: string;
  inputs: TInput[];
  input: TInput;
}

export const InputField = ({ formId, input, inputs }: IProps) => {
  const { updateInputLabel, removeInput } = useFormBuilderStore();

  return (
    <div className="grid gap-y-4 border rounded-md p-4">
      <div className="space-x-2 flex items-center">
        <Label htmlFor={`label-${input.id}`}>Label:</Label>
        <Input
          id={`label-${input.id}`}
          value={input.label}
          onChange={(e) => updateInputLabel(formId, input.id, e.target.value)}
          autoComplete="off"
        />
      </div>
      {inputs.length > 1 && (
        <div>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => removeInput(formId, input.id)}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
