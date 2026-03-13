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
import { getLayoutRegistryItem } from "@/lib/builder/layout-registry";
import { getFieldRegistryItem } from "@/lib/builder/registry";
import { buildRenderPlan } from "@/lib/builder/render-plan";
import { cn } from "@/lib/utils";
import type { BuilderElement, FieldElement, Form } from "@/types/form-builder";
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
  const { roots, fieldById } = buildRenderPlan(currentForm.elements);

  const renderFieldItem = (element: FieldElement) => {
    const IconElement = getFieldRegistryItem(element.type).icon;
    const isSelected = selectedElement?.id === element.id;

    return (
      <button
        type="button"
        className={cn(
          "border rounded-md p-3 hover:border-primary w-full text-left",
          isSelected && "border-primary bg-accent/30",
        )}
        key={element.id}
        onClick={() => setSelectedElementId(element.id)}
      >
        <div className="flex items-center space-x-2">
          <div className="border border-dashed bg-background/50 p-1 rounded-sm">
            <IconElement className="size-4" />
          </div>
          <span className="font-medium text-sm">{element.label}</span>
          {isSelected && (
            <Button
              size="icon-sm"
              className="ml-auto bg-destructive/20 text-destructive hover:bg-destructive/20"
              onClick={(event) => {
                event.stopPropagation();
                removeNode(element.id);
              }}
            >
              <Trash2Icon />
            </Button>
          )}
        </div>
      </button>
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
                {roots.map((element) => {
                  if (isFieldElement(element)) {
                    return renderFieldItem(element);
                  }

                  if (!isLayoutElement(element)) {
                    return null;
                  }

                  const registryItem = getLayoutRegistryItem(element.type);
                  const IconElement = registryItem.icon;
                  const isSelected = selectedElement?.id === element.id;
                  const label =
                    element.type === "separator" && element.label?.trim()
                      ? element.label.trim()
                      : registryItem.label;

                  if (element.type === "two-columns") {
                    const leftElements = element.columns.left
                      .map((id) => fieldById.get(id))
                      .filter(Boolean) as FieldElement[];
                    const rightElements = element.columns.right
                      .map((id) => fieldById.get(id))
                      .filter(Boolean) as FieldElement[];

                    return (
                      <div
                        key={element.id}
                        className={cn(
                          "border rounded-md p-3 space-y-4 hover:border-primary",
                          isSelected && "border-primary bg-accent/30",
                        )}
                      >
                        <button
                          type="button"
                          className="w-full text-left"
                          onClick={() => setSelectedElementId(element.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <div className="border border-dashed bg-background/50 p-1 rounded-sm">
                              <IconElement className="size-4" />
                            </div>
                            <span className="font-medium text-sm">{label}</span>
                            {isSelected && (
                              <Button
                                size="icon-sm"
                                className="ml-auto bg-destructive/20 text-destructive hover:bg-destructive/20"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  removeNode(element.id);
                                }}
                              >
                                <Trash2Icon />
                              </Button>
                            )}
                          </div>
                        </button>
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            {leftElements.length > 0 ? (
                              leftElements.map((field) => (
                                <div key={field.id}>
                                  {renderFieldItem(field)}
                                </div>
                              ))
                            ) : (
                              <div className="border border-dashed rounded-md p-3 text-xs text-muted-foreground">
                                Left column is empty
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            {rightElements.length > 0 ? (
                              rightElements.map((field) => (
                                <div key={field.id}>
                                  {renderFieldItem(field)}
                                </div>
                              ))
                            ) : (
                              <div className="border border-dashed rounded-md p-3 text-xs text-muted-foreground">
                                Right column is empty
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      type="button"
                      className={cn(
                        "border rounded-md p-3 hover:border-primary w-full text-left",
                        isSelected && "border-primary bg-accent/30",
                      )}
                      key={element.id}
                      onClick={() => setSelectedElementId(element.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="border border-dashed bg-background/50 p-1 rounded-sm">
                          <IconElement className="size-4" />
                        </div>
                        <span className="font-medium text-sm">{label}</span>
                        {isSelected && (
                          <Button
                            size="icon-sm"
                            className="ml-auto bg-destructive/20 text-destructive hover:bg-destructive/20"
                            onClick={(event) => {
                              event.stopPropagation();
                              removeNode(element.id);
                            }}
                          >
                            <Trash2Icon />
                          </Button>
                        )}
                      </div>
                    </button>
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
