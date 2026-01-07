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
import type { FormElement, FormElementType } from "@/types/form-builder";
import { ComponentIcon, LayoutPanelTopIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import {
  TextIcon,
  EnvelopeClosedIcon,
  SwitchIcon,
  LockClosedIcon,
  ChevronDownIcon,
  UploadIcon,
  CheckboxIcon,
  TextAlignLeftIcon,
  TextAlignJustifyIcon,
  CalendarIcon,
  MagicWandIcon,
  SliderIcon,
  FrameIcon,
} from "@radix-ui/react-icons";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { Badge } from "@/components/ui/badge";
import { generateId, toCamelCase } from "@/lib/utils";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

interface ElementsSidebarProps {
  addElement: (element: FormElement) => void;
}

export const ElementsSidebar = ({ addElement }: ElementsSidebarProps) => {
  const formElementIcons: Record<
    FormElementType,
    ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  > = {
    text: TextIcon,
    email: EnvelopeClosedIcon,
    textarea: TextAlignJustifyIcon,
    checkbox: CheckboxIcon,
    switch: SwitchIcon,
    password: LockClosedIcon,
    select: ChevronDownIcon,
    file: UploadIcon,
    "rich-text-editor": TextAlignLeftIcon,
    "date-picker": CalendarIcon,
    "input-otp": MagicWandIcon,
    slider: SliderIcon,
    "phone-input": FrameIcon,
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
    },
    {
      icon: formElementIcons.file,
      type: "file",
      label: "File",
    },
    {
      icon: formElementIcons["rich-text-editor"],
      type: "rich-text-editor",
      label: "Rich Text Editor",
    },
    {
      icon: formElementIcons["date-picker"],
      type: "date-picker",
      label: "Date Picker",
      status: "new",
    },
    {
      icon: formElementIcons["input-otp"],
      type: "input-otp",
      label: "Input OTP",
      status: "new",
    },
    {
      icon: formElementIcons.slider,
      type: "slider",
      label: "Slider",
      status: "new",
    },
    {
      icon: formElementIcons["phone-input"],
      type: "phone-input",
      label: "Phone Input",
      status: "new",
    },
  ];

  const handleAddElement = (type: FormElementType) => {
    const newElement: FormElement = {
      id: `${type}-${generateId()}`,
      label: `${type
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")} Field`,
      name: toCamelCase(`${type} field ${generateId()}`),
      type,
      description: "",
      placeholder: "",
      disabled: false,
      required: false,
      minLength: 0,
      maxLength: 255,
      options:
        type === "select"
          ? {
              selectLabel: "Select an option",
              selectItems: [
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
              ],
            }
          : undefined,
      fileConfig:
        type === "file"
          ? {
              accept: "image/*",
              multiple: false,
              maxSize: 5 * 1024 * 1024,
              maxFiles: 1,
              showPreview: true,
              previewSize: "md",
              variant: "default",
            }
          : undefined,
      otpConfig:
        type === "input-otp"
          ? {
              length: 6,
              pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
            }
          : undefined,
      sliderConfig:
        type === "slider"
          ? {
              min: 0,
              max: 100,
              step: 1,
              defaultValue: 50,
              orientation: "horizontal",
            }
          : undefined,
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
            Click to add to canvas
          </p>
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
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-muted border border-dashed">
                  <LayoutPanelTopIcon className="size-4" />
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
