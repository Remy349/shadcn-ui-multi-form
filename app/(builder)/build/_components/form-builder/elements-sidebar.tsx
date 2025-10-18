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
import { FormElementType } from "@/types/form-builder";
import { useDraggable } from "@dnd-kit/core";
import { ComponentIcon, LayoutPanelTopIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

interface DraggableFormElementProps {
  element: { type: FormElementType; label: string };
}

const DraggableFormElement = ({ element }: DraggableFormElementProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: element.type,
    data: { type: element.type },
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <SidebarMenuItem>
        <SidebarMenuButton className="cursor-grab">
          <ComponentIcon />
          <span className="font-medium">{element.label}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export const ElementsSidebar = () => {
  const elements: {
    type: FormElementType;
    label: string;
  }[] = [
    { type: "text", label: "Text" },
    { type: "email", label: "Email" },
    { type: "textarea", label: "Textarea" },
    { type: "checkbox", label: "Checkbox" },
    { type: "switch", label: "Switch" },
  ];

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
          <p className="text-xs text-muted-foreground">Drag to add to canvas</p>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Input Fields</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {elements.map((element) => (
                <DraggableFormElement element={element} key={element.type} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary">
                  <LayoutPanelTopIcon className="size-5 text-background" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="font-medium text-sm">Multi Form</span>
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
