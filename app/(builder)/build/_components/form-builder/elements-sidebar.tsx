import { useDraggable } from "@dnd-kit/core";
import { LayersIcon } from "@radix-ui/react-icons";
import { ComponentIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import type { ElementType } from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { SidebarDragData } from "@/lib/builder/dnd";
import { getAllLayoutRegistryItems } from "@/lib/builder/layout-registry";
import { getAllFieldRegistryItems } from "@/lib/builder/registry";
import { cn } from "@/lib/utils";
import type { BuilderElement, FieldElement } from "@/types/form-builder";

interface ElementsSidebarProps {
  insertNode: (element: BuilderElement) => void;
}

interface DraggableSidebarMenuItemProps {
  dragId: string;
  dragData: SidebarDragData;
  onClick: () => void;
  label: string;
  IconComponent: ElementType;
  isNew?: boolean;
}

const DraggableSidebarMenuItem = ({
  dragId,
  dragData,
  onClick,
  label,
  IconComponent,
  isNew,
}: DraggableSidebarMenuItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: dragId,
    data: dragData,
  });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        ref={setNodeRef}
        onClick={onClick}
        {...attributes}
        {...listeners}
        className={cn(
          "cursor-grab active:cursor-grabbing",
          isDragging && "opacity-60 border-dashed border-primary",
        )}
      >
        <div className="border-dashed border p-1 bg-background/50">
          <IconComponent className="size-4" />
        </div>
        <span className="font-medium">{label}</span>
        {isNew && (
          <Badge
            variant="default"
            className="ml-auto text-[0.58rem] bg-emerald-100 text-emerald-800"
          >
            New
          </Badge>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const ElementsSidebar = ({ insertNode }: ElementsSidebarProps) => {
  const elements = [...getAllFieldRegistryItems()].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  const layouts = [...getAllLayoutRegistryItems()].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const handleAddElement = (type: FieldElement["type"]) => {
    const newElement = elements.find((element) => element.type === type);

    if (!newElement) return;

    insertNode(newElement.createDefault());
  };

  const handleAddLayout = (type: (typeof layouts)[number]["type"]) => {
    const newLayout = layouts.find((layout) => layout.type === type);

    if (!newLayout) return;

    insertNode(newLayout.createDefault());
  };

  return (
    <Sidebar collapsible="none" className="border-r sticky top-0 h-svh">
      <SidebarHeader>
        <div className="p-2 space-y-0.5">
          <div className="flex items-center gap-2">
            <ComponentIcon className="size-4 text-sidebar-foreground" />
            <h2 className="text-sm font-semibold text-sidebar-foreground">
              Elements
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Click to add to canvas
          </p>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <ScrollArea className="h-[calc(100svh-8.5rem)]">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Layout Elements</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {layouts.map((layout) => (
                  <DraggableSidebarMenuItem
                    key={layout.type}
                    dragId={`sidebar-layout-${layout.type}`}
                    dragData={{
                      source: "sidebar",
                      kind: "layout",
                      type: layout.type,
                    }}
                    onClick={() => handleAddLayout(layout.type)}
                    IconComponent={layout.icon}
                    label={layout.label}
                    isNew={layout.isNew}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Input Elements</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {elements.map((element) => (
                  <DraggableSidebarMenuItem
                    key={element.type}
                    dragId={`sidebar-field-${element.type}`}
                    dragData={{
                      source: "sidebar",
                      kind: "field",
                      type: element.type,
                    }}
                    onClick={() => handleAddElement(element.type)}
                    IconComponent={element.icon}
                    label={element.label}
                    isNew={element.isNew}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center bg-muted border border-dashed">
                  <LayersIcon className="size-4 text-primary/80" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-bold text-sm">MultiForm</span>
                  <span className="text-xs text-muted-foreground">
                    Building Panel
                  </span>
                </div>
                <LogOutIcon className="size-4 ml-auto" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
