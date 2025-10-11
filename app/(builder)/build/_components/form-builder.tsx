"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Canvas } from "./form-builder/canvas";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ActionsMenu } from "./form-builder/actions-menu";
import { useFormBuilderStore } from "@/store/form-builder-store";

export const FormBuilder = () => {
  const { forms, currentFormIndex, addElement, deleteElement } =
    useFormBuilderStore();

  const currentForm = forms[currentFormIndex];

  return (
    <SidebarProvider>
      <ElementsSidebar addElement={addElement} />
      <SidebarInset>
        <header className="sticky border-b w-full z-10 top-0 left-0 bg-background">
          <div className="flex items-center justify-between h-[70px] px-4">
            <div className="flex items-center gap-2">
              <Button size="sm">Step 1</Button>
              <Button variant="outline" size="icon-sm">
                <PlusIcon />
              </Button>
            </div>
            <ActionsMenu />
          </div>
        </header>
        <div className="py-8">
          <div className="max-w-2xl mx-auto">
            <Canvas form={currentForm} deleteElement={deleteElement} />
          </div>
        </div>
      </SidebarInset>
      <PropertiesSidebar />
    </SidebarProvider>
  );
};
