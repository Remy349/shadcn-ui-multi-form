import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Form, FormElement, FormElementType } from "@/types/form-builder";
import { GripIcon, Trash2Icon } from "lucide-react";
import { TextInputElement } from "./form-elements/text-input-element";
import { EmailInputElement } from "./form-elements/email-input-element";
import { cn } from "@/lib/utils";
import { TextareaInputElement } from "./form-elements/textarea-input-element";
import { useDroppable } from "@dnd-kit/core";
import { CheckboxInputElement } from "./form-elements/checkbox-input-element";
import { SwitchInputElement } from "./form-elements/switch-input-element";
import { Button } from "@/components/ui/button";

interface CanvasProps {
  currentForm: Form;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (element: FormElement | null) => void;
  selectedElement: FormElement | null;
}

export const Canvas = ({
  currentForm,
  deleteElement,
  setSelectedElement,
  selectedElement,
}: CanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });

  const renderFormElement = (element: FormElement) => {
    const isSelected = selectedElement?.id === element.id;

    const elementComponent: Record<FormElementType, React.ReactElement> = {
      text: <TextInputElement element={element} />,
      email: <EmailInputElement element={element} />,
      textarea: <TextareaInputElement element={element} />,
      checkbox: <CheckboxInputElement element={element} />,
      switch: <SwitchInputElement element={element} />,
    };

    return (
      <button
        type="button"
        onClick={() => setSelectedElement(element)}
        className={cn(
          "border w-full rounded-md p-4 text-left outline-none relative hover:border-primary",
          isSelected && "bg-accent/30 border-primary",
        )}
      >
        {isSelected && (
          <Button
            size="icon-sm"
            variant="ghost"
            className="absolute z-10 rounded-md top-0 right-0"
            onClick={() => deleteElement(element.id)}
          >
            <Trash2Icon />
          </Button>
        )}
        {elementComponent[element.type]}
      </button>
    );
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-md min-h-[calc(100vh-9rem)] border-2 border-dashed bg-sidebar",
        isOver && "border-primary bg-primary/5",
      )}
    >
      {currentForm.elements.length === 0 ? (
        <Empty className="h-[calc(100vh-9rem)]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <GripIcon />
            </EmptyMedia>
            <EmptyTitle>Start building your form</EmptyTitle>
            <EmptyDescription>
              Drag elements from the left sidebar to add them
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="p-8">
          <Card>
            <CardHeader>
              <CardTitle>{currentForm.title}</CardTitle>
              <CardDescription>{currentForm.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentForm.elements.map((element) => (
                  <div key={element.id}>{renderFormElement(element)}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
