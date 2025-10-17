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
import { generateId } from "@/lib/utils";

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
        type,
        description: "",
        placeholder: "",
      };

      addElement(newElement);
    }

    setActiveElementType(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <SidebarProvider>
        <ElementsSidebar />
        <SidebarInset>
          <Toolbar
            currentForm={currentForm}
            forms={forms}
            setCurrentFormIndex={setCurrentFormIndex}
            addForm={addForm}
            updateForm={updateForm}
            deleteForm={deleteForm}
            clearAll={clearAll}
          />
          <div className="py-8">
            <div className="max-w-2xl mx-auto">
              <Canvas
                currentForm={currentForm}
                deleteElement={deleteElement}
                selectedElement={selectedElement}
                setSelectedElement={setSelectedElement}
              />
            </div>
          </div>
        </SidebarInset>
        <PropertiesSidebar
          selectedElement={selectedElement}
          updateElement={updateElement}
        />
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
