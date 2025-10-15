"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Canvas } from "./form-builder/canvas";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { Toolbar } from "./form-builder/toolbar/toolbar";

export const FormBuilder = () => {
  const {
    forms,
    currentFormIndex,
    addElement,
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

  return (
    <SidebarProvider>
      <ElementsSidebar addElement={addElement} />
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
  );
};
