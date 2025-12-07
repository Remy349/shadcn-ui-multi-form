"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Canvas } from "./form-builder/canvas";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Toolbar } from "./form-builder/toolbar/toolbar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Preview } from "./form-builder/preview";

export const FormBuilder = () => {
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

  return (
    <SidebarProvider>
      {!isPreviewMode && <ElementsSidebar addElement={addElement} />}
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
          <div className={cn("max-w-2xl mx-auto", isPreviewMode && "max-w-lg")}>
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
  );
};
