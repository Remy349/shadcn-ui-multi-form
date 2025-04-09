import { Badge } from "@/components/ui/badge";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { TInputType } from "@/types/types";
import { useDraggable } from "@dnd-kit/core";
import { Component } from "lucide-react";

interface IProps {
  inputComponents: {
    name: string;
    type: TInputType;
    isNew?: boolean;
  }[];
}

const DraggableItem = ({
  name,
  type,
  isNew,
}: {
  name: string;
  type: TInputType;
  isNew?: boolean;
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `form-element-${type}`,
    data: {
      type: type,
    },
  });

  return (
    <SidebarMenuItem>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={cn("cursor-grab", isDragging && "opacity-50")}
      >
        <SidebarMenuButton>
          <Component className="size-4 mr-2" />
          {name}
          {isNew && (
            <Badge className="ml-auto font-medium text-[0.65rem] px-2 py-0">
              New
            </Badge>
          )}
        </SidebarMenuButton>
      </div>
    </SidebarMenuItem>
  );
};

export const DashboardSidebarContent = ({ inputComponents }: IProps) => {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Available Input Fields</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {inputComponents
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((input) => (
                <DraggableItem key={input.type} {...input} />
              ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};
