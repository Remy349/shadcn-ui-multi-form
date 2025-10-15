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
import { generateId } from "@/lib/utils";
import { FormElement, FormElementType } from "@/types/form-builder";
import { ComponentIcon, LayoutPanelTopIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";

interface ElementsSidebarProps {
  addElement: (element: FormElement) => void;
}

export const ElementsSidebar = ({ addElement }: ElementsSidebarProps) => {
  const elements: {
    type: FormElementType;
    label: string;
  }[] = [
    { type: "text", label: "Text" },
    { type: "email", label: "Email" },
  ];

  const handleAddElement = (type: FormElementType) => {
    const newElement: FormElement = {
      id: generateId(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: "",
      description: "",
    };

    addElement(newElement);
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
            Drag or click to add to canvas
          </p>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Input Fields</SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              {elements.map((element) => (
                <SidebarMenuItem
                  className="border bg-background rounded-md"
                  onClick={() => handleAddElement(element.type)}
                  key={element.label}
                >
                  <SidebarMenuButton className="cursor-grab">
                    <ComponentIcon />
                    <span className="font-medium">{element.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
