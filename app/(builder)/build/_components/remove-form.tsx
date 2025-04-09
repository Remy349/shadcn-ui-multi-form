import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Trash2 } from "lucide-react";

interface IProps {
  formId: string;
}

export const RemoveForm = ({ formId }: IProps) => {
  const { removeForm } = useFormBuilderStore();

  const handleRemoveForm = () => removeForm(formId);

  return (
    <Button
      size="icon"
      className="size-8"
      variant="ghost"
      onClick={handleRemoveForm}
    >
      <Trash2 className="size-4 text-red-500" />
    </Button>
  );
};
