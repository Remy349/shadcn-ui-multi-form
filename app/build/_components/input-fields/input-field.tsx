import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { TInput } from "@/types/types";
import { ChangeEvent } from "react";
import { RemoveInput } from "./remove-input";

interface IProps {
  formId: string;
  input: TInput;
}

export const InputField = ({ formId, input }: IProps) => {
  const { updateInputLabel } = useFormBuilderStore();

  const handleUpdateInputLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const labelValue = e.target.value;

    updateInputLabel(formId, input.id, labelValue);
  };

  return (
    <div className="flex items-center space-x-2 border rounded-md p-4">
      <div className="space-x-2 flex items-center w-full">
        <Label htmlFor={`label-${input.id}`}>Label:</Label>
        <Input
          id={`label-${input.id}`}
          value={input.label}
          onChange={handleUpdateInputLabel}
          autoComplete="off"
        />
      </div>
      <div>
        <RemoveInput formId={formId} inputId={input.id} />
      </div>
    </div>
  );
};
