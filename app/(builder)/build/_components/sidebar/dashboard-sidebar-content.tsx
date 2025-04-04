import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TInputType } from "@/types/types";
import { Component } from "lucide-react";

const inputComponents: { name: string; type: TInputType; isNew?: boolean }[] = [
  { name: "Input", type: "input" },
  { name: "Password", type: "password" },
  { name: "Textarea", type: "textarea" },
  { name: "Checkbox", type: "checkbox" },
  { name: "Switch", type: "switch" },
  { name: "File Input", type: "file-input" },
  { name: "Rich Text Editor", type: "rich-text-editor", isNew: true },
];

export const DashboardSidebarContent = () => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Available Input Fields</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {inputComponents
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((input) => (
                <SidebarMenuItem key={input.name}>
                  <SidebarMenuButton>
                    <Component className="size-4 mr-2" />
                    {input.name}
                    {input.isNew && (
                      <Badge className="ml-auto font-medium text-[0.65rem] px-2 py-0">
                        New
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
