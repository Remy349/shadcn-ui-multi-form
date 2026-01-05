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
import type { Form, FormElement, FormElementType } from "@/types/form-builder";
import { GripIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  TextIcon,
  EnvelopeClosedIcon,
  SwitchIcon,
  LockClosedIcon,
  ChevronDownIcon,
  UploadIcon,
  CheckboxIcon,
  TextAlignLeftIcon,
  TextAlignJustifyIcon,
  CalendarIcon,
  MagicWandIcon,
  SliderIcon,
} from "@radix-ui/react-icons";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { IconProps } from "@radix-ui/react-icons/dist/types";

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
  const formElementIcons: Record<
    FormElementType,
    ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  > = {
    text: TextIcon,
    email: EnvelopeClosedIcon,
    textarea: TextAlignJustifyIcon,
    checkbox: CheckboxIcon,
    switch: SwitchIcon,
    password: LockClosedIcon,
    select: ChevronDownIcon,
    file: UploadIcon,
    "rich-text-editor": TextAlignLeftIcon,
    "date-picker": CalendarIcon,
    "input-otp": MagicWandIcon,
    "slider": SliderIcon,
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
              Click elements from the left sidebar to add them
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
                {currentForm.elements.map((element) => {
                  const IconElement = formElementIcons[element.type];
                  const isSelected = selectedElement?.id === element.id;

                  return (
                    <div
                      className={cn(
                        "border rounded-md p-3 hover:border-primary",
                        isSelected && "border-primary bg-accent/30",
                      )}
                      key={element.id}
                      onClick={() => setSelectedElement(element)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="border border-dashed bg-background/50 p-1 rounded-sm">
                          <IconElement className="size-4" />
                        </div>
                        <span className="font-medium text-sm">
                          {element.label}
                        </span>
                        {isSelected && (
                          <Button
                            size="icon-sm"
                            className="ml-auto bg-destructive/10 text-destructive hover:bg-destructive/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteElement(element.id);
                            }}
                          >
                            <Trash2Icon />
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
