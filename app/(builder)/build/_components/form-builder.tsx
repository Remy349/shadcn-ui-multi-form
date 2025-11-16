"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Canvas } from "./form-builder/canvas";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Toolbar } from "./form-builder/toolbar/toolbar";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import { ComponentIcon } from "lucide-react";
import { FormElement, FormElementType } from "@/types/form-builder";
import { cn, generateId, toCamelCase } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Preview } from "./form-builder/preview";

export const FormBuilder = () => {
  const [activeElementType, setActiveElementType] =
    useState<FormElementType | null>(null);
  const {
    forms,
    addElement,
    currentFormIndex,
    updateElement,
    deleteElement,
    setCurrentFormIndex,
    addForm,
    updateForm,
    deleteForm,
    clearAll,
    setSelectedElement,
    selectedElement,
    isPreviewMode,
    togglePreviewMode,
  } = useFormBuilderStore();

  const currentForm = forms[currentFormIndex];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type: FormElementType = active.data.current?.type;

    setActiveElementType(type);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const type: FormElementType = active.data.current?.type;

    if (!over) return;

    if (over.id === "canvas") {
      const newElement: FormElement = {
        id: `${type}-${generateId()}`,
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
        name: toCamelCase(`${type} field ${generateId()}`),
        type,
        description: "",
        placeholder: "",
        disabled: false,
        required: false,
        minLength: 0,
        maxLength: 255,
        options:
          type === "select"
            ? {
                selectLabel: "Select an option",
                selectItems: [
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                ],
              }
            : undefined,
        fileConfig:
          type === "file"
            ? {
                accept: "image/*",
                multiple: false,
                maxSize: 5 * 1024 * 1024,
                maxFiles: 1,
                showPreview: true,
                previewSize: "md",
                variant: "default",
              }
            : undefined,
      };

      addElement(newElement);
    }

    setActiveElementType(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SidebarProvider>
        {!isPreviewMode && <ElementsSidebar />}
        <SidebarInset>
          <Toolbar
            currentForm={currentForm}
            forms={forms}
            setCurrentFormIndex={setCurrentFormIndex}
            addForm={addForm}
            updateForm={updateForm}
            deleteForm={deleteForm}
            clearAll={clearAll}
            isPreviewMode={isPreviewMode}
            togglePreviewMode={togglePreviewMode}
          />
          <ScrollArea
            className={cn(
              "py-8 h-[calc(100vh-71px)]",
              isPreviewMode && "bg-muted/50",
            )}
          >
            <div
              className={cn("max-w-2xl mx-auto", isPreviewMode && "max-w-lg")}
            >
              {!isPreviewMode ? (
                <Canvas
                  currentForm={currentForm}
                  deleteElement={deleteElement}
                  selectedElement={selectedElement}
                  setSelectedElement={setSelectedElement}
                />
              ) : (
                <Preview forms={forms} />
              )}
            </div>
          </ScrollArea>
        </SidebarInset>
        {!isPreviewMode && (
          <PropertiesSidebar
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        )}
      </SidebarProvider>
      <DragOverlay>
        {activeElementType && (
          <div className="bg-background border-1 rounded-md p-2 shadow-xs">
            <div className="flex items-center">
              <ComponentIcon className="size-4 mr-2" />
              <p className="text-sm font-medium">
                {activeElementType.charAt(0).toUpperCase() +
                  activeElementType.slice(1)}
              </p>
            </div>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};
