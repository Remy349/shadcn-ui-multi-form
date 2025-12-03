import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Preview } from "./_components/preview";
import { Installation } from "./_components/installation";
import { Example } from "./_components/example";

export const metadata: Metadata = {
  title: "Password Input",
};

export default function PasswordInput() {
  return (
    <section className="py-[4rem]">
      <div className="mx-auto px-6 max-w-3xl space-y-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Button size="icon-sm" variant="ghost" asChild>
              <Link href="/components">
                <ArrowLeftIcon />
              </Link>
            </Button>
            <h1 className="text-3xl tracking-tighter text-balance font-bold">
              Password Input
            </h1>
          </div>
          <p className="text-foreground/80 text-base">
            The Password Input allows users to toggle password visibility,
            making it easier to enter and verify their passwords securely.
          </p>
        </div>
        <Preview />
        <Installation />
        <Example />
      </div>
    </section>
  );
}
