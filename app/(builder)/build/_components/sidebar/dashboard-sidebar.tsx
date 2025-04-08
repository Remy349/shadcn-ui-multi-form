import { Sidebar } from "@/components/ui/sidebar";
import { DashboardSidebarHeader } from "./dashboard-sidebar-header";
import { DashboardSidebarContent } from "./dashboard-sidebar-content";
import { TInputType } from "@/types/types";

interface IProps {
  inputComponents: {
    name: string;
    type: TInputType;
    isNew?: boolean;
  }[];
}

export const DashboardSidebar = ({ inputComponents }: IProps) => {
  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <DashboardSidebarHeader />
      <DashboardSidebarContent inputComponents={inputComponents} />
    </Sidebar>
  );
};
