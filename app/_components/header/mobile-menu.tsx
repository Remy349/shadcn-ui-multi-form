import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { links } from "./links";
import Link from "next/link";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="size-8 md:hidden" variant="outline">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="pt-6">
          <ul className="flex items-center flex-col gap-y-6">
            {links.map((item) => (
              <li key={item.name}>
                <Link className="font-medium" href={item.href}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
