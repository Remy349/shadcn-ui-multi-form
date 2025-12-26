"use client";

import { ArrowLeftIcon, ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";

interface LinkComponent {
  href: string;
  label: string;
}

const linksComponents: LinkComponent[] = [
  { href: "/components/password-input", label: "Password Input" },
  { href: "/components/file-input", label: "File Input" },
  { href: "/components/rich-text-editor", label: "Rich Text Editor" },
  { href: "/components/email-input", label: "Email Input" },
];

export const NavigationControls = () => {
  const pathname = usePathname();

  const currentPage = linksComponents.find((item) => item.href === pathname);

  if (!currentPage) {
    return null;
  }

  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="secondary" size="icon-sm" aria-label="Go Back" asChild>
          <Link href="/components">
            <ArrowLeftIcon />
          </Link>
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="sm" variant="secondary">
          {currentPage.label}
        </Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary" className="!pl-2">
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuGroup>
              {linksComponents.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  {currentPage.href === item.href ? (
                    <Link className="bg-primary/5" href={item.href as Route}>
                      {item.label}
                    </Link>
                  ) : (
                    <Link href={item.href as Route}>{item.label}</Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  );
};
