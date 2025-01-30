import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TProps = {
  formId: string;
  inputs: {
    id: string;
    label: string;
    type: string;
  }[];
  input: {
    id: string;
    label: string;
    type: string;
  };
};

export const InputField = ({ formId, input, inputs }: TProps) => {
  const { updateInputLabel, updateInputType, removeInput } =
    useFormBuilderStore();

  return (
    <div className="mb-4 grid gap-y-4 border rounded-md p-4">
      <div className="space-x-2 flex items-center">
        <Label htmlFor={`label-${input.id}`}>Label:</Label>
        <Input
          id={`label-${input.id}`}
          value={input.label}
          onChange={(e) => updateInputLabel(formId, input.id, e.target.value)}
          autoComplete="off"
        />
      </div>
      <div className="space-x-2 flex items-center">
        <Label htmlFor={`type-${input.id}`}>Type:</Label>
        <Select
          value={input.type}
          onValueChange={(value) =>
            updateInputType(
              formId,
              input.id,
              value as "text" | "email" | "password",
            )
          }
        >
          <SelectTrigger id={`type-${input.id}`}>
            <SelectValue placeholder="Select input type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="password">Password</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {inputs.length > 1 && (
        <div>
          <Button
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
