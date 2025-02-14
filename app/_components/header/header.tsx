import Link from "next/link";
import { LayoutPanelTop } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { ToggleDarkMode } from "./toggle-dark-mode";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 bg-background border-b w-full">
      <nav className="px-6 mx-auto flex items-center justify-between h-16 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <div className="flex items-center gap-x-4">
          <MobileMenu />
          <Link href="/" className="flex items-center space-x-2">
            <LayoutPanelTop className="size-6" />
            <span className="font-bold text-base">Multi Form</span>
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <DesktopMenu />
          <div className="flex items-center gap-x-2">
            <Button size="icon" className="size-8" variant="outline" asChild>
              <Link
                href="https://github.com/Remy349/shadcn-ui-multi-form"
                target="_blank"
              >
                <GitHubLogoIcon className="size-4" />
              </Link>
            </Button>
            <ToggleDarkMode />
          </div>
        </div>
      </nav>
    </header>
  );
};
