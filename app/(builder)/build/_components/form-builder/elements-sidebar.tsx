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
import {
  TextIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
  SwitchIcon,
  LockClosedIcon,
  ChevronDownIcon,
  UploadIcon,
  CheckboxIcon,
} from "@radix-ui/react-icons";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { Badge } from "@/components/ui/badge";

interface DraggableFormElementProps {
  element: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    type: FormElementType;
    label: string;
    status?: "new" | "updated";
  };
}

const DraggableFormElement = ({ element }: DraggableFormElementProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: element.type,
    data: { type: element.type },
  });

  const IconComponent = element.icon;

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      <SidebarMenuItem>
        <SidebarMenuButton className="cursor-grab">
          <div className="border-dashed rounded-sm border p-1 bg-background/50">
            <IconComponent />
          </div>
          <span className="font-medium">{element.label}</span>
          {element.status && (
            <Badge
              variant="outline"
              className="ml-auto bg-background/50 text-[10px] px-1.5 py-0.5"
            >
              {element.status === "new" ? "New" : "Updated"}
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </div>
  );
};

export const ElementsSidebar = () => {
  const formElementIcons: Record<
    FormElementType,
    ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  > = {
    text: TextIcon,
    email: EnvelopeClosedIcon,
    textarea: FileTextIcon,
    checkbox: CheckboxIcon,
    switch: SwitchIcon,
    password: LockClosedIcon,
    select: ChevronDownIcon,
    file: UploadIcon,
  };

  const elements: {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
    type: FormElementType;
    label: string;
    status?: "new" | "updated";
  }[] = [
    { icon: formElementIcons.text, type: "text", label: "Text" },
    { icon: formElementIcons.email, type: "email", label: "Email" },
    { icon: formElementIcons.textarea, type: "textarea", label: "Textarea" },
    { icon: formElementIcons.checkbox, type: "checkbox", label: "Checkbox" },
    { icon: formElementIcons.switch, type: "switch", label: "Switch" },
    { icon: formElementIcons.password, type: "password", label: "Password" },
    {
      icon: formElementIcons.select,
      type: "select",
      label: "Select",
      status: "new",
    },
    {
      icon: formElementIcons.file,
      type: "file",
      label: "File",
      status: "updated",
    },
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
              {elements
                .sort((a, b) => a.label.localeCompare(b.label))
                .map((element) => (
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
