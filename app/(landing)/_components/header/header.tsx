import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DesktopMenu } from "./desktop-menu";
import { MobileMenu } from "./mobile-menu";
import { ToggleDarkMode } from "./toggle-dark-mode";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { getGitHubRepoStars } from "@/lib/github";
import { LayersIcon } from "lucide-react";

export const Header = async () => {
  const stars = await getGitHubRepoStars();

  return (
    <header className="sticky top-0 left-0 z-50 w-full backdrop-blur-lg">
      <nav className="px-6 mx-auto flex items-center justify-between h-16 max-w-5xl">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-md bg-muted p-2 border border-dashed">
              <LayersIcon className="size-4 text-primary/80" />
            </div>
            <span className="font-bold text-sm">MultiForm</span>
          </Link>
          <Badge variant="secondary" className="font-semibold">
            v1.5.0
          </Badge>
        </div>
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
          <Button size="sm" variant="ghost" asChild>
            <Link
              href="https://github.com/Remy349/shadcn-ui-multi-form"
              target="_blank"
              aria-label="GitHub repository"
            >
              <FaGithub />
              {stars !== null && (
                <span className="ml-1 text-xs font-semibold text-muted-foreground">
                  {stars}
                </span>
              )}
            </Link>
          </Button>
          <ToggleDarkMode />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};
