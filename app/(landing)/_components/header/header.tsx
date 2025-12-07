import Link from "next/link";
import { LayoutPanelTopIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { ToggleDarkMode } from "./toggle-dark-mode";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 z-50 w-full backdrop-blur-lg">
      <nav className="px-6 mx-auto flex items-center justify-between h-16 max-w-5xl">
        <Link
          href="/"
          className="flex items-center space-x-2 bg-muted p-2 rounded-2xl border border-dashed"
        >
          <LayoutPanelTopIcon className="size-4" />
          <span className="font-bold text-sm">MultiForm</span>
        </Link>
        <DesktopMenu />
        <div className="flex items-center gap-x-1">
          <Button size="icon-sm" variant="ghost" asChild>
            <Link
              href="https://x.com/Remy_349"
              target="_blank"
              aria-label="X/Twitter"
            >
              <BsTwitterX />
            </Link>
          </Button>
          <Button size="icon-sm" variant="ghost" asChild>
            <Link
              href="https://github.com/Remy349/shadcn-ui-multi-form"
              target="_blank"
              aria-label="GitHub repository"
            >
              <FaGithub />
            </Link>
          </Button>
          <ToggleDarkMode />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};
