import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { ToggleDarkMode } from "../(landing)/_components/header/toggle-dark-mode";

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="bg-muted/50">
          <header className="sticky top-0 z-50 bg-background border-b">
            <div className="h-16 flex items-center space-x-2 px-6">
              <SidebarTrigger />
              <ToggleDarkMode />
            </div>
          </header>
          <main className="px-6">
            <section className="pt-[4rem] pb-[2.5rem]">{children}</section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
