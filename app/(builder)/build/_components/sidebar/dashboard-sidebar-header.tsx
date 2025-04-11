import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LayoutPanelTop } from "lucide-react";
import Link from "next/link";

export const DashboardSidebarHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary">
                <LayoutPanelTop className="size-5 text-background" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none text-cloud-burst-950">
                <span className="font-semibold">Multi Form</span>
                <span className="text-muted-foreground">Builder Panel</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
