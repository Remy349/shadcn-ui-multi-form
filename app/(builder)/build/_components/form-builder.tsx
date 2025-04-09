"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { FormPreview } from "./form-preview";
import { FormBuilderCanvas } from "./form-builder-canvas";
import { RemoveForm } from "./remove-form";
import { AddForm } from "./add-form";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ToggleDarkMode } from "@/app/(landing)/_components/header/toggle-dark-mode";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { CodePreviewDialog } from "./code-preview/code-preview-dialog";
import { DashboardSidebar } from "./sidebar/dashboard-sidebar";
import { useEffect, useState } from "react";
import { TInputType } from "@/types/types";
import { Component } from "lucide-react";
import { SelectedForm } from "./selected-form";

const inputComponents: { name: string; type: TInputType; isNew?: boolean }[] = [
  { name: "Input", type: "input" },
  { name: "Password", type: "password" },
  { name: "Textarea", type: "textarea" },
  { name: "Checkbox", type: "checkbox" },
  { name: "Switch", type: "switch" },
  { name: "File Input", type: "file-input" },
  { name: "Rich Text Editor", type: "rich-text-editor", isNew: true },
];

export const FormBuilder = () => {
  const { forms, addInput, selectedForm, setSelectedForm } =
    useFormBuilderStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overCanvas, setOverCanvas] = useState(false);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (over) {
      setOverCanvas(over.id === "canvas");
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (
      over &&
      over.id === "canvas" &&
      active.id.toString().startsWith("form-element-")
    ) {
      const type = active.id
        .toString()
        .replace("form-element-", "") as TInputType;

      addInput(selectedForm, type);
    }

    setActiveId(null);
    setOverCanvas(false);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverCanvas(false);
  };

  const activeDragComponent = activeId
    ? activeId.toString().startsWith("form-element-")
      ? {
          name:
            inputComponents.find(
              (comp) =>
                comp.type === activeId.toString().replace("form-element-", ""),
            )?.name || "",
        }
      : null
    : null;

  useEffect(() => {
    if (!selectedForm && forms.length > 0) {
      setSelectedForm(forms[0].id);
    }
  }, [forms, selectedForm, setSelectedForm]);

  return (
    <SidebarProvider>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <DashboardSidebar inputComponents={inputComponents} />
        <SidebarInset className="bg-muted/50">
          <header className="sticky top-0 z-50 bg-background border-b">
            <div className="h-16 flex items-center justify-between px-6">
              <div className="flex items-center space-x-2">
                <SidebarTrigger />
                <CodePreviewDialog />
              </div>
              <ToggleDarkMode />
            </div>
          </header>
          <main className="px-6">
            <section className="pt-[2.5rem] pb-[2.5rem]">
              <div className="grid gap-4 lg:items-start lg:grid-cols-2">
                <div className="grid gap-y-4">
                  {forms.map((form, index) => (
                    <Card key={form.id} className="shadow-sm">
                      <CardHeader className="flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-lg">
                          Form step {index + 1}
                        </CardTitle>
                        <div className="flex items-center">
                          {selectedForm !== form.id && (
                            <SelectedForm formId={form.id} />
                          )}
                          {forms.length > 1 && <RemoveForm formId={form.id} />}
                        </div>
                      </CardHeader>
                      {selectedForm === form.id && (
                        <CardContent>
                          <FormBuilderCanvas
                            formId={form.id}
                            isOver={overCanvas}
                          />
                        </CardContent>
                      )}
                    </Card>
                  ))}
                  <AddForm />
                </div>
                <div>
                  <FormPreview />
                </div>
              </div>
            </section>
          </main>
        </SidebarInset>
        <DragOverlay>
          {activeDragComponent && (
            <div className="w-64 rounded-md border bg-card p-2 shadow-md">
              <div className="font-medium text-sm flex items-center">
                <Component className="size-4 mr-2" />
                {activeDragComponent.name}
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </SidebarProvider>
  );
};
