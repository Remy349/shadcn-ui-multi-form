import { LayersIcon } from "@radix-ui/react-icons";
import { ComponentIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
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
import { getAllLayoutRegistryItems } from "@/lib/builder/layout-registry";
import { getAllFieldRegistryItems } from "@/lib/builder/registry";
import type { BuilderElement, FieldElement } from "@/types/form-builder";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ElementsSidebarProps {
  insertNode: (element: BuilderElement) => void;
}

export const ElementsSidebar = ({ insertNode }: ElementsSidebarProps) => {
  const elements = getAllFieldRegistryItems();
  const layouts = getAllLayoutRegistryItems();

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
                {layouts
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((layout) => {
                    const IconComponent = layout.icon;

                    return (
                      <SidebarMenuItem key={layout.type}>
                        <SidebarMenuButton
                          onClick={() => handleAddLayout(layout.type)}
                        >
                          <div className="border-dashed rounded-sm border p-1 bg-background/50">
                            <IconComponent />
                          </div>
                          <span className="font-medium">{layout.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Input Elements</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {elements
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((element) => {
                    const IconComponent = element.icon;

                    return (
                      <SidebarMenuItem key={element.type}>
                        <SidebarMenuButton
                          onClick={() => handleAddElement(element.type)}
                        >
                          <div className="border-dashed rounded-sm border p-1 bg-background/50">
                            <IconComponent />
                          </div>
                          <span className="font-medium">{element.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
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
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted border border-dashed">
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
