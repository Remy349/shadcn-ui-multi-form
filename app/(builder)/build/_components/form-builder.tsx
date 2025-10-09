import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ElementsSidebar } from "./form-builder/elements-sidebar";
import { PropertiesSidebar } from "./form-builder/properties-sidebar";
import { Canvas } from "./form-builder/canvas";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ActionsMenu } from "./form-builder/actions-menu";

export const FormBuilder = () => {
  return (
    <SidebarProvider>
      <ElementsSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 shrink-0 w-full">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              <Button size="sm">Step 1</Button>
              <Button variant="ghost" size="icon-sm">
                <PlusIcon />
              </Button>
            </div>
            <ActionsMenu />
          </div>
        </header>
        <div className="px-4">
          <Canvas />
        </div>
      </SidebarInset>
      <PropertiesSidebar />
    </SidebarProvider>
  );
};
