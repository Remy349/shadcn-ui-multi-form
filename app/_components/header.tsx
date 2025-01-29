import Link from "next/link";
import { House, LayoutPanelTop, LucideIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const links: { name: string; href: string; icon: LucideIcon }[] = [
  { name: "Home", href: "/", icon: House },
];

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50 bg-background border-b w-full">
      <nav className="px-6 mx-auto flex items-center justify-between h-16 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
        <Link href="/" className="flex items-center space-x-2">
          <LayoutPanelTop className="size-6" />
          <span className="font-bold text-base">Multi Form</span>
        </Link>
        <div className="flex items-center gap-x-2">
          <ul className="flex items-center gap-x-2">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.name}>
                  <Button
                    size="icon"
                    className="size-8"
                    variant="outline"
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon className="size-4" />
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
          <Button size="icon" className="size-8" variant="outline" asChild>
            <Link
              href="https://github.com/Remy349/shadcn-ui-multi-form-component"
              target="_blank"
            >
              <GitHubLogoIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};
