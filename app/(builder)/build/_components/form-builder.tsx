"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  CANVAS_DROPZONE_ID,
  isCanvasRootDragData,
  isSidebarDragData,
  type SidebarDragData,
} from "@/lib/builder/dnd";
import { getLayoutRegistryItem } from "@/lib/builder/layout-registry";
import { getFieldRegistryItem } from "@/lib/builder/registry";
import { buildRenderPlan } from "@/lib/builder/render-plan";
import { cn } from "@/lib/utils";
import { useFormBuilderStore } from "@/store/form-builder-store";
import { isFieldElement, isLayoutElement } from "@/types/form-builder";
import { Canvas } from "./form-builder/canvas";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { Preview } from "./form-builder/preview";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Toolbar } from "./form-builder/toolbar/toolbar";

export const FormBuilder = () => {
  const [activeDrag, setActiveDrag] = useState<
    | SidebarDragData
    | {
        source: "canvas-root";
        id: string;
      }
    | null
  >(null);

  const {
    forms,
    insertNode,
    reorderRootNodes,
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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const currentForm = forms[currentFormIndex];
  const { roots } = useMemo(
    () => buildRenderPlan(currentForm.elements),
    [currentForm.elements],
  );
  const rootIds = useMemo(() => roots.map((element) => element.id), [roots]);

  const handleDragStart = (event: DragStartEvent) => {
    const activeData = event.active.data.current;

    if (isSidebarDragData(activeData)) {
      setActiveDrag(activeData);

      return;
    }

    if (isCanvasRootDragData(activeData)) {
      setActiveDrag({
        source: "canvas-root",
        id: String(event.active.id),
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveDrag(null);

    if (!over) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);
    const activeData = active.data.current;
    const overData = over.data.current;

    if (isSidebarDragData(activeData)) {
      const isCanvasRootTarget = isCanvasRootDragData(overData);
      const isCanvasDropzoneTarget = overId === CANVAS_DROPZONE_ID;

      if (!isCanvasRootTarget && !isCanvasDropzoneTarget) {
        return;
      }

      const newElement =
        activeData.kind === "field"
          ? getFieldRegistryItem(activeData.type).createDefault()
          : getLayoutRegistryItem(activeData.type).createDefault();

      insertNode(newElement);

      if (isCanvasRootTarget) {
        reorderRootNodes(newElement.id, overId);
      }

      setSelectedElementId(newElement.id);

      return;
    }

    if (!isCanvasRootDragData(activeData)) {
      return;
    }

    const isCanvasRootTarget = isCanvasRootDragData(overData);
    const isCanvasDropzoneTarget = overId === CANVAS_DROPZONE_ID;

    if (isCanvasRootTarget) {
      reorderRootNodes(activeId, overId);

      return;
    }

    if (!isCanvasDropzoneTarget) {
      return;
    }

    const lastRootId = rootIds.at(-1);

    if (!lastRootId || lastRootId === activeId) {
      return;
    }

    reorderRootNodes(activeId, lastRootId);
  };

  const overlayLabel = useMemo(() => {
    if (!activeDrag) {
      return null;
    }

    if (activeDrag.source === "sidebar") {
      return activeDrag.kind === "field"
        ? getFieldRegistryItem(activeDrag.type).label
        : getLayoutRegistryItem(activeDrag.type).label;
    }

    const activeElement = currentForm.elements.find(
      (element) => element.id === activeDrag.id,
    );

    if (!activeElement) {
      return null;
    }

    if (isFieldElement(activeElement)) {
      return activeElement.label;
    }

    if (isLayoutElement(activeElement)) {
      const registryItem = getLayoutRegistryItem(activeElement.type);

      if (activeElement.type === "separator" && activeElement.label?.trim()) {
        return activeElement.label.trim();
      }

      return registryItem.label;
    }

    return null;
  }, [activeDrag, currentForm.elements]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveDrag(null)}
    >
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
            <div
              className={cn("max-w-2xl mx-auto", isPreviewMode && "max-w-md")}
            >
              {!isPreviewMode ? (
                <Canvas
                  currentForm={currentForm}
                  removeNode={removeNode}
                  selectedElementId={selectedElementId}
                  setSelectedElementId={setSelectedElementId}
                />
              ) : (
                <div className="border p-4">
                  <Preview forms={forms} />
                </div>
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

      <DragOverlay>
        {overlayLabel ? (
          <div className="border border-primary bg-background/95 px-3 py-2 text-sm font-medium shadow-lg">
            {overlayLabel}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
