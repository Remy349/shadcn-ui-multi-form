import { Button } from "@/components/ui/button";
import { useFormBuilderStore } from "@/stores/form-builder-store";

export const AddForm = () => {
  const { addForm } = useFormBuilderStore();

  const handleAddForm = () => addForm();

  return (
    <Button size="sm" className="font-medium" onClick={handleAddForm}>
      Add form step
    </Button>
  );
};
