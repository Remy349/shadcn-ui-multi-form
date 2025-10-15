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
import { GripIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { TextInputElement } from "./form-elements/text-input-element";
import { EmailInputElement } from "./form-elements/email-input-element";
import { Button } from "@/components/ui/button";

interface CanvasProps {
  currentForm: Form;
  deleteElement: (elementId: string) => void;
  setSelectedElement: (element: FormElement | null) => void;
}

export const Canvas = ({
  currentForm,
  deleteElement,
  setSelectedElement,
}: CanvasProps) => {
  const renderFormElement = (element: FormElement) => {
    const elementComponent: Record<FormElementType, React.ReactElement> = {
      text: <TextInputElement element={element} />,
      email: <EmailInputElement element={element} />,
    };

    return (
      <div className="relative" key={element.id}>
        <div className="border rounded-md p-4" key={element.id}>
          <div className="absolute top-2 right-2 flex items-center space-x-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                setSelectedElement(element);
              }}
            >
              <PencilIcon />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => deleteElement(element.id)}
            >
              <Trash2Icon className="text-red-500" />
            </Button>
          </div>
          {elementComponent[element.type]}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-md min-h-[calc(100vh-9rem)] border-2 border-dashed bg-sidebar">
      {currentForm.elements.length === 0 ? (
        <Empty className="h-[calc(100vh-9rem)]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <GripIcon />
            </EmptyMedia>
            <EmptyTitle>Start building your form</EmptyTitle>
            <EmptyDescription>
              Drag elements from the left sidebar or click to add them
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
                {currentForm.elements.map((element) =>
                  renderFormElement(element),
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
