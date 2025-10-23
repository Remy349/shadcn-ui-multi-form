import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  FormElement,
  FormElementType,
  UpdateFormElement,
} from "@/types/form-builder";
import { Settings2Icon } from "lucide-react";

interface PropertiesSidebarProps {
  selectedElement: FormElement | null;
  updateElement: (elementId: string, updatedElement: UpdateFormElement) => void;
}

export const PropertiesSidebar = ({
  selectedElement,
  updateElement,
}: PropertiesSidebarProps) => {
  const elementTypeLabel = (type: FormElementType) => {
    const labels: Record<FormElementType, string> = {
      text: "Text",
      email: "Email",
      textarea: "Textarea",
      checkbox: "Checkbox",
      switch: "Switch",
      password: "Password",
    };

    return labels[type];
  };

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
        {selectedElement ? (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>Element Type</SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <Input
                  className="text-sm bg-background"
                  value={elementTypeLabel(selectedElement.type)}
                  disabled
                />
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="mx-0" />
            <SidebarGroup>
              <SidebarGroupLabel>Basic Properties</SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs" htmlFor="label">
                      Label
                    </Label>
                    <Input
                      id="label"
                      value={selectedElement.label}
                      className="bg-background"
                      onChange={(e) =>
                        updateElement(selectedElement.id, {
                          label: e.target.value,
                        })
                      }
                      autoComplete="off"
                      placeholder="Enter field label"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs" htmlFor="placeholder">
                      Placeholder (Optional)
                    </Label>
                    <Input
                      id="placeholder"
                      value={selectedElement.placeholder}
                      className="bg-background"
                      onChange={(e) =>
                        updateElement(selectedElement.id, {
                          placeholder: e.target.value,
                        })
                      }
                      autoComplete="off"
                      placeholder="Enter placeholder text"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs" htmlFor="description">
                      Description (Optional)
                    </Label>
                    <Input
                      id="description"
                      value={selectedElement.description}
                      className="bg-background"
                      onChange={(e) =>
                        updateElement(selectedElement.id, {
                          description: e.target.value,
                        })
                      }
                      autoComplete="off"
                      placeholder="Add a helpful description"
                    />
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="mx-0" />
            <SidebarGroup>
              <SidebarGroupLabel>Advanced</SidebarGroupLabel>
              <SidebarGroupContent className="px-2">
                <div className="space-y-2">
                  <Label className="text-xs">Field ID</Label>
                  <Input
                    value={selectedElement.id}
                    className="bg-background text-sm"
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">
                    Unique identifier for this field
                  </p>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
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
        )}
      </SidebarContent>
    </Sidebar>
  );
};
