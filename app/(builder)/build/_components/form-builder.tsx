"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Canvas } from "./form-builder/canvas";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { Preview } from "./form-builder/preview";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Toolbar } from "./form-builder/toolbar/toolbar";

export const FormBuilder = () => {
  const {
    forms,
    insertNode,
    currentFormIndex,
    updateNode,
    removeNode,
    setCurrentFormIndex,
    addForm,
    updateForm,
    deleteForm,
    clearAll,
    setSelectedElementId,
    selectedElementId,
    isPreviewMode,
    togglePreviewMode,
  } = useFormBuilderStore();

  const currentForm = forms[currentFormIndex];

  return (
    <SidebarProvider>
      {!isPreviewMode && <ElementsSidebar insertNode={insertNode} />}
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
          <div className={cn("max-w-2xl mx-auto", isPreviewMode && "max-w-md")}>
            {!isPreviewMode ? (
              <Canvas
                currentForm={currentForm}
                removeNode={removeNode}
                selectedElementId={selectedElementId}
                setSelectedElementId={setSelectedElementId}
              />
            ) : (
              <Preview forms={forms} />
            )}
          </div>
        </ScrollArea>
      </SidebarInset>
      {!isPreviewMode && (
        <PropertiesSidebar
          selectedElement={
            currentForm.elements.find(
              (element) => element.id === selectedElementId,
            ) ?? null
          }
          elements={currentForm.elements}
          updateNode={updateNode}
        />
      )}
    </SidebarProvider>
  );
};
