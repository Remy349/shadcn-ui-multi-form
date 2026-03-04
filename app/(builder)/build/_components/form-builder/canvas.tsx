import { GripIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { getLayoutRegistryItem } from "@/lib/builder/layout-registry";
import { getFieldRegistryItem } from "@/lib/builder/registry";
import { cn } from "@/lib/utils";
import type { BuilderElement, Form, LayoutElement } from "@/types/form-builder";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";

interface CanvasProps {
  currentForm: Form;
  removeNode: (elementId: string) => void;
  setSelectedElementId: (elementId: string | null) => void;
  selectedElementId: string | null;
}

export const Canvas = ({
  currentForm,
  removeNode,
  setSelectedElementId,
  selectedElementId,
}: CanvasProps) => {
  const selectedElement = currentForm.elements.find(
    (element) => element.id === selectedElementId,
  ) as BuilderElement | undefined;

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
                  if (isFieldElement(element)) {
                    const IconElement = getFieldRegistryItem(element.type).icon;
                    const isSelected = selectedElement?.id === element.id;

                    return (
                      <button
                        type="button"
                        className={cn(
                          "border rounded-md p-3 cursor-pointer hover:border-primary w-full text-left",
                          isSelected && "border-primary bg-accent/30",
                        )}
                        key={element.id}
                        onClick={() => setSelectedElementId(element.id)}
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
                              className="ml-auto bg-destructive/20 text-destructive hover:bg-destructive/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNode(element.id);
                              }}
                            >
                              <Trash2Icon />
                            </Button>
                          )}
                        </div>
                      </button>
                    );
                  }

                  if (isLayoutElement(element)) {
                    const registryItem = getLayoutRegistryItem(element.type);
                    const IconElement = registryItem.icon;
                    const isSelected = selectedElement?.id === element.id;

                    return (
                      <button
                        type="button"
                        className={cn(
                          "border rounded-md p-3 cursor-pointer hover:border-primary w-full text-left",
                          isSelected && "border-primary bg-accent/30",
                        )}
                        key={element.id}
                        onClick={() => setSelectedElementId(element.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="border border-dashed bg-background/50 p-1 rounded-sm">
                            <IconElement className="size-4" />
                          </div>
                          <span className="font-medium text-sm">
                            {registryItem.label}
                          </span>
                          {isSelected && (
                            <Button
                              size="icon-sm"
                              className="ml-auto bg-destructive/20 text-destructive hover:bg-destructive/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNode(element.id);
                              }}
                            >
                              <Trash2Icon />
                            </Button>
                          )}
                        </div>
                        <div className="mt-3">
                          {renderLayoutPreview(element)}
                        </div>
                      </button>
                    );
                  }

                  return null;
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

const renderLayoutPreview = (element: LayoutElement) => {
  if (element.type === "separator") {
    const label = element.label?.trim();

    return (
      <div className="space-y-2">
        {label ? (
          <span className="text-xs text-muted-foreground">{label}</span>
        ) : null}
        <Separator />
      </div>
    );
  }

  const leftCount = element.columns.left.length;
  const rightCount = element.columns.right.length;

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-md border border-dashed bg-background/40 p-2">
        <p className="text-xs text-muted-foreground">Left column</p>
        <p className="text-[11px] text-muted-foreground">
          {leftCount} item{leftCount === 1 ? "" : "s"}
        </p>
      </div>
      <div className="rounded-md border border-dashed bg-background/40 p-2">
        <p className="text-xs text-muted-foreground">Right column</p>
        <p className="text-[11px] text-muted-foreground">
          {rightCount} item{rightCount === 1 ? "" : "s"}
        </p>
      </div>
    </div>
  );
};
