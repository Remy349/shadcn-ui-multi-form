import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Settings2Icon } from "lucide-react";

export const PropertiesSidebar = () => {
  return (
    <Sidebar collapsible="none" className="border-l sticky top-0 h-svh">
      <SidebarHeader>
        <div className="p-2 space-y-0.5">
          <div className="flex items-center gap-2">
            <Settings2Icon className="size-4 text-sidebar-foreground" />
            <h2 className="text-sm font-semibold text-sidebar-foreground">
              Properties
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Customize the selected element
          </p>
        </div>
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Settings2Icon />
            </EmptyMedia>
            <EmptyTitle>No element selected</EmptyTitle>
            <EmptyDescription>
              Select an element from the canvas to edit its properties
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </SidebarContent>
    </Sidebar>
  );
};
