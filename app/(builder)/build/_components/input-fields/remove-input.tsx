import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Trash2 } from "lucide-react";

interface IProps {
  formId: string;
  inputId: string;
}

export const RemoveInput = ({ formId, inputId }: IProps) => {
  const { removeInput } = useFormBuilderStore();

  const handleRemoveInput = () => {
    removeInput(formId, inputId);
  };

  return (
    <Button
      className="size-8"
      size="icon"
      variant="ghost"
      onClick={handleRemoveInput}
    >
      <Trash2 className="size-4 text-red-500" />
    </Button>
  );
};
