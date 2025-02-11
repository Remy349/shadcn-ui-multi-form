import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Trash } from "lucide-react";

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
    <Button size="icon" variant="ghost" onClick={handleRemoveInput}>
      <Trash className="size-4" />
    </Button>
  );
};
