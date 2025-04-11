import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { Pencil } from "lucide-react";

interface IProps {
  formId: string;
}

export const SelectedForm = ({ formId }: IProps) => {
  const { setSelectedForm } = useFormBuilderStore();

  const handleSetSelectedForm = () => setSelectedForm(formId);

  return (
    <Button
      className="size-8"
      variant="ghost"
      size="icon"
      onClick={handleSetSelectedForm}
    >
      <Pencil className="size-4" />
    </Button>
  );
};
