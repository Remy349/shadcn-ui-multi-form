import { Button } from "@/components/ui/button";
import { links } from "./links";
import Link from "next/link";
import type { Route } from "next";

export const DesktopMenu = () => {
  return (
    <ul className="flex items-center max-md:hidden">
      {links.map((item) => (
        <li key={item.name}>
          <Button size="sm" className="font-medium" variant="link" asChild>
            <Link href={item.href as Route}>{item.name}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};
