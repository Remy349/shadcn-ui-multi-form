import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Trash } from "lucide-react";

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
      variant="destructive"
      onClick={handleRemoveForm}
    >
      <Trash className="size-4" />
    </Button>
  );
};
