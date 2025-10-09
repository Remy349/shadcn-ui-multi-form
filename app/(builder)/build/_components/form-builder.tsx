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
        <div className="relative">
          <header className="bg-background fixed border-1 w-[512px] rounded-md shadow-xs z-10 bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex items-center justify-between h-14 px-3">
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
              <Canvas />
            </div>
          </div>
        </div>
      </SidebarInset>
      <PropertiesSidebar />
    </SidebarProvider>
  );
};
