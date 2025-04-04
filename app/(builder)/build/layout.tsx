import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/sidebar/dashboard-sidebar";
import { ToggleDarkMode } from "@/app/(landing)/_components/header/toggle-dark-mode";
import { CodePreviewDialog } from "./_components/code-preview/code-preview-dialog";

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
            <div className="h-16 flex items-center justify-between px-6">
              <div className="flex items-center space-x-2">
                <SidebarTrigger />
                <CodePreviewDialog />
              </div>
              <ToggleDarkMode />
            </div>
          </header>
          <main className="px-6">
            <section className="pt-[2.5rem] pb-[2.5rem]">{children}</section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
