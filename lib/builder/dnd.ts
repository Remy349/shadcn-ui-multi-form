import type { FieldElementType, LayoutElementType } from "@/types/form-builder";

export const CANVAS_DROPZONE_ID = "builder-canvas-dropzone";

export type SidebarDragData =
  | {
      source: "sidebar";
      kind: "field";
      type: FieldElementType;
    }
  | {
      source: "sidebar";
      kind: "layout";
      type: LayoutElementType;
    };

export type CanvasRootDragData = {
  source: "canvas-root";
};

export const isSidebarDragData = (data: unknown): data is SidebarDragData => {
  if (!data || typeof data !== "object") {
    return false;
  }

  const value = data as {
    source?: unknown;
    kind?: unknown;
    type?: unknown;
  };

  return (
    value.source === "sidebar" &&
    (value.kind === "field" || value.kind === "layout") &&
    typeof value.type === "string"
  );
};

export const isCanvasRootDragData = (
  data: unknown,
): data is CanvasRootDragData => {
  if (!data || typeof data !== "object") {
    return false;
  }

  return (data as { source?: unknown }).source === "canvas-root";
};
