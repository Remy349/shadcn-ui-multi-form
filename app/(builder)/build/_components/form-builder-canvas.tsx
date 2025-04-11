import { useFormBuilderStore } from "@/stores/form-builder-store";
import { InputField } from "./input-fields/input-field";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface IProps {
  formId: string;
  isOver: boolean;
}

export const FormBuilderCanvas = ({ formId, isOver }: IProps) => {
  const { forms } = useFormBuilderStore();
  const { setNodeRef } = useDroppable({
    id: "canvas",
  });

  const form = forms.find((f) => f.id === formId);

  if (!form) return null;

  return (
    <div
      className={cn(
        "space-y-4 rounded-md border p-4 transition-all",
        isOver ? "border-primary" : "border-dashed border-muted-foreground",
      )}
      ref={setNodeRef}
    >
      {form.inputs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[10rem]">
          <h3 className="text-base font-semibold text-center">
            Drag and drop input fields here
          </h3>
          <p className="text-xs text-muted-foreground text-center">
            Start building your form by dragging and dropping input fields from
            the sidebar.
          </p>
        </div>
      )}
      {form.inputs.map((input) => (
        <InputField key={input.id} formId={formId} input={input} />
      ))}
    </div>
  );
};
